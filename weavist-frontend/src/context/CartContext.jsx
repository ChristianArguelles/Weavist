import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      const availableStock = (product.stock || 0) - currentQty;

      if (qty > availableStock) {
        alert('Cannot add more than available stock for ' + (product.productName || product.name));
        return prev;
      }

      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }

      return [...prev, { product, quantity: qty }];
    });
  };

  const removeItem = (productId) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    setItems(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + (Number(it.product.productPrice || it.product.price || 0) * it.quantity), 0),
    [items]
  );

  const getAvailableStock = (product) => {
    const inCart = items.find(i => i.product.id === product.id)?.quantity || 0;
    return (product.stock || 0) - inCart;
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal, getAvailableStock }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
