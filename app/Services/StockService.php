<?php

namespace App\Services;

use App\Models\Sale;
use App\Models\Expense;
use App\Models\Stock;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class StockService
{
    public $todayDate;
    public $todaysStock;

    public function __construct()
    {
        // this is for sale instead initial was used to stock hence stock = sale
        $this->todayDate = Carbon::now()->format('Y-m-d');
        $this->todaysStock = Stock::whereDate('created_at', $this->todayDate);
        $last_record = Stock::all()->last();
        if ($this->todaysStock->count()) {
            return;
        } else {
            Stock::create([
                'opening_stock' => $last_record->closing_stock,
            ]);
        }
    }

    public function increaseproduction(Sale $sale): Bool
    {
        $current_daily_production = $this->todaysStock->first()->daily_production / 100;
        $current_opening_stock = $this->todaysStock->first()->opening_stock / 100;
         return $this->todaysStock->update([
            'daily_production' => ($current_daily_production + $sale->total_amount) * 100
        ]);

    }

    public function decreaseproduction(Expense $expense)
    {
        $current_daily_production = $this->todaysStock->first()->daily_production / 100;
        $current_closing_stock = $this->todaysStock->first()->closing_stock / 100;
        $current_opening_stock = $this->todaysStock->first()->opening_stock / 100;
        $newvalue = (($current_daily_production + $current_opening_stock) - $expense->total) * 100;
        if($current_closing_stock < $expense->total){
            throw new \ErrorException('Failed not enough funds');
        }
        return $this->todaysStock->update([
            'closing_stock' => $newvalue
        ]);
    }
}
