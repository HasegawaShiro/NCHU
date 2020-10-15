<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\System\UserController;

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
Route::get('test', [Controller::class, 'test']);

Route::group(['prefix' => 'api'], function () {
    Route::post('login', [LoginController::class, 'login'])->name("system.auth.login.post");
    Route::any('logout', [LoginController::class, 'logout'])->name('system.auth.logout');
    Route::get('csrf', function (Request $request) {
        return csrf_token();
    });
    Route::get('select/{table}', [Controller::class, 'getReferenceSelect']);
    Route::get('get/{table}/{id?}', [Controller::class, 'getData']);
    Route::group(['middleware' => 'auth'], function() {
        Route::get('user', [UserController::class, 'getUserSession']);
        Route::post('post/{table}', [Controller::class, 'postData']);
        Route::put('put/{table}/{id}', [Controller::class, 'putData']);
        Route::delete('delete/{table}/{id}', [Controller::class, 'deleteData']);
    });
});
/* Route::get('/api/pong', function (Request $request) {
    return "ping";
}); */


Route::get(
    '{uri}',
    '\\'.Pallares\LaravelNuxt\Controllers\NuxtController::class
)->where('uri', '.*');

Auth::routes();
