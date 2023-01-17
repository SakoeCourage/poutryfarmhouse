<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Productsdefinition>
 */
class ProductsdefinitionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' =>fake()->word(),
            'unit_price' => fake()->numberBetween(20,100),
            'quantity_in_stock' => 0,
            'product_id'=> rand(1,3)
        ];
    }
}
