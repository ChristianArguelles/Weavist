<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use Carbon\Carbon;

class OrderController extends Controller
{
    public function index() {
        return Order::with('user')->orderBy('id','desc')->get();
    }

    public function store(Request $r) {
        $data = $r->validate([
            'items' => 'required|array|min:1',
            'items.*.product.id' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
            'name' => 'required|string',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
        ]);

        // Check stock for each item
        foreach($data['items'] as $it) {
            $product = \App\Models\Product::find($it['product']['id']);
            if(!$product) {
                return response()->json(['message' => 'Product not found: id '.$it['product']['id']], 404);
            }
            if($product->stock < $it['quantity']) {
                return response()->json(['message' => 'Insufficient stock for '.$product->productName, 'product' => $product], 400);
            }
        }

        // compute totalAmount from items (price * qty)
        $total = 0;
        foreach($data['items'] as $it) {
            $product = \App\Models\Product::find($it['product']['id']);
            $price = floatval($product->productPrice ?? $product->price ?? 0);
            $qty = intval($it['quantity']);
            $total += $price * $qty;
        }

        // create order with total and orderDate
        $order = Order::create([
            'user_id' => $r->user() ? $r->user()->id : null,
            'name' => $data['name'],
            'address' => $data['address'] ?? null,
            'phone' => $data['phone'] ?? null,
            'email' => $data['email'] ?? null,
            'status' => 'pending',
            'items' => $data['items'],
            'totalAmount' => $total,
            'orderDate' => \Carbon\Carbon::now(),
        ]);

        // decrement stock atomically
        foreach($data['items'] as $it) {
            $product = \App\Models\Product::find($it['product']['id']);
            $qty = intval($it['quantity']);
            if($qty > 0) {
                $product->decrement('stock', $qty);
            }
        }

        return response()->json($order, 201);
    }

    public function show(Order $order) {
        return $order->load('user');
    }

    public function update(Request $r, Order $order) {
        $order->update($r->only('status'));
        return $order;
    }
}
