<?php

namespace Database\Factories;

use App\Models\Stock;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stock>
 */
class StockFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Stock::class;
    public function definition()
    {
        return [
            'opening_stock' => fake()->numberBetween(200,30000),
            'closing_stock' => fake()->numberBetween(200,30000),
            'birds_sold' => fake()->numberBetween(200,30000),
            'eggs_sold' => fake()->numberBetween(200,30000),
            'broken' => fake()->numberBetween(200,30000),
            'other_defects' => fake()->numberBetween(200,30000),
            'daily_production' => fake()->numberBetween(200,30000),
        ];
    }
}
