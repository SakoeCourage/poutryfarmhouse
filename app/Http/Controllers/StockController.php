<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreStockRequest;
use App\Models\Feed;
use App\Models\Product;
use App\Models\Productsdefinition;
use App\Models\Saleitem;
use Carbon\Carbon;



class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Stock $stock)
    {       
        return Inertia('Stockmanagement/Allstock',[
                'stocks' =>fn () => $stock->filter(request()->only('sort'))
                ->latest()->paginate(10)
                ->withQueryString()
                -> through(fn($cstock)=>[
                    'id'=> $cstock->id,
                    'date' => $cstock->created_at,
                    'opening_stock' => $cstock->opening_stock/100,
                    'closing_stock' => $cstock->closing_stock/100,
                    'daily_production'=>$cstock->daily_production/100,
                    'expenses' =>Expense::query()->where('status',1)->whereDate('created_at',$cstock->created_at)->get()->sum('total'),
                    'product_sales' => Productsdefinition::get()->map(function($item)use($cstock){
                        return([
                            'id' => $item->id,
                            'name' => $item->name,
                            'sale_quantity' => Saleitem::query()->where('productsdefinition_id',$item->id)
                            ->whereDate('created_at',$cstock->created_at)
                            ->sum('quantity')
                        ]);

                }),
                    ]),
                'filters' => request()->only('sort')
              
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(StoreStockRequest $request)
    {
        
    }

    /**
     * @return \inertia\Inertia::render 
     */

    public function showcreateform()
    {
        return Inertia('Stockmanagement/Newstock',[
            'product_stock'=>[
                'value_in_stock' => Productsdefinition::sum(DB::raw('(unit_price/100) * quantity_in_stock')),
                'number_of_products' => Product::count(),
                'quantity_of_products' => Productsdefinition::sum('quantity_in_stock')
            ],
            'feed_stock'=>[
                'value_in_stock' => Feed::sum(DB::raw('(cost_per_kg/100) * (quantity_in_stock/100)')),
                'number_of_feeds' => Feed::count(),
                'quantity_of_feeds_left' => Feed::sum(DB::raw('quantity_in_stock/100'))
            ]
        ]);
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
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function show(Stock $stock)
    {
        return([
            'stock' => $stock->only(['birds_sold','closing_stock','opening_stock','daily_production','broken','eggs_sold','other_defects']),
            'expenses' => $stock->expenses
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function edit(Stock $stock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Stock $stock)
    {
        // dd(request()->all());
        $request->validate([
            'opening_stock' => ['required', 'numeric'],
            'closing_stock' => ['required', 'numeric'],
            'birds_sold' => ['nullable', 'numeric'],
            'eggs_sold' => ['nullable', 'numeric'],
            'broken' => ['nullable', 'numeric'],
            'other_defects' => ['nullable', 'numeric'],
            'daily_production' => ['required', 'numeric'],
            'expense' => ['nullable', 'array']
        ]);
        $stock->update($request->all());
        return redirect()->back()->with([
            "message" => [
                'type' => 'success',
                'text' => 'updated'
            ]

        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function destroy(Stock $stock)
    {
        if($stock->delete()){
            return redirect()->back()->with([
                "message" => [
                    'type' => 'success',
                    'text' => 'record deleted'
                ]
    
            ]);
        }
    }
}
