<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Flock;

class FlockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $data = [
            [
                'flock_name' => 'flock 1',
                'shed_id' => 1,
                'start_date' => now()
            ],
            [
                'flock_name' => 'flock 2',
                'shed_id' => 1,
                'start_date' => now()
            ]
      ];

      Flock::insert($data);
    }
}
