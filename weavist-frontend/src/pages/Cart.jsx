import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart(){
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const nav = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div>Your cart is empty. <Link to="/shop" className="text-indigo-600">Shop now</Link></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map(it=>(
              <div className="bg-white shadow rounded p-4 flex items-center gap-4" key={it.product.id}>
                <div className="w-24 h-24 bg-gray-100 overflow-hidden">
                  {it.product.image && <img src={it.product.image} alt={it.product.productName} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{it.product.productName}</div>
                  <div className="text-gray-500">₱{Number(it.product.productPrice || it.product.price || 0).toFixed(2)}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={()=>updateQuantity(it.product.id, Math.max(1, it.quantity-1))} className="px-2 py-1 border rounded">-</button>
                    <span>{it.quantity}</span>
                    <button onClick={()=>updateQuantity(it.product.id, it.quantity+1)} className="px-2 py-1 border rounded">+</button>
                    <button onClick={()=>removeItem(it.product.id)} className="text-red-600 ml-4">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded shadow p-4">
            <div className="font-semibold">Order Summary</div>
            <div className="mt-3">Subtotal: <span className="font-bold">₱{Number(subtotal).toFixed(2)}</span></div>
            <div className="mt-4">
              <button onClick={()=>nav('/checkout')} className="btn-primary w-full">Proceed to Checkout</button>
            </div>
            <div className="mt-3 text-sm text-gray-500"><button onClick={()=>clearCart()} className="text-red-600">Clear cart</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
