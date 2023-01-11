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
            'opening_stock' => fake()->numberBetween(200,5000),
            'created_at' => fake()->date(),
            'updated_at' => fake()->date(),
            'closing_stock' => fake()->numberBetween(200,30000),
            'daily_production' => fake()->numberBetween(200,30000),
        ];
    }
}
