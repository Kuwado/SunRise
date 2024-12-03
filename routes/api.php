<?php

use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UploadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/user/update/{id}', [UserController::class, 'update']);

// Restaurant
Route::post('/restaurant/create', [RestaurantController::class, 'createRestaurant']);
Route::post('/restaurant/update/{id}', [RestaurantController::class, 'updateRestaurant']);
Route::get('/restaurant', [RestaurantController::class, 'getRestaurant']);
Route::get('/restaurants', [RestaurantController::class, 'getRestaurants']);

//Upload
Route::post('/upload/images', [UploadController::class, 'uploadImages']);
Route::post('/upload/image', [UploadController::class, 'uploadImage']);