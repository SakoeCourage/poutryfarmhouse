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
        // flockmgmt
        Permission::create(['name' => 'create flock']);
        Permission::create(['name' => 'edit flock']);
        Permission::create(['name' => 'delete flock']);
        Permission::create(['name' => 'compare flock']);
        Permission::create(['name' => 'create flock control']);
        Permission::create(['name' => 'edit flock control']);
        Permission::create(['name' => 'delete flock control']);
        // stockmgmt

        Permission::create(['name' => 'create stock']);
        Permission::create(['name' => 'edit stock']);
        Permission::create(['name' => 'delete stock']);
        // shedmgmt
        Permission::create(['name' => 'create shed']);
        Permission::create(['name' => 'edit shed']);
        Permission::create(['name' => 'delete shed']);

        // usermgmt
        Permission::create(['name' => 'create user']);
        Permission::create(['name' => 'edit user']);
        Permission::create(['name' => 'delete user']);
        
        // operator role
        $operator = Role::create(['name'=>'data entry operator']);
        $operator->syncPermissions(['create flock control','compare flock','edit flock control','create stock','edit stock']);

        // admin role
        $admin = Role::create(['name'=>'admin']);
        $admin->syncPermissions(['create flock','edit flock','delete flock','compare flock', 'create flock control','edit flock control',
            'delete flock control','create stock','edit stock','delete stock','create shed','edit shed','delete shed'
    ]);
            // Super Admin
         Role::create(['name' => 'Super Admin']);
    }
}
