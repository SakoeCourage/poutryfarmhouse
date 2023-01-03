<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Saleitem;
use App\Models\Productsdefinition;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia('Salesmanagement/Printinvoice');
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
    public function store(Request $request,$saleid)
    {   
        $invoice_number = IdGenerator::generate(['table' => 'invoices','field'=>'invoice_number', 'length' => 14, 'prefix' =>'INV-'.date('ymd')]);
   
        $newinvoice = Invoice::create([
            'sale_id' => $request->saleid,
            'invoice_number' =>$invoice_number
        ]);

    
        return([
            'invoice' => Invoice::where('id',$newinvoice->id)->with('sale')->get()
            ->map(function($item){
                return([
                    'invoice_number' =>$item->invoice_number,
                    'customer_name'=>$item->sale->customer_name,
                    'customer_contact' =>$item->sale->customer_contact,
                    'total_amount'=> $item->sale->total_amount,
                    'date'=>$item->created_at
                ]);
            }),
            
            'products' => Saleitem::where('sale_id',$request->saleid)
            ->get()
            ->map(function($item){
                return(
                    [
                     'unit_price'=>$item->price,
                     'amount'=> $item->amount,
                     'quantity'=>$item->quantity,   
                     'name' => Productsdefinition::where( 'id', $item->productsdefinition_id)->pluck('name')[0]
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
    public function show(Invoice $invoice)
    {
        //
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Invoice $invoice)
    {
        //
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
