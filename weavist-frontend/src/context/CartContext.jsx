import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product, qty=1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if(existing) {
        return prev.map(i => i.product.id===product.id ? {...i, quantity: i.quantity + qty} : i);
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const updateQuantity = (productId, qty) => {
    setItems(prev => prev.map(i => i.product.id===productId ? {...i, quantity: qty} : i));
  };

  const removeItem = (productId) => setItems(prev => prev.filter(i => i.product.id !== productId));
  const clearCart = () => setItems([]);

  const subtotal = useMemo(()=> items.reduce((s,i) => s + (Number(i.product.productPrice || i.product.price || 0) * i.quantity), 0), [items]);

  return <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, subtotal }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext);
