import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/UIElements';

export default function AdminDashboard() {
  const { products, orders, addProduct, toggleProductStatus, updateOrderStatus } = useStore();
  const { usersCount } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  const [newProd, setNewProd] = useState({ name: '', price: '', category: 'Audio', stockQuantity: 10, description: '', image: '' });
  const [successMsg, setSuccessMsg] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct({
      ...newProd,
      price: Number(newProd.price),
      stockQuantity: Number(newProd.stockQuantity),
      image: newProd.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
    });
    setSuccessMsg('Product added successfully!');
    setNewProd({ name: '', price: '', category: 'Audio', stockQuantity: 10, description: '', image: '' });
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '28px' }}>Admin Dashboard 🛠️</h1>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--muted-text-color)', fontSize: '13px' }}>Total Products</p>
          <h3 style={{ fontSize: '24px', color: 'var(--primary-color)' }}>{products.length}</h3>
        </div>
        <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--muted-text-color)', fontSize: '13px' }}>Total Orders</p>
          <h3 style={{ fontSize: '24px', color: 'var(--primary-color)' }}>{orders.length}</h3>
        </div>
        <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--muted-text-color)', fontSize: '13px' }}>Total Sales</p>
          <h3 style={{ fontSize: '24px', color: 'var(--success-color)' }}>${totalSales}</h3>
        </div>
        <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--muted-text-color)', fontSize: '13px' }}>Users Registered</p>
          <h3 style={{ fontSize: '24px', color: 'var(--primary-color)' }}>{usersCount}</h3>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('products')} style={{ padding: '10px 20px', background: activeTab === 'products' ? 'var(--primary-color)' : 'var(--surface-color)', color: activeTab === 'products' ? '#fff' : 'var(--text-color)', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: '600' }}>
          Manage Products
        </button>
        <button onClick={() => setActiveTab('orders')} style={{ padding: '10px 20px', background: activeTab === 'orders' ? 'var(--primary-color)' : 'var(--surface-color)', color: activeTab === 'orders' ? '#fff' : 'var(--text-color)', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: '600' }}>
          Manage Orders
        </button>
        <button onClick={() => setActiveTab('add')} style={{ padding: '10px 20px', background: activeTab === 'add' ? 'var(--primary-color)' : 'var(--surface-color)', color: activeTab === 'add' ? '#fff' : 'var(--text-color)', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: '600' }}>
          + Add Product
        </button>
      </div>

      {/* Tab 1: Products */}
      {activeTab === 'products' && (
        <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '16px' }}>Store Products</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {products.map((p) => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={p.image} alt={p.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div>
                    <h4 style={{ fontSize: '15px' }}>{p.name}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--muted-text-color)' }}>${p.price} • Stock: {p.stockQuantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleProductStatus(p.id)}
                  style={{ padding: '6px 12px', background: p.isActive ? '#fee2e2' : '#dcfce7', color: p.isActive ? '#b91c1c' : '#15803d', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}
                >
                  {p.isActive ? 'Disable' : 'Enable'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Orders */}
      {activeTab === 'orders' && (
        <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '16px' }}>Customer Orders</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {orders.map((o) => (
              <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <div>
                  <p style={{ fontWeight: 'bold' }}>{o.id} - {o.customerName}</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted-text-color)' }}>{o.date} • Total: ${o.total}</p>
                </div>
                <select
                  value={o.status}
                  onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                  style={{ padding: '6px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '13px' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Add Product Form */}
      {activeTab === 'add' && (
        <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', maxWidth: '600px' }}>
          <h3 style={{ marginBottom: '16px' }}>Add New Product</h3>
          {successMsg && <p style={{ color: 'var(--success-color)', marginBottom: '12px', fontWeight: 'bold' }}>{successMsg}</p>}
          <form onSubmit={handleAddProduct}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Product Name</label>
              <input type="text" value={newProd.name} onChange={(e) => setNewProd({ ...newProd, name: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Price ($)</label>
                <input type="number" value={newProd.price} onChange={(e) => setNewProd({ ...newProd, price: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Stock Quantity</label>
                <input type="number" value={newProd.stockQuantity} onChange={(e) => setNewProd({ ...newProd, stockQuantity: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Category</label>
              <select value={newProd.category} onChange={(e) => setNewProd({ ...newProd, category: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <option value="Audio">Audio</option>
                <option value="Laptops & PCs">Laptops & PCs</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Accessories">Accessories</option>
                <option value="Wearables">Wearables</option>
              </select>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Image URL</label>
              <input type="text" value={newProd.image} onChange={(e) => setNewProd({ ...newProd, image: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Description</label>
              <textarea value={newProd.description} onChange={(e) => setNewProd({ ...newProd, description: e.target.value })} rows="3" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
            </div>
            <Button type="submit">Add Product</Button>
          </form>
        </div>
      )}
    </div>
  );
}