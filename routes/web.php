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
    Route::get('/', [\App\Http\Controllers\DashboardController::class,'index']);
    Route::post('/logout', [\App\Http\Controllers\Auth\LogoutController::class, 'logout']);
    Route::get('/salemanagement/newsale', [\App\Http\Controllers\SaleController::class, 'index']);

    Route::group(['prefix' => 'sales'], function () {
        Route::post('/new', [\App\Http\Controllers\SaleController::class, 'store']);
    });


    Route::get('/expenses', [\App\Http\Controllers\ExpenseController::class, 'index'])->middleware(['permission:create expense']);
    Route::put('/expenses/action/{expense}/{action}', [\App\Http\Controllers\ExpenseController::class, 'action'])->middleware(['permission:authorize expense']);
    Route::get('/expenses/all', [\App\Http\Controllers\ExpenseController::class, 'allExpenses'])->middleware(['permission:authorize expense']);
    Route::get('/expenses/submissions', [\App\Http\Controllers\ExpenseController::class, 'mySubmissions']);
    Route::post('/expenses/create', [\App\Http\Controllers\ExpenseController::class, 'store']);


    Route::get('/user/create',  [\App\Http\Controllers\Auth\UserController::class, 'showcreateuserform']);
    Route::get('/user/all', [\App\Http\Controllers\Auth\UserController::class, 'index']);
    Route::post('/createuser', [\App\Http\Controllers\Auth\UserController::class, 'create']);
    Route::put('/user/edit/{user}', [\App\Http\Controllers\Auth\UserController::class, 'edit'])->middleware(['permission:edit user']);
    Route::delete('/user/delete/{user}', [\App\Http\Controllers\Auth\UserController::class, 'delete'])->middleware(['permission:delete user']);
  
    Route::group(['prefix' => 'flock'], function () {
        Route::get('/all', [\App\Http\Controllers\FlockController::class, 'index']);
        Route::get('/products/grade', [\App\Http\Controllers\GradingController::class, 'index']);
        Route::put('/edit/{flock}/flockcontrol', [\App\Http\Controllers\FlockControlController::class, 'update'])->middleware('permission:edit flock control');
        Route::delete('/delete/{flock}/flockcontrol', [\App\Http\Controllers\FlockControlController::class, 'destroy'])->middleware('permission:delete flock control');
        Route::get('/create', [\App\Http\Controllers\FlockController::class, 'showcreateflockform'])->middleware('permission:create flock');
        Route::post('/create', [\App\Http\Controllers\FlockController::class, 'createnewflock'])->middleware('permission:create flock');
        Route::post('/control/create', [\App\Http\Controllers\FlockControlController::class, 'create'])->middleware('permission:create flock control');
        Route::get('/compare', [\App\Http\Controllers\FlockController::class, 'compare']);
        Route::get('/control/data', [\App\Http\Controllers\FlockControlController::class, 'index'])->middleware('permission:edit flock control');
    });

    Route::group(['prefix' => 'stock'], function () {
        Route::get('/products/manage', [\App\Http\Controllers\ManageProductsController::class, 'index'])->middleware('permission:manage stock data');
        Route::get('/feeds/manage', [\App\Http\Controllers\FeedController::class, 'showFeedStockPage'])->middleware('permission:manage stock data');
        Route::get('/daily', [\App\Http\Controllers\StockController::class, 'index'])->middleware('permission:manage stock data');
        Route::get('/add', [\App\Http\Controllers\StockController::class, 'showcreateform'])->middleware('permission:create stock data');
        Route::post('/add', [\App\Http\Controllers\StockController::class, 'create'])->middleware('permission:create stock data');
        Route::put('/update/{stock}', [\App\Http\Controllers\StockController::class, 'update'])->middleware('permission:edit stock data');
        Route::delete('/delete/{stock}', [\App\Http\Controllers\StockController::class, 'destroy'])->middleware('permission:delete stock data');
    });

    Route::group(['prefix' => 'pen'], function () {
        Route::get('/all', [\App\Http\Controllers\ShedController::class, 'index'])->middleware(['permission:create pen','permission:edit pen','permission:delete pen']);
        Route::get('/create', [\App\Http\Controllers\ShedController::class, 'showcreateform'])->middleware('permission:create pen');
        Route::post('/create', [\App\Http\Controllers\ShedController::class, 'create'])->middleware('permission:create pen');;
    });
    Route::group(['prefix' => 'invoice'], function () {
        Route::get('/all', [\App\Http\Controllers\InvoiceController::class, 'index']);
        Route::get('/create', [\App\Http\Controllers\InvoiceController::class, 'index']);
        Route::post('/create', [\App\Http\Controllers\InvoiceController::class, 'create']);
        Route::post('process', [\App\Http\Controllers\InvoiceController::class, 'processinvoice']);
    });

    Route::get('/payments/all', [App\Http\Controllers\PaymentController::class, 'index']);


    Route::group(['middleware' => 'permission:define system data'], function () {
        Route::post('/breed/create', [\App\Http\Controllers\BreedController::class, 'create']);
        Route::post('feed/create', [\App\Http\Controllers\FeedController::class, 'create']);
        Route::post('/roles/create', [\App\Http\Controllers\RolesController::class, 'create']);
        Route::post('/definitions/product/create', [\App\Http\Controllers\ProductsdefinitionController::class, 'create']);
        Route::get('/system/definitions', [\App\Http\Controllers\SystemdefinitionsContoller::class, 'index']);
    });


  
});
