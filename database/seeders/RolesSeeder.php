<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        //dashboard
        Permission::create(['name'=> 'view dashboard']);

        //expense
        Permission::create(['name' => 'create expense']);
        Permission::create(['name' => 'authorize expense']);

        // penmgmt
        Permission::create(['name' => 'create pen']);
        Permission::create(['name' => 'edit pen']);
        Permission::create(['name' => 'delete pen']);

        // flockmgmt
        Permission::create(['name' => 'create flock']);
        Permission::create(['name' => 'edit flock']);
        Permission::create(['name' => 'delete flock']);
        Permission::create(['name' => 'compare flock']);
        Permission::create(['name' => 'create flock control']);
        Permission::create(['name' => 'edit flock control']);
        Permission::create(['name' => 'delete flock control']);
        
        //Grading
        Permission::create(['name' => 'grade flock control data']);

        // stockmgmt
        Permission::create(['name' => 'create stock data']);
        Permission::create(['name' => 'manage stock data']);
        Permission::create(['name' => 'delete stock data']);

        //Sale mgmt
        Permission::create(['name'=>'generate product order']);
        Permission::create(['name'=>'process payments']);

        //Report mgmt
        Permission::create(['name' => 'generate report']);

        

        // usermgmt
        Permission::create(['name' => 'create user']);
        Permission::create(['name' => 'edit user']);
        Permission::create(['name' => 'delete user']);


        //Sytem definition
        Permission::create(['name' => 'define system data']);
         // Super Admin
        Role::create(['name' => 'Super Admin']);

        // operator role
        $operator = Role::create(['name' => 'data entry operator']);
        $operator->syncPermissions(['create flock control', 'compare flock', 'edit flock control']);

        // admin role
        $admin = Role::create(['name' => 'admin']);
        $admin->syncPermissions([
            'create flock', 'edit flock', 'delete flock', 'compare flock', 'create flock control', 'edit flock control',
            'delete flock control', 'create stock data', 'manage stock data', 'delete stock data', 'create pen', 'edit pen', 'delete pen'
        ]);
       
        
    }
}
