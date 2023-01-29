<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Userprofile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdmin = \App\Models\User::factory()->create([
            'name' => 'super Admin',
            'email' => 'poultryfarmhouse@superadmin.com',
            'email_verified_at' => true,
            'password' => Hash::make('superAdmin@'), // password
            
        ]);
        $superAdmin->assignRole('Super Admin');

        //  User::factory()->count(50)->create();
        //  Userprofile::factory()->count(50)->create();
                
    }       
}
