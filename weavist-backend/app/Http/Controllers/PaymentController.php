<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Payment;

class PaymentController extends Controller {
    public function pay(Request $r){
        $data = $r->validate(['order_id'=>'required|exists:orders,id','method'=>'required|string']);
        $order = Order::findOrFail($data['order_id']);
        if($order->user_id !== $r->user()->id) abort(403);

        $payment = Payment::create([
            'order_id'=>$order->id,
            'amount'=>$order->totalAmount,
            'paymentMethod'=>$data['method'],
            'status'=>'PAID'
        ]);

        $order->status = 'PAID'; $order->save();
        return response()->json(['order'=>$order,'payment'=>$payment]);
    }
}
