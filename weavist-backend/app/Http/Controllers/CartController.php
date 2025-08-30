<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;

class CartController extends Controller {
    public function show(Request $r){
        $cart = $r->user()->cart()->with('items.product')->first();
        return response()->json($cart);
    }

    public function add(Request $r){
        $data = $r->validate(['product_id'=>'required|exists:products,id','quantity'=>'nullable|integer|min:1']);
        $user = $r->user();
        $cart = $user->cart()->firstOrCreate();
        $product = Product::findOrFail($data['product_id']);
        $qty = $data['quantity'] ?? 1;
        if($product->stock < $qty) return response()->json(['message'=>'Out of stock'],422);

        $item = $cart->items()->firstOrCreate(
            ['product_id'=>$product->id],
            ['quantity'=>0,'price'=>$product->productPrice]
        );
        $item->quantity += $qty;
        $item->price = $product->productPrice;
        $item->save();

        $cart->total = $cart->items()->sum(\DB::raw('quantity*price'));
        $cart->save();
        return response()->json($cart->load('items.product'));
    }

    public function updateQty(Request $r){
        $data = $r->validate(['item_id'=>'required|exists:cart_items,id','quantity'=>'required|integer|min:1']);
        $item = CartItem::findOrFail($data['item_id']);
        $this->authorizeItem($r,$item);
        $item->quantity = $data['quantity']; $item->save();
        $cart = $item->cart; $cart->total = $cart->items()->sum(\DB::raw('quantity*price')); $cart->save();
        return response()->json($cart->load('items.product'));
    }

    public function remove(Request $r){
        $data = $r->validate(['item_id'=>'required|exists:cart_items,id']);
        $item = CartItem::findOrFail($data['item_id']);
        $this->authorizeItem($r,$item);
        $item->delete();
        $cart = $r->user()->cart; $cart->total = $cart->items()->sum(\DB::raw('quantity*price')); $cart->save();
        return response()->json($cart->load('items.product'));
    }

    private function authorizeItem(Request $r, CartItem $item){
        if($item->cart->user_id !== $r->user()->id) abort(403);
    }
}
