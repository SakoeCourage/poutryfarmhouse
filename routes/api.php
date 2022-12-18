<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/flocks/all', function(){
    return([
        'flocks' => \App\Models\Flock::get(['id','flock_name'])
    ]);
});

Route::get('/roles/all' ,function(){
    return([
        'roles' => \Spatie\Permission\Models\Role::get(['id','name'])->except('3')
    ]);
});


Route::get('/jobpositions/all' ,function(){
    return([
        'jobs' => \App\Models\Jobposition::get(['id','position'])
    ]);
});

Route::get('/sheds/all',function(){
    return([
        'sheds' => \App\Models\Shed::get(['id','shed_identification_name'])
    ]);
});


