<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller {
    public function checkout(Request $r){
        $user = $r->user();
        $cart = $user->cart()->with('items.product')->first();
        if(!$cart || $cart->items->isEmpty()) return response()->json(['message'=>'Empty cart'],422);

        foreach($cart->items as $ci){
            if($ci->product->stock < $ci->quantity) return response()->json(['message'=>'Insufficient stock for '.$ci->product->productName],422);
        }

        $order = Order::create(['user_id'=>$user->id,'orderDate'=>now(),'status'=>'PENDING','totalAmount'=>$cart->total]);

        foreach($cart->items as $ci){
            $p = $ci->product; $p->stock -= $ci->quantity; $p->save();
        }

        $cart->items()->delete();
        $cart->total = 0; $cart->save();

        return response()->json($order);
    }
}
