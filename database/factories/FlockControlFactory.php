<?php

namespace Database\Factories;

use App\Models\FlockControl;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FlockControl>
 */
class FlockControlFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = FlockControl::class;
    public function definition()
    {
        return [
            'record_date'=> fake()->date(),
            'flock_name' =>fake()->name(),
            'shed_id' => rand(1,30),
            'trays_produced'=>fake()->numberBetween(2000,9000),
            'feeds_consumed' => fake()->numberBetween(2000,9000),
            'dead_killed' => fake()->numberBetween(2000,9000),
            'missing' => fake()->numberBetween(2000,9000),
            'culled' => fake()->numberBetween(2000,9000)
        ];
    }
}
