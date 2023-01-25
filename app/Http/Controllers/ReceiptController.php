<?php

namespace App\Http\Controllers;

use App\Models\Receipt;
use App\Models\Saleitem;
use Illuminate\Http\Request;
use App\Models\Productsdefinition;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class ReceiptController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }


    public function generateReceipt($receipt_id, $sale_id)
    {
        return ([
            'receipt' => Receipt::where('id', $receipt_id)->with('sale')->get()
                ->map(function ($item) {
                    return ([
                        'receipt_number' => $item->receipt_number,
                        'customer_name' => $item->sale->customer_name,
                        'customer_contact' => $item->sale->customer_contact,
                        'discount_rate' => $item->sale->discount_rate,
                        'sub_total' => $item->sale->sub_total,
                        'total_amount' => $item->sale->total_amount,
                        'date' => $item->created_at
                    ]);
                }),
            'products' => Saleitem::where('sale_id', $sale_id)
                ->get()
                ->map(function ($item) {
                    return ([
                        'unit_price' => $item->price,
                        'amount' => $item->amount,
                        'quantity' => $item->quantity,
                        'name' => Productsdefinition::where('id', $item->productsdefinition_id)->with('product')->get()
                            ->map(function ($item) {
                                return ([
                                    'definition_name' => $item->name,
                                    'product_name' => $item->product->name
                                ]);
                            })

                    ]
                    );
                })

        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($sale_id, $invoice_id)
    {
        $receipt_already_exist = Receipt::where('sale_id', $sale_id)->first();
        if ($receipt_already_exist) {
            return $this->generateReceipt($receipt_already_exist->id, $sale_id);
        } else {
            $receipt_number = IdGenerator::generate(['table' => 'receipts', 'field' => 'receipt_number', 'length' => 14, 'prefix' => 'RCT-' . date('ymd')]);
            $new_receipt = Receipt::create([
                'sale_id' => $sale_id,
                'invoice_id' => $invoice_id,
                'receipt_number' => $receipt_number
            ]);
            return $this->generateReceipt($new_receipt->id, $sale_id);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Receipt  $receipt
     * @return \Illuminate\Http\Response
     */
    public function show(Receipt $receipt)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Receipt  $receipt
     * @return \Illuminate\Http\Response
     */
    public function edit(Receipt $receipt)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Receipt  $receipt
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Receipt $receipt)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Receipt  $receipt
     * @return \Illuminate\Http\Response
     */
    public function destroy(Receipt $receipt)
    {
        //
    }
}
