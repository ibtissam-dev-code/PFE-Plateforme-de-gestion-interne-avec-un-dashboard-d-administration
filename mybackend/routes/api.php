<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\UserController; // عيطنا للـ Controller الجديد هنا

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// 1️⃣ الروت ديال المستخدم الحالي اللي مسجل الدخول
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// 2️⃣ تسجيل مستخدم جديد، الدخول والخروج
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::middleware('auth:sanctum')->post('/logout', [AuthenticatedSessionController::class, 'destroy']);

// 3️⃣ الرووتس ديال CRUD ta3 Users (الموظفين)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);          // List all users
    Route::get('/users/{id}', [UserController::class, 'show']);      // Show single user
    Route::put('/users/{id}', [UserController::class, 'update']);    // Update user
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete user
});

// 4️⃣ الرووتس ديال CRUD ta3 clients
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/clients', [ClientController::class, 'index']);      
    Route::get('/clients/{id}', [ClientController::class, 'show']);  
    Route::post('/clients', [ClientController::class, 'store']);     
    Route::put('/clients/{id}', [ClientController::class, 'update']); 
    Route::delete('/clients/{id}', [ClientController::class, 'destroy']); 
});

// 5️⃣ الرووتس ديال CRUD ta3 Projects
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/projets', [ProjetController::class, 'index']);
    Route::get('/projets/{id}', [ProjetController::class, 'show']);
    Route::post('/projets', [ProjetController::class, 'store']);
    Route::put('/projets/{id}', [ProjetController::class, 'update']);
    Route::delete('/projets/{id}', [ProjetController::class, 'destroy']);
});