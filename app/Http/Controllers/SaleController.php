<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Saleitem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Productsdefinition;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
            'products' => Productsdefinition::get(['id', 'name', 'unit_price'])
        ]);
    }



    public function saleHistory(Sale $sale)
    {
        if(isset(request()->day)){ 
            $date = date('Y-m-d H:i:s', strtotime(request()->day));
        }else{
            $date = null;
        }
        
        return ([
            'sales' => $sale->filter(request()->only('search','day'))->with('salerepresentative:id,name')->latest()->paginate(10),
                'created_at'=>Carbon::today(),
                'from request' => $date,
                'original' => request()->day
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

    //  total_payable: 0,
    //  customer_name: '',
    //  customer_contact: '',
    //  customer_purchases: null,
    public function store(Request $request,$sale_id = null)
    {
        
        $request->validate([
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_contact' => ['required', 'numeric', 'digits:10'],
            'total_amount' => ['required'],
            'customer_purchases' => ['required', 'array', 'min:1'],
            'customer_purchases.*.product_id' => ['required', 'distinct'],
            'customer_purchases.*.quantity' => ['required', 'numeric']
        ]);
        

        DB::transaction(function () use($request,$sale_id) {
            $newsale = Sale::create([
                'customer_name' => $request->customer_name,
                'total_amount' => $request->total_amount,
                'customer_contact' => $request->customer_contact,
                'user_id' => Auth::user()->id
            ]);
            $sale_id = $newsale->id;
            $saleitems = collect($request->customer_purchases);
            $saleitems->each(function ($item, $key) use ($newsale) {
                Saleitem::create([
                    'sale_id' => $newsale->id,
                    'productsdefinition_id' => $item['product_id'],
                    'price' => $item['price'],
                    'amount' => $item['amount'],
                    'quantity' => $item['quantity']
                ]);
            });
            return redirect()->back()->with([
                'message' => [
                    'type' => 'sucess',
                    'text' => 'sale added',
                    'invoice_sale_id'=> $sale_id
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
