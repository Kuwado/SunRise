<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UploadController;
use App\Services\LocationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FavoriteController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/user/update/{id}', [UserController::class, 'updateUser']);
Route::get('/user', [UserController::class, 'getUser']);

// Restaurant
Route::post('/restaurant/create', [RestaurantController::class, 'createRestaurant']);
Route::post('/restaurant/update/{id}', [RestaurantController::class, 'updateRestaurant']);
Route::delete('/restaurant/delete/{id}', [RestaurantController::class, 'deleteRestaurant']);
Route::get('/restaurant', [RestaurantController::class, 'getRestaurant']);
Route::get('/restaurants', [RestaurantController::class, 'getRestaurants']);
Route::get('/restaurants/count', [RestaurantController::class, 'getCounts']);

// Reviews
Route::get('/reviews', [ReviewController::class, 'getReviews']);



//Upload
Route::post('/upload/images', [UploadController::class, 'uploadImages']);
Route::post('/upload/image', [UploadController::class, 'uploadImage']);

// Location
Route::get('/location', [LocationController::class, 'getCoordinates']);

//Favorite
Route::post('/favorite/create', [FavoriteController::class, 'createFavorite']);
Route::delete('/favorite/delete/{id}', [FavoriteController::class, 'deleteFavorite']);

