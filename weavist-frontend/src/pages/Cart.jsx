import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Cart() {
  const { items: cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const nav = useNavigate();

  // Track selected items
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    // Initialize selection state only for new items, don't reset existing selections
    const newSelection = { ...selectedItems };
    cartItems.forEach(item => {
      if (!(item.product.id in newSelection)) {
        newSelection[item.product.id] = true; // default: selected
      }
    });
    setSelectedItems(newSelection);
  }, [cartItems]);

  const toggleSelectAll = () => {
    const allSelected = Object.values(selectedItems).every(Boolean);
    const newSelection = {};
    cartItems.forEach(item => {
      newSelection[item.product.id] = !allSelected;
    });
    setSelectedItems(newSelection);
  };

  const toggleItem = (id) => {
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate total for selected items
  const selectedSubtotal = cartItems.reduce((acc, item) => {
    return selectedItems[item.product.id] ? acc + item.product.productPrice * item.quantity : acc;
  }, 0);

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  return (
    <div className="container py-8">
      {/* Back to Shop icon button */}
      <div className="mb-4">
        <button
          onClick={() => nav('/shop')}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Back to Shop"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty. <Link to="/shop" className="text-indigo-600">Shop now</Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(it => {
              const API_URL = 'http://127.0.0.1:8000';
              const imageUrl = it.product.image_url || (it.product.image
                ? (String(it.product.image).startsWith('http') ? it.product.image : `${API_URL}${it.product.image}`)
                : null);
              const itemTotal = it.product.productPrice * it.quantity;

              return (
                <div key={it.product.id} className="flex items-center gap-4 border-b pb-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedItems[it.product.id] ?? false}
                    onChange={() => toggleItem(it.product.id)}
                    className="w-4 h-4"
                  />

                  {/* Product image */}
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                    {imageUrl && <img src={imageUrl} alt={it.product.productName} className="w-full h-full object-cover" />}
                  </div>

                  {/* Product info */}
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{it.product.productName}</div>
                    <div className="text-gray-500">₱{Number(it.product.productPrice).toFixed(2)}</div>
                  </div>

                  {/* Quantity controls & total */}
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
                        const digits = e.target.value.replace(/[^0-9]/g, '');
                        updateQuantity(it.product.id, digits ? Math.max(1, Number(digits)) : 1);
                      }}
                      className="w-16 text-center px-3 py-2 border rounded"
                    />

                    <button
                      type="button"
                      onClick={() => updateQuantity(it.product.id, it.quantity + 1)}
                      className="px-3 py-2 border rounded"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                    <div className="w-20 text-right font-medium">
                      ₱{Number(itemTotal).toFixed(2)}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(it.product.id)}
                      className="text-primary ml-4"
                      aria-label="Remove item"
                      title="Remove item"
                    >
                      <svg aria-hidden="true" className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary / Checkout bar */}
          <div className="card p-4 mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cartItems.length > 0 && Object.values(selectedItems).every(Boolean)}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm font-medium">Select All</span>
              </label>
              <button onClick={clearCart} className="text-primary text-sm hover:underline">Clear All</button>
            </div>

            <div className="flex items-center gap-4">
              <div className="font-semibold">
                Total ({selectedCount} items): ₱{Number(selectedSubtotal).toFixed(2)}
              </div>
              <button
                onClick={() => nav('/checkout')}
                disabled={selectedCount === 0}
                className="btn-primary px-4 py-2 rounded disabled:opacity-50"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
