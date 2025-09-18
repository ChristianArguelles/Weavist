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
            'items'=>'required|array',
            'totalAmount'=>'required|numeric',
            'orderDate'=>'nullable|date',
        ]);
        $user = $r->user();
        $order = Order::create([
            'user_id' => $user->id,
            'orderDate' => Carbon::now(),
            'status' => 'pending',
            'totalAmount' => $data['totalAmount'],
            'items' => $data['items'],
        ]);
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
