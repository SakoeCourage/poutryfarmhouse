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
                'flock_identification_name' => 'flock 1',
                'shed_id' => 1,
                'start_date' => fake()->date(),
                'opening_birds'=>fake()->numberBetween(90,1000),
                'breed_id' => rand(1,5),
                'age_of_flocks'=>rand(2,5),
                'created_at' =>now(),
                'updated_at'=> now()
            ],
            [
                'flock_identification_name' => 'flock 2',
                'shed_id' => 3,
                'start_date' => fake()->date(),
                'opening_birds'=>fake()->numberBetween(90,1000),
                'breed_id' => rand(1,5),
                'age_of_flocks'=>rand(2,5),
                'created_at' =>now(),
                'updated_at'=> now()
            ],
            [
                'flock_identification_name' => 'flock 3',
                'shed_id' => 2,
                'start_date' => fake()->date(),
                'opening_birds'=>fake()->numberBetween(90,1000),
                'breed_id' => rand(1,5),
                'age_of_flocks'=>rand(2,5),
                'created_at' =>now(),
                'updated_at'=> now()
            ],
            [
                'flock_identification_name' => 'flock 4',
                'shed_id' => 4,
                'start_date' => fake()->date(),
                'opening_birds'=>fake()->numberBetween(90,1000),
                'breed_id' => rand(1,5),
                'age_of_flocks'=>rand(2,5),
                'created_at' =>now(),
                'updated_at'=> now()
            ],
            [
                'flock_identification_name' => 'flock 4',
                'shed_id' => 5,
                'start_date' => fake()->date(),
                'opening_birds'=>fake()->numberBetween(90,1000),
                'breed_id' => rand(1,5),
                'age_of_flocks'=>rand(2,5),
                'created_at' =>now(),
                'updated_at'=> now()
            ],
            [
                'flock_identification_name' => 'flock 6',
                'shed_id' => 6,
                'start_date' => fake()->date(),
                'opening_birds'=>fake()->numberBetween(90,1000),
                'breed_id' => rand(1,5),
                'age_of_flocks'=>rand(2,5),
                'created_at' =>now(),
                'updated_at'=> now()
            ],
      ];

      Flock::insert($data);
    }
}
