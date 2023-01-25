<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RolesController extends Controller
{
    public function index(){
        return(
            ['roles' => \Spatie\Permission\Models\Role::get(['id', 'name'])->except('3')]
        );
    }
}
