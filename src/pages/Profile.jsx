import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { Button, Alert } from '../components/common/UIElements';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { orders } = useStore();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [success, setSuccess] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile({ name, phone });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '28px' }}>My Account</h1>

      {success && <Alert type="success" message="Profile updated successfully!" />}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'start' }}>
        {/* Profile Details Form */}
        <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Personal Information</h3>
          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Email</label>
              <input type="email" value={user?.email || ''} disabled style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: '#f3f4f6' }} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} required />
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </div>

        {/* Orders History */}
        <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>My Orders History</h3>
          {orders.length === 0 ? (
            <p style={{ color: 'var(--muted-text-color)' }}>No orders found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {orders.map((o) => (
                <div key={o.id} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '14px' }}>{o.id}</p>
                    <p style={{ fontSize: '12px', color: 'var(--muted-text-color)' }}>{o.date} • {o.itemsCount} items</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>${o.total}</p>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: o.status === 'Delivered' ? '#dcfce7' : '#fef3c7', color: o.status === 'Delivered' ? '#15803d' : '#d97706', fontWeight: '600' }}>
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}