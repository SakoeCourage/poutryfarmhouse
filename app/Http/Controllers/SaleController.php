<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\Saleitem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Productsdefinition;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Services\StockService;
use App\Services\ProductStockService;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return Inertia::render('Salesmanagement/Sale', [
            'productsData' => DB::table('products')->join('productsdefinitions', 'products.id', '=', 'product_id')
                ->selectRaw(
                   'products.id as id,
                    products.name as productname,
                    (productsdefinitions.price_per_crate)/100 as price_per_crate,
                    productsdefinitions.id as definition_id,
                    productsdefinitions.name as definition_name,
                    ROUND(productsdefinitions.unit_price/100,2)  as unit_price,
                    productsdefinitions.quantity_in_stock as quantity_in_stock'
                )
                ->get(),
            'products' => Product::get(['id', 'name','in_crates'])
        ]);
    }

    public function saleHistory(Sale $sale)
    {
        if (isset(request()->day)) {
            $date = date('Y-m-d H:i:s', strtotime(request()->day));
        } else {
            $date = null;
        }
        return ([
            'sales' => $sale->filter(request()->only('search', 'day'))->with('salerepresentative:id,name')->latest()->paginate(10)
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


    public function store(Request $request, $sale_id = null)
    {


        $request->validate([
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_contact' => ['required', 'numeric', 'digits:10'],
            'sub_total' => ['required'],
            'discount_rate' => ['nullable'],
            'total_amount' => ['required'],
            'customer_purchases' => ['required', 'array', 'min:1'],
            'customer_purchases.*.product_id' => ['required',],
            'customer_purchases.*.definition_id' => ['required', 'distinct'],
            'customer_purchases.*.quantity' => ['required', 'numeric']
        ]);


        DB::transaction(function () use ($request, $sale_id) {
            $newsale = Sale::create([
                'customer_name' => $request->customer_name,
                'total_amount' => $request->total_amount,
                'customer_contact' => $request->customer_contact,
                'sub_total' => $request->sub_total,
                'discount_rate' => $request->discount_rate ?? 0,
                'user_id' => Auth::user()->id
            ]);
            $sale_id = $newsale->id;
            $saleitems = collect($request->customer_purchases);
            $saleitems->each(function ($item, $key) use ($newsale) {
                $newsale =  Saleitem::create([
                    'sale_id' => $newsale->id,
                    'productsdefinition_id' => $item['definition_id'],
                    'price' => $item['price'],
                    'amount' => $item['amount'],
                    'quantity' => $item['quantity']
                ]);
            });
            return redirect()->back()->with([
                'message' => [
                    'type' => 'sucess',
                    'text' => 'sale added',
                    'invoice_sale_id' => $sale_id
                ]
            ]);
        });
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function show(Sale $sale)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
