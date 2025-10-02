import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart(){
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const nav = useNavigate();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>
      {items.length === 0 ? (
        <div>Your cart is empty. <Link to="/shop" className="text-indigo-600">Shop now</Link></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {items.map(it => (
              <div key={it.product.id} className="flex items-center gap-6 border-b pb-6">
                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                  {it.product.image && <img src={it.product.image} alt={it.product.productName} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{it.product.productName}</div>
                  <div className="text-gray-500">₱{Number(it.product.productPrice || it.product.price || 0).toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateQuantity(it.product.id, Math.max(1, it.quantity - 1))}
                    className="px-3 py-2 border rounded"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>

                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={String(it.quantity)}
                    onChange={(e) => {
                      // allow only digits to avoid native number spinners while keeping numeric input
                      const digits = e.target.value.replace(/[^0-9]/g, '');
                      if (digits === '') {
                        // if cleared, fallback to 1
                        updateQuantity(it.product.id, 1);
                        return;
                      }
                      const v = Number(digits);
                      updateQuantity(it.product.id, Math.max(1, Math.floor(v)));
                    }}
                    className="w-20 text-center px-3 py-2 border rounded"
                    aria-label={`Quantity for ${it.product.productName}`}
                  />

                  <button
                    type="button"
                    onClick={() => updateQuantity(it.product.id, it.quantity + 1)}
                    className="px-3 py-2 border rounded"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => removeItem(it.product.id)}
                    className="text-primary ml-4"
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    {/* Trash icon */}
                    <svg aria-hidden="true" className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
            <div className="mt-3 grid grid-cols-2">
              <div>Subtotal</div>
              <div className="text-right">₱{Number(subtotal).toFixed(2)}</div>
            </div>
            <div className="mt-4">
              <button onClick={()=>nav('/checkout')} className="btn-primary w-full">Proceed to Checkout</button>
            </div>
            <div className="mt-3 text-sm text-gray-500"><button onClick={()=>clearCart()} className="text-primary">Clear cart</button></div>
          </aside>
        </div>
      )}
    </div>
  );
}
