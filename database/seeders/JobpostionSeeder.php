<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Jobposition;

class JobpostionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $positions = ["farm Manager","Area Sales Manager","Electrician","Facility Day supervisor","General labour"];
        for ($item=0; $item < count($positions); $item++) { 
            foreach ($positions as $position) {
              $position = new Jobposition;
              $position->position = $positions[$item];
              $position->save();
              $item+=1;
              }
            }
    }
}
