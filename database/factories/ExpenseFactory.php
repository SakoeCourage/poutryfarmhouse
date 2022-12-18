<?php

namespace Database\Factories;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Expense::class;
    public function definition()
    {
        return [
            'expense_name' => fake()->name(),
            'amount' => fake()->numberBetween(200,30000),
            'stock_id' =>rand(1,50)
        ];
    }
}
