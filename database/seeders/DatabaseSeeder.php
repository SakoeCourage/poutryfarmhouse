<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {   

        $this->call([
                JobpostionSeeder::class,
                RolesSeeder::class,
                UserSeeder::class,
                // ShedSeeder::class,
                // FlockSeeder::class,
                // ExpenseSeeder::class,
                StockSeeder::class,
                // FlockControlSeeder::class,
                // BreedSeeder::class,
                // ProductsdefinitionSeeder::class,
                PaymentmethodsSeeder::class,
                ExpensibleItemsSeeder::class,
                CollectionTypeSeeder::class,
                // FeedSeeder::class,
                // ProductSeeder::class,
        ]);
    
    }
}
