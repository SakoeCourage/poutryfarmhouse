<?php

namespace App\Http\Controllers;

use App\Models\Saleitem;
use Illuminate\Http\Request;

class SaleitemController extends Controller
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
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Saleitem  $saleitem
     * @return \Illuminate\Http\Response
     */
    public function show($saleid)
    {     
        $sale_items = Saleitem::where('sale_id',$saleid);
        return([
            'saleitems' => $sale_items->with(['product:id,name','sale:id,total_amount'])->get()->map(function($item){
                return([
                    'amount' => $item->amount,
                    'product' =>$item->product->name,
                    'price' =>$item->price,
                    'quantity' =>$item->quantity,
                    'total'=>$item->sale->total_amount
                ])  ;
            })
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Saleitem  $saleitem
     * @return \Illuminate\Http\Response
     */
    public function edit(Saleitem $saleitem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Saleitem  $saleitem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Saleitem $saleitem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Saleitem  $saleitem
     * @return \Illuminate\Http\Response
     */
    public function destroy(Saleitem $saleitem)
    {
        //
    }
}
