import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts, categories as initialCategories, orders as initialOrders } from '../data/mockData';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ecommerce_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories, setCategories] = useState(initialCategories);

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('ecommerce_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem('ecommerce_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ecommerce_orders', JSON.stringify(orders));
  }, [orders]);

  const addProduct = (product) => {
    const newProd = { ...product, id: Date.now(), isActive: true };
    setProducts((prev) => [newProd, ...prev]);
  };

  const updateProduct = (id, updated) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const toggleProductStatus = (id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)));
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      ...orderData
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  return (
    <StoreContext.Provider value={{ products, categories, orders, addProduct, updateProduct, toggleProductStatus, placeOrder, updateOrderStatus }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}