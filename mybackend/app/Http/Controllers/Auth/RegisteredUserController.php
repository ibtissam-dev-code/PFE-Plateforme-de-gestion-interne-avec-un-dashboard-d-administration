<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisteredUserController extends Controller
{
    public function store(Request $request)
    {
        // تحقق من البيانات
        $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // إنشاء مستخدم جديد
        $user = User::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // إنشاء token
        $token = $user->createToken('api-token')->plainTextToken;

        // إرجاع JSON للمستخدم + token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
}