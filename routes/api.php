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

Route::group(['middleware' => 'auth'], function () {

    Route::get('/flocks/all', function () {
        return ([
            'flocks' => \App\Models\Flock::with('pen')->get()->map(function($item){
                return([
                    'flock_identification_name'=> $item->flock_identification_name,
                    'id'=> $item->id,
                    'shed_identification_name' => $item->pen->shed_identification_name,
                    'shed_id' => $item->pen->id
                ]);
            })
        ]);
    });

    Route::get('/payment/methods/all' ,function(){
            return \App\Models\Paymentmethods::get(['id','method']);
    });

    Route::get('/roles/all', function () {
        return ([
            'roles' => \Spatie\Permission\Models\Role::get(['id', 'name'])->except('3')
        ]);
    });


    Route::get('/jobpositions/all', function () {
        return ([
            'jobs' => \App\Models\Jobposition::get(['id', 'position'])
        ]);
    });

    Route::get('/sheds/all', function () {
        return ([
            'sheds' => \App\Models\Shed::get(['id', 'shed_identification_name'])
        ]);
    });



    Route::post('flock/control/create', [\App\Http\Controllers\FlockControlController::class, 'create'])->middleware('permission:create flock control');

    Route::post('/stock/productstock/add',[\App\Http\Controllers\ProductstockController::class, 'addToStock']);
    Route::post('/stock/productstock/remove',[\App\Http\Controllers\ProductstockController::class, 'removeFromStock']);
    Route::get('/product/history/{product}',[\App\Http\Controllers\ProductstockController::class, 'getProductHistory']);
    Route::get('/product/all',[\App\Http\Controllers\ManageProductsController::class,'allProducts']);
    Route::get('/product/stockable',[\App\Http\Controllers\ManageProductsController::class,'stockableProducts']);
    Route::get('/product/get/{id}',[\App\Http\Controllers\ManageProductsController::class,'show']);
    
    Route::get('/feed/all',[\App\Http\Controllers\FeedController::class,'index']);
    Route::get('/feed/select/all',[\App\Http\Controllers\FeedController::class,'feedsToSelect']);
    Route::get('/feed/get/{id}',[\App\Http\Controllers\FeedController::class,'show']);
    Route::get('/feed/history/{feed}',[\App\Http\Controllers\FeedController::class, 'getFeedHistory']);
    Route::post('/stock/feedstock/add',[\App\Http\Controllers\FeedController::class, 'addToStock']);
    Route::post('/stock/feedstock/remove',[\App\Http\Controllers\FeedController::class, 'removeFromStock']);
   
    Route::get('/definitions/product/all',[\App\Http\Controllers\ProductsdefinitionController::class, 'index'])->middleware('role:Super Admin');
    Route::get('/breed/all',[\App\Http\Controllers\BreedController::class, 'index']);
    Route::get('/breed/all/select',[\App\Http\Controllers\BreedController::class,'breedsForSelect']);
    Route::delete('/expense/delete/{expense}',[\App\Http\Controllers\ExpenseController::class,'destroy'])->middleware('permission:delete stock');
    Route::post('/expense/create',[\App\Http\Controllers\ExpenseController::class,'store'])->middleware('permission:delete stock');
    Route::put('/expense/update/{expense}',[\App\Http\Controllers\ExpenseController::class,'update'])->middleware('permission:delete stock');
    Route::get('/flockcontrol/getdata/{flockControl}', [\App\Http\Controllers\FlockControlController::class, 'show']);
    Route::get('/user/getuserinfo/{user}', [\App\Http\Controllers\Auth\UserController::class, 'getuserinfo'])->middleware(['permission:edit user', 'role:Super Admin']);
    Route::get('/stock/getdata/{stock}',[\App\Http\Controllers\StockController::class,'show'])->middleware('permission:edit stock');
    Route::get('/expense/show/{expense}',[\App\Http\Controllers\ExpenseController::class,'show']);
    Route::get('/sales/allsales',[\App\Http\Controllers\SaleController::class,'saleHistory']);
    Route::get('/saleitems/{saleid}/view',[\App\Http\Controllers\SaleitemController::class,'show']);
    Route::get('/invoice/{saleid}/store',[\App\Http\Controllers\InvoiceController::class,'store']);
    Route::get('/invoice/{invoice}/show',[\App\Http\Controllers\InvoiceController::class,'show']);
});
