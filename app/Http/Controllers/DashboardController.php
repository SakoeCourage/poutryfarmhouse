<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Feed;
use App\Models\Stock;
use App\Models\Expense;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Productsdefinition;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Date;


class DashboardController extends Controller
{
    public function index()
    {

        return Inertia('Dashboard', [
            'line_chart' => Self::generateLineChart(),
            'e_chart' => Self::generateEchart(),
            'productSales' => Self::getYearlyProductSales(),
            'todays_stats' => Self::generateTodaysSats(),
            'graded_products' =>Self::getUsuableGradedProducts(),
            'feed_and_stock'=> Self::generateFeedandProductStockData()
            
        ]);
    }


    public function getPayedSaleBetweenDates($openingDate,$closingData){
        return DB::table('invoices')->where('payment_verified', '=', 1)
        ->whereBetween('invoices.updated_at', [$openingDate, $closingData])
        ->join('sales', 'invoices.sale_id', '=', 'sales.id')
        ->join('saleitems', 'sales.id', '=', 'saleitems.sale_id')
        ->join('productsdefinitions', 'saleitems.productsdefinition_id', '=', 'productsdefinitions.id')
        ->join('products', 'productsdefinitions.product_id', '=', 'products.id');
    }


    public function generateLineChart()
    {
        $begining_of_week = Carbon::now()->startOfWeek(Carbon::MONDAY)->format('Y-m-d');
        $end_of_week = Carbon::now()->endOfWeek(Carbon::SUNDAY)->format('Y-m-d');
        $sales = Self::getPayedSaleBetweenDates($begining_of_week,$end_of_week)->selectRaw('
        Date(invoices.updated_at) as day,
        products.name as name, saleitems.*')
       ->get();

        $new_sale = $sales->groupBy(['name', 'day'])->map(function ($collection, $ckey) use ($sales) {
            return ($collection->mapWithKeys(function ($group, $key) use ($sales, $ckey) {
                return [
                    $key => [
                        'units' =>  $group->sum('quantity'),
                    ]
                ];
            })
            );
        });
        $categories = $sales->unique('day')->pluck('day');
        $categories = $categories->map(function ($value, $key) {
            $date = new Carbon($value);
            return ($date->format('D'));
        });
        $series = $new_sale->map(function ($value, $key) {
            return ([
                'name' => $key,
                'data' => $value->flatten(),
                'offsetY' => 0
            ]);
        });
        return [
            'categories' => $categories,
            'series' => $series
        ];
    }


    public function generateEchart(){
        $begining_of_year = Carbon::now()->startOfYear(Carbon::JANUARY)->format('Y-m-d');
        $end_of_year = Carbon::now()->endOfYear(Carbon::DECEMBER)->format('Y-m-d');
        $sales = Self::getPayedSaleBetweenDates($begining_of_year,$end_of_year)->selectRaw("
        DATE_FORMAT(invoices.updated_at,'%Y-%m') as date,
        sales.total_amount as amount,
        MONTH(invoices.updated_at) as month,
        YEAR(invoices.updated_at) as year, 
        products.name as name, saleitems.*")
       ->get()
       ->groupBy('date')
       ;

       $categories = $sales->unique('date')->pluck('date');
       $categories = $categories->map(function ($value, $key) {
           $date = new Carbon($value);
           return ($date->format('M'));
       }); 
   
       $new_sale = $sales->mapWithKeys(function($group,$key){
            return[
                'amount' => $group->sum('amount') /100
            ];
       });
          
       return([
        'data' =>  $new_sale,
        'categories' => $categories
    ]);

    }


   public  function getYearlyProductSales(){
    $begining_of_year = Carbon::now()->startOfYear(Carbon::JANUARY)->format('Y-m-d');
    $end_of_year = Carbon::now()->endOfYear(Carbon::DECEMBER)->format('Y-m-d');
    $productSale = Self::getPayedSaleBetweenDates($begining_of_year,$end_of_year)
    ->selectRaw('invoices.*,productsdefinitions.name as definition_name,products.name as name,productsdefinitions.unit_price, saleitems.*
    ')->get();
    ;
    $productSale = $productSale
    ->groupBy(['name', 'definition_name'])
    ->map(function ($collection, $ckey)  {
        return ($collection->mapWithKeys(function ($group, $key) {
            return [
                $key => [
                    'units' =>  $group->sum('quantity'),
                ]
            ];
        })
        );
    });
    return $productSale;
   }

   public function getSalesPerGivenDate($day){
        return DB::table('invoices')->where('payment_verified', '=', 1)
        ->whereDate('invoices.updated_at',$day)
        ->join('sales', 'invoices.sale_id', '=', 'sales.id')
        ->join('saleitems', 'sales.id', '=', 'saleitems.sale_id')
        ->join('productsdefinitions', 'saleitems.productsdefinition_id', '=', 'productsdefinitions.id')
        ->join('products', 'productsdefinitions.product_id', '=', 'products.id')
        ->selectRaw('invoices.*,productsdefinitions.name as definition_name,products.name as name,productsdefinitions.unit_price, saleitems.*
        ')->get();
   }

   public function getPercentageSaleIncreaseOrDecrease($today,$yesterday){
        // return  
   }

   public function generateTodaysSats(){
    //Todays expenses
    $todaysExpenses = Expense::query()
    ->where('status', 1)
    ->whereDate('updated_at',Carbon::now())
    ->get();

    //sales and stock values
    $productStockValue= Productsdefinition::sum(DB::raw('(unit_price/100) * quantity_in_stock'));
    $feedStockValue = Feed::sum(DB::raw('(cost_per_kg/100) * (quantity_in_stock/100)'));
    $currentSaleStockValue =  Stock::whereDate('created_at',Carbon::now())->get()->firstorFail()->closing_stock/100;
    $todaySaleProduction =  Stock::whereDate('created_at',Carbon::today())->get()->firstorFail()->daily_production/100;
    $yesterdaySaleProduction =  Stock::whereDate('created_at',Carbon::yesterday())->get()->firstorFail()->daily_production/100 ?? 0;
    $currentSaleStockValue = $feedStockValue + $productStockValue ;
    


    return[
        'todays_sale' => $todaySaleProduction,
        'current_stock_value'=> $currentSaleStockValue,
        'todays_expenses' => [
            'amount' => $todaysExpenses->sum('total'),
            'number' => $todaysExpenses->count()
        ]
    ];
   
}
    public function generateFeedandProductStockData(){
        return[
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
            ];
    }


    public function getUsuableGradedProducts()
    {
        $usuableGradedProducts = DB::table('gradinghistories')
            ->whereDate('gradinghistories.updated_at',Carbon::now())
            ->join('productsdefinitions', 'gradinghistories.productsdefinition_id', '=', 'productsdefinitions.id')
            ->join('products', 'productsdefinitions.product_id', '=', 'products.id')
            ->selectRaw('productsdefinitions.name as definition_name,products.name as name,gradinghistories.quantity as quantity')
            ->get()
            ->groupBy(['definition_name','name']);

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
}



