<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $r) {
        $data = $r->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'role' => 'nullable|string'
        ]);

        $data['password'] = Hash::make($data['password']);
        $data['role'] = $r->input('role', 'user');

        $user = User::create($data);
        
        // Send email verification notification
        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Registration successful! Please check your email to verify your account.',
            'user' => $user
        ], 201);
    }

    public function login(Request $r) {
        $r->validate(['email'=>'required|email','password'=>'required']);
        $user = User::where('email', $r->email)->first();
        if (!$user || !Hash::check($r->password, $user->password)) {
            return response()->json(['message'=>'Invalid credentials'], 401);
        }
        
        // Check if email is verified
        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Please verify your email before logging in.',
                'email_verified' => false
            ], 403);
        }
        
        $token = $user->createToken('api-token')->plainTextToken;
        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function logout(Request $r) {
        $u = $r->user();
        if ($u) {
            $u->tokens()->delete();
            return response()->json(['message'=>'Logged out']);
        }
        return response()->json(['message'=>'No user authenticated'], 400);
    }

    public function profile(Request $r) {
        return response()->json($r->user());
    }

    public function update(Request $r) {
        $u = $r->user();
        if (!$u) return response()->json(['message' => 'Unauthenticated'], 401);

        $data = $r->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,'.$u->id,
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $u->fill($data);
        $u->save();

        return response()->json($u);
    }

    public function verify(Request $r, $id, $hash) {
        $user = User::findOrFail($id);
        
        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Invalid verification link'], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified'], 400);
        }

        $user->markEmailAsVerified();

        return response()->json(['message' => 'Email verified successfully']);
    }

    public function resendVerification(Request $r) {
        $r->validate(['email' => 'required|email']);
        
        $user = User::where('email', $r->email)->first();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified'], 400);
        }

        $user->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification email sent']);
    }
}
