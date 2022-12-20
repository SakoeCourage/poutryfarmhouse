<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/login', [\App\Http\Controllers\Auth\LoginController::class, 'showLoginForm']);
Route::post('/login', [\App\Http\Controllers\Auth\LoginController::class, 'index'])->name('login');

Route::group(['middleware' => 'auth'], function () {
    Route::get('/', fn ()=> Inertia('Dashboard'));
    Route::post('/logout',[\App\Http\Controllers\Auth\LogoutController::class,'logout']);
    
    Route::group(['middleware' => 'role:Super Admin'], function () {
        Route::get('/user/create',  [\App\Http\Controllers\Auth\UserController::class, 'showcreateuserform']);
        Route::get('/user/all', [\App\Http\Controllers\Auth\UserController::class, 'index']);
        Route::post('/createuser', [\App\Http\Controllers\Auth\UserController::class, 'create']);
        Route::put('/user/edit/{user}', [\App\Http\Controllers\Auth\UserController::class, 'edit'])->middleware(['permission:edit user']);
        Route::delete('/user/delete/{user}', [\App\Http\Controllers\Auth\UserController::class, 'delete'])->middleware(['permission:delete user']);
       
    });

    Route::group(['prefix' => 'flock'], function () {
        Route::get('/create', [\App\Http\Controllers\FlockController::class, 'showcreateflockform'])->middleware('permission:create flock');
        Route::post('/create', [\App\Http\Controllers\FlockController::class, 'createnewflock'])->middleware('permission:create flock');
        Route::get('/control', [\App\Http\Controllers\FlockController::class, 'controlShowform'])->middleware('permission:create flock control');
        Route::post('/control', [\App\Http\Controllers\FlockController::class, 'controlCreate'])->middleware('permission:create flock control');
        Route::get('/compare', [\App\Http\Controllers\FlockController::class, 'compare']);
        Route::get('/control/data',[\App\Http\Controllers\FlockControlController::class, 'index'])->middleware('permission:edit flock control');
    });

    Route::group(['prefix' => 'stock'], function () {
        Route::get('/all', [\App\Http\Controllers\StockController::class, 'index']);
        Route::get('/add', [\App\Http\Controllers\StockController::class, 'showcreateform'])->middleware('permission:create stock');
        Route::post('/add', [\App\Http\Controllers\StockController::class, 'create'])->middleware('permission:create stock');
    });

    Route::group(['prefix' => 'shed'], function () {
        Route::get('/all', [\App\Http\Controllers\ShedController::class, 'index']);
        Route::get('/create', [\App\Http\Controllers\ShedController::class, 'showcreateform'])->middleware('permission:create shed');;
        Route::post('/create', [\App\Http\Controllers\ShedController::class, 'create'])->middleware('permission:create shed');;
    });
});
