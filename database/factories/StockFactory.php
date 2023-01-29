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
            'opening_stock' => 0,
            'created_at' => now(),
            'updated_at' => now(),
            'closing_stock' => 0,
            'daily_production' => 0,
        ];
    }
}
