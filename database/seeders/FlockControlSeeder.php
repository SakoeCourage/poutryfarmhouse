<?php

namespace Database\Seeders;

use App\Models\FlockControl;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FlockControlSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        FlockControl::factory()->count(50)->create();
    }
}
