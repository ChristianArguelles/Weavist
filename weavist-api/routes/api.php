<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\StoryController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\DonationController;

// Public product/story/campaign listing
Route::get('/products', [ProductController::class,'index']);
Route::get('/products/{product}', [ProductController::class,'show']);
Route::get('/stories', [StoryController::class,'index']);
Route::get('/stories/{story}', [StoryController::class,'show']);
Route::get('/campaigns', [CampaignController::class,'index']);
Route::get('/campaigns/{campaign}', [CampaignController::class,'show']);

// Auth
Route::post('/auth/register', [AuthController::class,'register']);
Route::post('/auth/login', [AuthController::class,'login']);

// Email verification
Route::get('/email/verify/{id}/{hash}', [AuthController::class,'verify'])->name('verification.verify');
Route::post('/email/resend', [AuthController::class,'resendVerification']);

// Test email (for local development)
Route::get('/test-email', function() {
    $user = \App\Models\User::first();
    if ($user) {
        $user->sendEmailVerificationNotification();
        return response()->json(['message' => 'Test email sent to ' . $user->email . '. Check storage/logs/laravel.log']);
    }
    return response()->json(['message' => 'No users found. Please register first.']);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/auth/logout',[AuthController::class,'logout']);
    Route::get('/profile',[AuthController::class,'profile']);
    Route::put('/profile',[AuthController::class,'update']);

    // CRUD resources
    Route::apiResource('products', ProductController::class)->except(['index','show']);
    Route::apiResource('stories', StoryController::class)->except(['index','show']);
    Route::apiResource('campaigns', CampaignController::class)->except(['index','show']);
    
    // Campaign archive toggle
    Route::patch('/campaigns/{campaign}/archive', [CampaignController::class,'archive']);

    // Orders & Donations
    Route::post('/orders', [OrderController::class,'store']);
    Route::get('/orders', [OrderController::class,'index']);
    Route::get('/orders/{order}', [OrderController::class,'show']);
    Route::put('/orders/{order}', [OrderController::class,'update']);

    Route::post('/donations', [DonationController::class,'store']);
    Route::get('/donations', [DonationController::class,'index']);

    // image uploads/listing for admin UIs
    Route::post('/admin/uploads', [\App\Http\Controllers\Api\UploadController::class, 'upload']);
    Route::get('/admin/uploads', [\App\Http\Controllers\Api\UploadController::class, 'list']);
});
