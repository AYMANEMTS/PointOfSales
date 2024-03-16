<?php

use App\Http\Controllers\Api\AuthUser\LoginController;
use App\Http\Controllers\Api\CommandController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Api\CashierController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('menus', MenuController::class);
    Route::apiResource('tables', TableController::class);
    Route::apiResource('commands', CommandController::class);
    Route::controller(CashierController::class)->group(function () {
        Route::get('/command/today', 'getTodayCommands');
        Route::post('/command/{id}/payed', 'markAsPayedCommand');
        Route::post('/command/{id}/add_new_menus', 'commandAddMenus');
    });
    Route::controller(AdminController::class)->group(function () {
        Route::get('/users','getUsers');
        Route::delete('/users/{id}/destroy','destroyUser');
        Route::post('/users/{id}/update','updateUser');
        Route::post('/users/{id}/changePassword','changePassword');
        Route::post('menus/update/{id}','updateMenu');
        Route::post('/tables/config','tableSettings');
        Route::get('/rosets/commands','getRossetCommands');
        Route::get('/get_commands_by_date','getCommandsByDate');

    });
});
Route::post("/login",[LoginController::class,'login']);
Route::post("/add-user",[LoginController::class,'store'])->middleware('auth:sanctum');

