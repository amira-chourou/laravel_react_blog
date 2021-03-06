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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Define Routes
Route::post('login', 'Auth\\LoginController@login')->name('login');
Route::post('register', 'Auth\\RegisterController@register')->name('register');
Route::get('logout', 'Auth\\LoginController@logout')->name('logout');
Route::get('check-auth', 'Auth\\LoginController@checkAuth')->name('logout');
Route::resource('posts', 'PostsController');
Route::post('/posts/update/{post}', 'PostsController@update')->name('update');
//Route::get('/posts/', 'PostsController@index')->name('index');

Route::resource('comments', 'CommentsController');
