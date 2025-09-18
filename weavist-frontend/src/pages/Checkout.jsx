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
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="bg-green-100 text-green-800 p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-2">🎉 Thank you!</h1>
          <p>Your order has been placed successfully.</p>
          <p className="text-gray-600 mt-2">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Shipping Information</h2>
          <input className="w-full border rounded px-3 py-2 mb-3" placeholder="Full name" />
          <input className="w-full border rounded px-3 py-2 mb-3" placeholder="Address" />
          <input className="w-full border rounded px-3 py-2 mb-3" placeholder="Phone" />
          <select className="w-full border rounded px-3 py-2 mb-3">
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Bank Transfer</option>
          </select>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Order Summary</h2>
          {items.map(it => (
            <div key={it.product.id} className="flex justify-between mb-2">
              <div>{it.product.productName} x {it.quantity}</div>
              <div>₱{Number(it.product.productPrice * it.quantity).toFixed(2)}</div>
            </div>
          ))}
          <hr className="my-3" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₱{Number(subtotal).toFixed(2)}</span>
          </div>
          {error && <div className="text-red-600 mt-3">{error}</div>}
          <button
            onClick={placeOrder}
            className="btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? 'Placing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
