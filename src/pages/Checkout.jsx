import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Button, Alert } from '../components/common/UIElements';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { placeOrder } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user ? user.name : '',
    phone: user ? user.phone : '',
    address: '',
    city: 'Amman',
    paymentMethod: 'Cash on Delivery'
  });

  const [error, setError] = useState('');
  const [successOrder, setSuccessOrder] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      setError('Please fill in all required shipping fields.');
      return;
    }
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    const newOrder = placeOrder({
      customerName: form.name,
      total: cartTotal,
      itemsCount: cart.reduce((sum, i) => sum + i.quantity, 0),
      address: `${form.address}, ${form.city}`,
      paymentMethod: form.paymentMethod
    });

    setSuccessOrder(newOrder);
    clearCart();
  };

  if (successOrder) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '60px', marginBottom: '15px' }}>🎉</div>
        <h2 style={{ color: 'var(--success-color)', marginBottom: '10px' }}>Order Placed Successfully!</h2>
        <p style={{ color: 'var(--muted-text-color)', marginBottom: '20px' }}>
          Your order ID is <b>{successOrder.id}</b>. We will contact you soon for delivery.
        </p>
        <Button onClick={() => navigate('/profile')}>View My Orders</Button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '28px' }}>Checkout</h1>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <form onSubmit={handleSubmit} style={{ background: 'var(--surface-color)', padding: '30px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Shipping Information</h3>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Phone Number</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Address</label>
          <input
            type="text"
            placeholder="Street, Building, Apartment"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
            required
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>City</label>
          <select
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
          >
            <option value="Amman">Amman</option>
            <option value="Zarqa">Zarqa</option>
            <option value="Irbid">Irbid</option>
            <option value="Aqaba">Aqaba</option>
          </select>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Total to Pay: <span style={{ color: 'var(--primary-color)' }}>${cartTotal.toFixed(2)}</span></h3>
        </div>

        <Button type="submit" style={{ width: '100%', padding: '12px' }}>Confirm Order</Button>
      </form>
    </div>
  );
}