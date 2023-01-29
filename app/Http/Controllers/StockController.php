<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Feed;
use App\Models\Feedstockhistory;
use App\Models\FlockControl;
use App\Models\Grading;
use App\Models\Product;
use App\Models\Productsdefinition;
use App\Services\StockService;
use Carbon\Carbon;
use League\CommonMark\Extension\Table\Table;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function index()
    {   
        
        return Inertia('Stockmanagement/Allstock');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $request->validate([
            'amount' => ['required', 'numeric']
        ]);

        Stock::create([
            'opening_stock' => $request->amount * 100,
            'daily_production' => 0,
            'closing_stock' => $request->amount * 100
        ]);

        return response('ok');
    }

    /**
     * @return \inertia\Inertia::render 
     */

    public function showcreateform()
    {
        return Inertia('Stockmanagement/Newstock', [
            'product_stock' => [
                'value_in_stock' => Productsdefinition::sum(DB::raw('(unit_price/100) * quantity_in_stock')),
                'number_of_products' => Product::count(),
                'quantity_of_products' => Productsdefinition::sum('quantity_in_stock')
            ],
            'feed_stock' => [
                'value_in_stock' => Feed::sum(DB::raw('(cost_per_kg/100) * (quantity_in_stock/100)')),
                'number_of_feeds' => Feed::count(),
                'quantity_of_feeds_left' => Feed::sum(DB::raw('quantity_in_stock/100'))
            ]
        ]);
    }


    public function getFeedDailyFeedStockData($day){
        $date = null; 
        if(Carbon::parse($day)->isToday()){
            $date = Carbon::today();
        }else if(Carbon::parse($day)->isPast()){
            $date= Carbon::parse($day)->subDay();
        }
        $feed_data = DB::table('feeds')
        ->join('feedstockhistories','feeds.id','feedstockhistories.feed_id')
        ->whereDate('feedstockhistories.created_at',$date)
        ->get();
        $feed_data = $feed_data->groupBy('feed_name');
        $feed_data = $feed_data->map(function($collection,$key){
          return(
               $collection->last()->net_quantity/100          
          );
       });
       return $feed_data;
    }

    public function getUsuableGradedProducts($date)
    {
        $usuableGradedProducts = DB::table('gradinghistories')
            ->whereDate('gradinghistories.updated_at', $date ?? Carbon::now())
            ->join('productsdefinitions', 'gradinghistories.productsdefinition_id', '=', 'productsdefinitions.id')
            ->join('products', 'productsdefinitions.product_id', '=', 'products.id')
            ->selectRaw('productsdefinitions.name as definition_name,products.name as name,gradinghistories.quantity as quantity')
            ->get()
            ->groupBy(['name', 'definition_name']);

        $usuableGradedProducts = $usuableGradedProducts->map(function ($collection, $ckey) {
            return ($collection->mapWithKeys(function ($group, $key) use ($ckey) {
                return [
                    $key => [
                        'quantity' =>  $group->sum('quantity'),
                    ]
                ];
            })
            );
        });

        return $usuableGradedProducts;
    }

    public function getProductSales($date)
    {

        $productSale = DB::table('invoices')->where('payment_verified', '=', 1)
            ->whereDate('invoices.updated_at', $date ?? Carbon::today())
            ->join('sales', 'invoices.sale_id', '=', 'sales.id')
            ->join('saleitems', 'sales.id', '=', 'saleitems.sale_id')
            ->join('productsdefinitions', 'saleitems.productsdefinition_id', '=', 'productsdefinitions.id')
            ->join('products', 'productsdefinitions.product_id', '=', 'products.id')
            ->selectRaw('invoices.*,productsdefinitions.name as definition_name,products.name as name,productsdefinitions.unit_price, saleitems.*
        ')->get();
        $mappedProductSales = $productSale
            ->groupBy(['name', 'definition_name'])
            ->map(function ($collection, $ckey) use ($productSale) {
                return ($collection->mapWithKeys(function ($group, $key) use ($productSale, $ckey) {
                    return [
                        $key => [
                            'units' =>  $group->sum('quantity'),
                            'amount' => $group->sum('amount') / 100
                        ]
                    ];
                })
                );
            });
        return $mappedProductSales;
    }



    public function getStockPerGivenDay(Stock $stock)
    {
        
        if (Stock::all()->isEmpty()) {
            return [
                'empty_stock' => true
            ];
        }
        new StockService();
        return [
            'stocks' =>  $stock->whereDate('created_at', Request()->date ?? Carbon::now())
                ->get()
                ->map(fn ($cstock) => [
                    'opening_stock' => $cstock->opening_stock / 100,
                    'closing_stock' => $cstock->closing_stock / 100,
                    'daily_production' => $cstock->daily_production / 100,
                    'expenses' => Expense::query()
                        ->where('status', 1)
                        ->whereDate('updated_at', Request()->date ?? Carbon::now())
                        ->get()->sum('total'),
                ])->first(),
            'currentDate'=>Request()->date,
            'feed_stock' => $this->getFeedDailyFeedStockData(Request()->date ?? Carbon::now()),
            'sales' => $this->getProductSales(Request()->date),
            'usablegradedProducts' => $this->getUsuableGradedProducts(Request()->date ?? Carbon::now()),
            'defected_unusable' => Grading::where('is_graded', 1)
                ->whereDate('updated_at', Request()->date ?? Carbon::now())
                ->sum('remainder_quantity'),
            'dead' => FlockControl::whereDate('record_date', Request()->date ?? Carbon::now())->sum('dead'),
            'missing' => FlockControl::whereDate('record_date', Request()->date ?? Carbon::now())->sum('missing'),
            'culled' => FlockControl::whereDate('record_date', Request()->date ?? Carbon::now())->sum('culled')
        
        ];
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
        return ([
            'stock' => $stock->only(['birds_sold', 'closing_stock', 'opening_stock', 'daily_production', 'broken', 'eggs_sold', 'other_defects']),
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
        if ($stock->delete()) {
            return redirect()->back()->with([
                "message" => [
                    'type' => 'success',
                    'text' => 'record deleted'
                ]

            ]);
        }
    }
}
