import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ecommerce_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    if (product.stockQuantity <= 0) return { success: false, message: 'Product is out of stock' };

    let status = { success: true, message: 'Added to cart!' };
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stockQuantity) {
          status = { success: false, message: `Max stock available is ${product.stockQuantity}` };
          return prev;
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      if (quantity > product.stockQuantity) {
        status = { success: false, message: `Max stock available is ${product.stockQuantity}` };
        return prev;
      }
      return [...prev, { ...product, quantity }];
    });
    return status;
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const validQty = Math.min(newQty, item.stockQuantity);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);