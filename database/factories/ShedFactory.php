<?php

namespace Database\Factories;

use App\Models\Shed;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shed>
 */
class ShedFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Shed::class;
    public function definition()
    {
        return [
            'shed_identification_name' => fake()->name(),
            'number_of_flocks' => fake()->numberBetween(200,30000),
        ];
    }
}
