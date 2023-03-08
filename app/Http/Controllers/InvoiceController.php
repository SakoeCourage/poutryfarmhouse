<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Saleitem;
use App\Models\Productsdefinition;
use App\Models\User;
use App\Services\StockService;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Services\ProductStockService;
use Illuminate\Support\Collection;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Invoice $invoice)
    {
        return Inertia('Salesmanagement/Invoice', [
            'invoice' => fn () => $invoice->filter(request()->only('sort', 'search', 'filter'))->with('sale')->latest()->paginate(10)->withQueryString()
                ->through(function ($item) {
                    return ([
                        'id' => $item->id,
                        'invoice_number' => $item->invoice_number,
                        'sale_id' => $item->sale->id,
                        'date_created' => $item->created_at,
                        'customer_contact' => $item->sale->customer_contact,
                        'payment' => $item->payment_verified,
                        'customer_name' => $item->sale->customer_name,
                        'total_amount' => $item->sale->total_amount,
                    ]);
                }),
            'paid' => $invoice->where('payment_verified', 1)->count(),
            'unpaid' => $invoice->where('payment_verified', 0)->count(),
            'filters' => request()->only('sort', 'search', 'filter'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $saleid)
    {
        $invoice_already_exist = Invoice::where('sale_id', $saleid)->first();
        if ($invoice_already_exist) {
            throw \Illuminate\Validation\ValidationException::withMessages(
                ['invoice' => 'invoice already generated']
            );
        }
        $invoice_number = IdGenerator::generate(['table' => 'invoices', 'field' => 'invoice_number', 'length' => 14, 'prefix' => 'INV-' . date('ymd')]); 
        $newinvoice = Invoice::create([
            'sale_id' => $request->saleid,
            'invoice_number' => $invoice_number
        ]);
        return ([
            'invoice' => Invoice::where('id', $newinvoice->id)->with('sale')->get()
                ->map(function ($item) {
                    return ([
                        'invoice_number' => $item->invoice_number,
                        'customer_name' => $item->sale->customer_name,
                        'customer_contact' => $item->sale->customer_contact,
                        'discount_rate' => $item->sale->discount_rate,
                        'sub_total' => $item->sale->sub_total,
                        'total_amount' => $item->sale->total_amount,
                        'date' => $item->created_at
                    ]);
                }),
            'products' => Saleitem::where('sale_id', $request->saleid)
                ->get()
                ->map(function ($item) {
                    return ([
                        'unit_price' => $item->price,
                        'price_per_crate'=>$item->price_per_crate,
                        'amount' => $item->amount,
                        'quantity' => $item->quantity,
                        'name' => Productsdefinition::where('id', $item->productsdefinition_id)->with('product')->get()
                            ->map(function ($item) {
                                return ([
                                    'definition_name' => $item->name,
                                    'product_name' => $item->product->name,
                                    'in_collections'=>$item->product->in_crates,
                                    'collection_type' => $item->product->collection_type,
                                    'units_per_crate'=>$item->units_per_crate,
                                ]);
                            })

                    ]
                    );
                })

        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show($invoice)
    {
        return ([
            'invoice' => Invoice::where('id', $invoice)->with(['sale', 'paymentmethod'])->get()
                ->map(function ($item) {
                    return ([
                        'sale_representative' => User::find($item->sale->user_id)->name,
                         'invoice_id' => $item->id,
                        'invoice_number' => $item->invoice_number,
                        'customer_name' => $item->sale->customer_name,
                        'payment_verified' => $item->payment_verified,
                        'paymentmethod' => $item->paymentmethod->method ?? $item->paymentmethod,
                        'discount_rate' => $item->sale->discount_rate,
                        'sub_total' => $item->sale->sub_total,
                        'amount_payable' => $item->sale->total_amount,
                        'sale_id' => $item->sale->id,
                        'sale_items' => $item->sale->saleitems->map(function ($value, $key) {
                            return ([
                                "amount" => $value->amount,
                                'price' => $value->price,
                                'quantity' => $value->quantity,
                                'name' => Productsdefinition::where('id', $value->productsdefinition_id)->with('product')->get()
                                ->map(function ($item) {
                                    return ([
                                        'definition_name' => $item->name,
                                        'product_name' => $item->product->name,
                                        'in_collections'=>$item->product->in_crates,
                                        'collection_type' => $item->product->collection_type,
                                        'units_per_crate'=>$item->units_per_crate,
                                    ]);
                                })->first()
                            ]);
                        })
                    ]);
                })
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    function handleOutofStock(Collection $errors, Collection $sales_collection, ProductStockService $productStockService)
    {
        if ($errors->count()) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'out_of_stock' => $errors
            ]);
        } else {
            $sales_collection->each(function ($value, $key) use ($productStockService) {
                $productStockService->decreasestock($value);
            });
        }
    }



    public function processinvoice(Request $request)
    {
        $productStockService = new ProductStockService();
        $request->validate([
            'sale_id' => ['required'],
            'payment_method' => ['required'],
        ]);

        $errors = Collection::make();
        $sales_collection = Collection::make();
        $sale = \App\Models\Sale::find($request->sale_id);
        $stockservice = new StockService();
        DB::transaction(function ()
        use ($sale, $stockservice, $request, $productStockService, $errors, $sales_collection) {
            $sale->saleitems->each(function ($value, $key) use ($productStockService, $errors, $sales_collection) {
                if ($value->definitions->quantity_in_stock < $value->quantity) {
                    $errors->push([
                        'name' => $value->definitions->name,
                        'quantity_in_stock' => $value->definitions->quantity_in_stock,
                        'quantity' => $value->quantity
                    ]);
                } else {
                    $sales_collection->push($value);
                }
            });

            $this->handleOutofStock($errors, $sales_collection, $productStockService);
            $sale->invoice->update([
                'payment_verified' => true,
                'paymentmethod' => $request->payment_method
            ]);
            \App\Models\Payment::create([
                'sale_id' => $request->sale_id,
                'paymentmethod_id' => $request->payment_method
            ]);
            $stockservice->increaseproduction($sale);
        });
        return redirect()->back()->with([
            'message' => [
                'text' => 'action taken',
                'type' => 'sucess'
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Invoice $invoice)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}
