import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // ✅ new state
  const nav = useNavigate();

  const placeOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = {
        items: items.map(i => ({
          product_id: i.product.id,
          name: i.product.productName,
          price: i.product.productPrice,
          quantity: i.quantity,
        })),
        totalAmount: subtotal,
      };
      await api.post('/orders', payload);

      clearCart();
      setSuccess(true); 
      setTimeout(() => {
        nav('/');
      }, 2500);

    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || e.message);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="container py-20">
        <div className="card text-center bg-green-50">
          <h1 className="text-2xl font-bold mb-2 inline-flex items-center justify-center gap-2">
            <svg aria-hidden="true" className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Thank you!
          </h1>
          <p>Your order has been placed successfully.</p>
          <p className="text-gray-600 mt-2">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="card p-6">
            <h2 className="font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm font-medium">Full Name</label>
              <input className="w-full border rounded px-3 py-2" placeholder="Full name" />

              <label className="text-sm font-medium">Phone Number</label>
              <input className="w-full border rounded px-3 py-2" placeholder="Phone" />

              <label className="text-sm font-medium">Address</label>
              <textarea className="w-full border rounded px-3 py-2 h-32" placeholder="Address" />
            </div>
          </div>

          <div className="mt-6 card p-6">
            <h3 className="font-semibold mb-3">Choose Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 border rounded shadow-sm text-center">Cash on Delivery</div>
              <div className="p-6 border rounded shadow-sm text-center">Credit Card</div>
            </div>
            <div className="mt-4 flex gap-4">
              <button onClick={()=>nav('/cart')} className="btn-muted flex-1">Back to Cart</button>
              <button onClick={placeOrder} disabled={loading} className="btn-primary flex-1">{loading ? 'Placing...' : 'Place Order'}</button>
            </div>
          </div>
        </div>

        <aside>
          <div className="card p-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {items.map(it => (
                <div key={it.product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">{it.product.image && <img src={it.product.image} className="w-full h-full object-cover" />}</div>
                  <div className="flex-1">
                    <div className="font-medium">{it.product.productName}</div>
                    <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                  </div>
                  <div>₱{Number(it.product.productPrice * it.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold"><span>Subtotal</span><span>₱{Number(subtotal).toFixed(2)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
