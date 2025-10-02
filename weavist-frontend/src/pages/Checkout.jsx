import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();
  const { user } = useAuth();

  // shipping fields
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [editable, setEditable] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const submitOrder = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    let resp;
    const payload = {
      items: items.map(i => ({ product: { id: i.product.id }, quantity: i.quantity })),
      name,
      address,
      phone,
      email,
    };

    try {
      resp = await api.post('/orders', payload);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed');
      setLoading(false);
      return;
    }

    if (resp && resp.status === 201) {
      setSuccess(true);
      clearCart();
      setLoading(false);
      nav('/');
    } else {
      setError('Unexpected response from server');
      setLoading(false);
    }
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
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      {success && <div className="mb-4 text-green-600 text-center">Order placed successfully!</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Shipping info */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold mb-2">Shipping Information</h2>
              <button onClick={()=>setEditable(!editable)} className="text-sm text-primary">{editable ? 'Lock' : 'Edit'}</button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm font-medium">Full Name</label>
              <input className="w-full border rounded px-3 py-2" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} disabled={!editable} />

              <label className="text-sm font-medium">Phone Number</label>
              <input className="w-full border rounded px-3 py-2" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} disabled={!editable} />

              <label className="text-sm font-medium">Address</label>
              <textarea className="w-full border rounded px-3 py-2 h-32" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} disabled={!editable} />

              <label className="text-sm font-medium">Email</label>
              <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} disabled={!editable} />
            </div>
          </div>

          {/* Payment method */}
          <div className="mt-6 card p-6">
            <h3 className="font-semibold mb-3">Choose Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={()=>setPaymentMethod('cod')} className={`p-6 border rounded shadow-sm text-center ${paymentMethod==='cod' ? 'border-accent ring-accent' : ''}`}>Cash on Delivery</button>
              <button type="button" onClick={()=>setPaymentMethod('card')} className={`p-6 border rounded shadow-sm text-center ${paymentMethod==='card' ? 'border-accent ring-accent' : ''}`}>Credit Card</button>
            </div>
            <div className="mt-4 flex gap-4">
              <button onClick={()=>nav('/cart')} className="btn-muted flex-1">Back to Cart</button>
              <button onClick={submitOrder} disabled={loading} className="btn-primary flex-1">{loading ? 'Placing...' : 'Place Order'}</button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <aside>
          <div className="card p-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {items.map(it => (
                <div key={it.product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    {it.product.image && <img src={it.product.image} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{it.product.productName || it.product.name}</div>
                    <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                  </div>
                  <div>₱{Number(it.product.productPrice * it.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>₱{Number(subtotal).toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
