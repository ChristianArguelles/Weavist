<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Cart;

class AuthController extends Controller {
    public function register(Request $r){
        $data = $r->validate([
          'name'=>'required','email'=>'required|email|unique:users','password'=>'required|min:6'
        ]);
        $user = User::create([
          'name'=>$data['name'],'email'=>$data['email'],'password'=>bcrypt($data['password'])
        ]);
        $token = $user->createToken('web')->plainTextToken;
        Cart::firstOrCreate(['user_id'=>$user->id]);
        return response()->json(['user'=>$user,'token'=>$token]);
    }

    public function login(Request $r){
        $cred = $r->validate(['email'=>'required|email','password'=>'required']);
        if(!auth()->attempt($cred)) return response()->json(['message'=>'Invalid credentials'],401);
        $user = auth()->user();
        $token = $user->createToken('web')->plainTextToken;
        Cart::firstOrCreate(['user_id'=>$user->id]);
        return response()->json(['user'=>$user,'token'=>$token]);
    }

    public function logout(Request $r){
        $r->user()->currentAccessToken()->delete();
        return response()->json(['ok'=>true]);
    }
}
