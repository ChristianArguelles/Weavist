import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = "http://127.0.0.1:8000";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user, login } = useAuth();
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Payment fields
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [gcashNumber, setGcashNumber] = useState('');

  // Modal Shipping Info
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAddress(user.address || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
      if (!user.name || !user.address || !user.phone) setShowModal(true);
    }
  }, [user]);

  // Submit shipping info modal
  const submitShippingInfo = async () => {
    if (!name || !address || !phone) {
      alert('Please fill in all required shipping information');
      return;
    }

    try {
      const res = await api.put('/profile', { name, phone, address });
      const updatedUser = res.data;
      const token = localStorage.getItem('weavist_token');
      if (token) login(updatedUser, token);
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    }
  };

  // Submit order
  const submitOrder = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!paymentMethod) {
      setError('Please select a payment method');
      setLoading(false);
      return;
    }

    if (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCVV)) {
      setError('Please fill in all card details');
      setLoading(false);
      return;
    }
    if (paymentMethod === "paypal" && !paypalEmail) {
      setError('Please enter your PayPal email');
      setLoading(false);
      return;
    }
    if (paymentMethod === "gcash" && !gcashNumber) {
      setError('Please enter your GCash number');
      setLoading(false);
      return;
    }

    const payload = {
      items: items.map(i => ({ product: { id: i.product.id }, quantity: i.quantity })),
      name, address, phone, email,
      paymentMethod,
      ...(paymentMethod === "card" && { cardNumber, cardExpiry, cardCVV }),
      ...(paymentMethod === "paypal" && { paypalEmail }),
      ...(paymentMethod === "gcash" && { gcashNumber })
    };

    try {
      const resp = await api.post('/orders', payload);
      if (resp.status === 201) {
        setSuccess(true);
        clearCart();
        setLoading(false);
        nav('/');
      } else {
        setError('Unexpected response from server');
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container py-20">
        <div className="card text-center bg-green-50">
          <h1 className="text-2xl font-bold mb-2 inline-flex items-center justify-center gap-2">
            <svg aria-hidden="true" className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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

      {/* Linear Shipping Info */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50 text-gray-700 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">Shipping Information</h2>
          <div className="font-semibold flex gap-4">
            <span>{name}</span>
            <span>{phone}</span>
            <span>{address}</span>
          </div>
        </div>
        <button className="text-indigo-600 underline" onClick={()=>setShowModal(true)}>Change</button>
      </div>

      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Section */}
        <div>
          <div className="mt-6 card p-6">
            <h3 className="text-xl font-semibold mb-4 text-accent">Payment Method</h3>
            <div className="flex gap-4 mb-6">
              {["card", "paypal", "gcash", "cod"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`px-6 py-3 border rounded-lg capitalize ${paymentMethod === method ? "bg-accent text-white" : "bg-white hover:bg-gray-50"}`}
                >
                  {method === "cod" ? "Cash on Delivery" : method}
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="mb-6 space-y-3">
                <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full border rounded-lg px-4 py-3"/>
                <div className="flex gap-3">
                  <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="w-1/2 border rounded-lg px-4 py-3"/>
                  <input type="text" placeholder="CVV" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)} className="w-1/2 border rounded-lg px-4 py-3"/>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <input type="email" placeholder="PayPal Email" value={paypalEmail} onChange={(e)=>setPaypalEmail(e.target.value)} className="w-full border rounded-lg px-4 py-3 mb-6"/>
            )}

            {paymentMethod === "gcash" && (
              <input type="text" placeholder="GCash Number" value={gcashNumber} onChange={(e)=>setGcashNumber(e.target.value)} className="w-full border rounded-lg px-4 py-3 mb-6"/>
            )}

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
              {items.map(it => {
                const imageUrl = it.product.image
                  ? it.product.image.startsWith("http")
                    ? it.product.image
                    : `${API_URL}${it.product.image}`
                  : null;
                return (
                  <div key={it.product.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                      {imageUrl ? <img src={imageUrl} alt={it.product.productName} className="w-full h-full object-cover"/> : <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">No img</div>}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{it.product.productName}</div>
                      <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                    </div>
                    <div>₱{(it.product.productPrice * it.quantity).toFixed(2)}</div>
                  </div>
                );
              })}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Shipping Info Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-blur-md bg-black/30"/>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 border border-white/40">
            <h2 className="text-xl font-bold mb-4">Complete Your Shipping Info</h2>
            <div className="grid gap-3">
              <input placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-3 py-2"/>
              <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full border rounded px-3 py-2"/>
              <textarea placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={()=>nav('/cart')} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={submitShippingInfo} className="px-4 py-2 bg-primary text-white rounded-lg">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}