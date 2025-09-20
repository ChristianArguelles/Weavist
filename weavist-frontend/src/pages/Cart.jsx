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
                  <button onClick={()=>updateQuantity(it.product.id, Math.max(1, it.quantity-1))} className="px-3 py-2 border rounded">-</button>
                  <div className="px-4 py-2 border rounded">{it.quantity}</div>
                  <button onClick={()=>updateQuantity(it.product.id, it.quantity+1)} className="px-3 py-2 border rounded">+</button>
                  <button onClick={()=>removeItem(it.product.id)} className="text-red-600 ml-4" aria-label="Remove item" title="Remove item">
                    <svg aria-hidden="true" className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 7h12M9 7v10a2 2 0 002 2h2a2 2 0 002-2V7M10 11v6M14 11v6M9 7L9 5a1 1 0 011-1h4a1 1 0 011 1v2" />
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
            <div className="mt-3 text-sm text-gray-500"><button onClick={()=>clearCart()} className="text-red-600">Clear cart</button></div>
          </aside>
        </div>
      )}
    </div>
  );
}
