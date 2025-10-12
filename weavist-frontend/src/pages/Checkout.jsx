import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Backend base URL
const API_URL = "http://127.0.0.1:8000";

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
  const [paymentMethod, setPaymentMethod] = useState('');

  // Payment fields (from SupportWeavers)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [gcashNumber, setGcashNumber] = useState('');

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

    // Validate payment method
    if (!paymentMethod) {
      setError('Please select a payment method');
      setLoading(false);
      return;
    }

    // Validate payment fields
    if (paymentMethod === "card") {
      if (!cardNumber || !cardExpiry || !cardCVV) {
        setError('Please fill in all card details');
        setLoading(false);
        return;
      }
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

    let resp;
    const payload = {
      items: items.map(i => ({ product: { id: i.product.id }, quantity: i.quantity })),
      name,
      address,
      phone,
      email,
      paymentMethod,
      // Include payment details based on method
      ...(paymentMethod === "card" && {
        cardNumber,
        cardExpiry,
        cardCVV
      }),
      ...(paymentMethod === "paypal" && { paypalEmail }),
      ...(paymentMethod === "gcash" && { gcashNumber })
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
            <h3 className="text-xl font-semibold mb-4 text-accent">
              Payment Method
            </h3>
            <div className="flex gap-4 mb-6">
              {["card", "paypal", "gcash", "cod"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`px-6 py-3 border rounded-lg capitalize ${
                    paymentMethod === method
                      ? "bg-accent text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {method === "cod" ? "Cash on Delivery" : method}
                </button>
              ))}
            </div>

            {/* Conditional payment fields */}
            {paymentMethod === "card" && (
              <div className="mb-6 space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-1/2 border rounded-lg px-4 py-3"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardCVV}
                    onChange={(e) => setCardCVV(e.target.value)}
                    className="w-1/2 border rounded-lg px-4 py-3"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="PayPal Email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            )}

            {paymentMethod === "gcash" && (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="GCash Number"
                  value={gcashNumber}
                  onChange={(e) => setGcashNumber(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
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
                // Ensure full image URL
                const imageUrl = it.product.image
                  ? it.product.image.startsWith("http")
                    ? it.product.image
                    : `${API_URL}${it.product.image}`
                  : null;

                return (
                  <div key={it.product.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt={it.product.productName || it.product.name}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                          No img
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{it.product.productName || it.product.name}</div>
                      <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                    </div>
                    <div>₱{Number(it.product.productPrice * it.quantity).toFixed(2)}</div>
                  </div>
                );
              })}
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
