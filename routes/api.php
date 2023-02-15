<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    Route::get('user/profile',[\App\Http\Controllers\UserprofileController::class, 'show']);

    Route::get('/flocks/all', [\App\Http\Controllers\FlockControlController::class, 'flocksToSelect']);
    Route::get('/expensibles/all', [\App\Http\Controllers\ExpensibleItemsController::class, 'expensibleItemsToSelect']);
    Route::get('/payment/methods/all',[\App\Http\Controllers\PaymentController::class, 'paymentToSelect']);
    Route::get('/jobpositions/all', [\App\Http\Controllers\JobpositionController::class,'jobPostionToSelect']);
    Route::get('/sheds/all',[\App\Http\Controllers\ShedController::class,'shedToSelect']);
    Route::get('/permission/all', [\App\Http\Controllers\RolesController::class, 'permissionToSelect']);
    
    Route::get('/dasboard/data', [\App\Http\Controllers\DashboardController::class, 'data']);
    Route::get('/roles/all', [\App\Http\Controllers\RolesController::class, 'index']);
    Route::get('/roles/select', [\App\Http\Controllers\RolesController::class, 'RolesToSelect']);
    Route::get('/roles/{rolename}/permissions',[\App\Http\Controllers\RolesController::class, 'getPermissionFromRoleName']);
    Route::post('/roles/permissions/new',[\App\Http\Controllers\RolesController::class, 'applyNewPermissions']);
    Route::get('/notifications/uread/count',[\App\Http\Controllers\NotificationController::class, 'getUnreadNotificationCount']);
    Route::get('/notifications/uread',[\App\Http\Controllers\NotificationController::class, 'getUnreadNotification']);
    Route::get('/notifications/uread/markasread',[\App\Http\Controllers\NotificationController::class, 'markAsRead']);

    Route::post('flock/control/create', [\App\Http\Controllers\FlockControlController::class, 'create'])->middleware('permission:create flock control');

    Route::post('/stock/productstock/add', [\App\Http\Controllers\ProductstockController::class, 'addToStock']);
    Route::get('/stock/get', [\App\Http\Controllers\StockController::class, 'getStockPerGivenDay']);
    Route::post('/stock/productstock/remove', [\App\Http\Controllers\ProductstockController::class, 'removeFromStock']);
    Route::get('/product/history/{product}', [\App\Http\Controllers\ProductstockController::class, 'getProductHistory']);
    Route::get('/product/all', [\App\Http\Controllers\ManageProductsController::class, 'allProducts']);
    Route::get('/product/stockable', [\App\Http\Controllers\ManageProductsController::class, 'stockableProducts']);
    Route::get('/product/get/{id}', [\App\Http\Controllers\ManageProductsController::class, 'show']);
    Route::get('/grading/history', [\App\Http\Controllers\GradingController::class, 'gradingHistory']);
    Route::get('/feed/all', [\App\Http\Controllers\FeedController::class, 'index']);
    Route::get('/feed/select/all', [\App\Http\Controllers\FeedController::class, 'feedsToSelect']);
    Route::get('/feed/get/{id}', [\App\Http\Controllers\FeedController::class, 'show']);
    Route::get('/feed/history/{feed}', [\App\Http\Controllers\FeedController::class, 'getFeedHistory']);
    Route::post('/stock/feedstock/add', [\App\Http\Controllers\FeedController::class, 'addToStock']);
    Route::post('/stock/feedstock/remove', [\App\Http\Controllers\FeedController::class, 'removeFromStock']);

    Route::get('/definitions/product/all', [\App\Http\Controllers\ProductsdefinitionController::class, 'index'])->middleware('role:Super Admin');
    Route::get('/breed/all', [\App\Http\Controllers\BreedController::class, 'index']);
    Route::get('/breed/all/select', [\App\Http\Controllers\BreedController::class, 'breedsForSelect']);
    Route::delete('/expense/delete/{expense}', [\App\Http\Controllers\ExpenseController::class, 'destroy'])->middleware('permission:delete stock');
    Route::post('/expense/create', [\App\Http\Controllers\ExpenseController::class, 'store'])->middleware('permission:delete stock');
    Route::put('/expense/update/{expense}', [\App\Http\Controllers\ExpenseController::class, 'update'])->middleware('permission:delete stock');
    Route::get('/flockcontrol/getdata/{flockControl}', [\App\Http\Controllers\FlockControlController::class, 'show']);
    Route::get('/user/getuserinfo/{user}', [\App\Http\Controllers\Auth\UserController::class, 'getuserinfo'])->middleware(['role:Super Admin' ]);
    Route::get('/stock/getdata/{stock}', [\App\Http\Controllers\StockController::class, 'show'])->middleware('permission:edit stock');
    Route::get('/expense/show/{expense}', [\App\Http\Controllers\ExpenseController::class, 'show']);
    Route::get('/sales/allsales', [\App\Http\Controllers\SaleController::class, 'saleHistory']);
    Route::get('/saleitems/{saleid}/view', [\App\Http\Controllers\SaleitemController::class, 'show']);
    Route::get('/invoice/{saleid}/store', [\App\Http\Controllers\InvoiceController::class, 'store']);
    Route::get('/invoice/{invoice}/show', [\App\Http\Controllers\InvoiceController::class, 'show']);
    Route::get('/grading/{flockcontrol}/show', [\App\Http\Controllers\GradingController::class, 'show']);
    Route::post('/grading/update', [\App\Http\Controllers\GradingController::class, 'update']);
    Route::get('/receipt/process/{invoice_id}/{sale_id}', [\App\Http\Controllers\ReceiptController::class, 'store']);
    Route::post('/stock/create/new', [\App\Http\Controllers\StockController::class, 'create']);
});
