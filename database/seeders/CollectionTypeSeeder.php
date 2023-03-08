<?php

namespace Database\Seeders;

use App\Models\CollectionType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CollectionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $collections = ["carton","box","case","crate","pallet","bundle"];
        for ($item=0; $item < count($collections); $item++) { 
            foreach ($collections as $collection) {
              $collection = new CollectionType();
              $collection->type = $collections[$item];
              $collection->save();
              $item+=1;
              }
            }
    }
}
