<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
  AuthController, ProductController, CartController, OrderController,
  PaymentController, StoryController, CampaignController, DonationController
};

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');

Route::get('/products',[ProductController::class,'index']);
Route::get('/stories',[StoryController::class,'index']);
Route::get('/campaigns',[CampaignController::class,'index']);

Route::middleware('auth:sanctum')->group(function(){
  Route::get('/cart',[CartController::class,'show']);
  Route::post('/cart/add',[CartController::class,'add']);
  Route::post('/cart/update',[CartController::class,'updateQty']);
  Route::post('/cart/remove',[CartController::class,'remove']);

  Route::post('/checkout',[OrderController::class,'checkout']);
  Route::post('/pay',[PaymentController::class,'pay']);

  Route::post('/donate',[DonationController::class,'donate']);
});
