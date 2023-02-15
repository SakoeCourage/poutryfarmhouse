<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ExpensibleItems;

class ExpensibleItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $expensibles = ["Electricity Bill","Water Bill","Feeds"];
        for ($item=0; $item < count($expensibles); $item++) { 
            foreach ($expensibles as $ex_item) {
              $ex_item = new ExpensibleItems;
              $ex_item->item = $expensibles[$item];
              $ex_item->save();
              $item+=1;
              }
            }
    }
}
