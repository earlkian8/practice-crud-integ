<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EmployeesController;

Route::get('/employees', [EmployeesController::class, 'index']);
Route::post('/employees', [EmployeesController::class, 'store']);
Route::get('/employees/{id}', [EmployeesController::class, 'show']);
Route::put('/employees/{id}', [EmployeesController::class, 'update']);
Route::delete('/employees/{id}', [EmployeesController::class, 'destroy']);

// For serving images
Route::get('/employees/image/{image}', [EmployeesController::class, 'getItemsImage']);
