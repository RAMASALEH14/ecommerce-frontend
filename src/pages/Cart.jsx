import React from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { Button, EmptyState } from '../components/common/UIElements';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <EmptyState
          icon="🛒"
          title="Your Cart is Empty"
          description="Looks like you haven't added any products to your cart yet."
          actionText="Start Shopping"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '28px' }}>Shopping Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px', alignItems: 'start' }}>
        {/* Cart Items List */}
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                background: 'var(--surface-color)',
                padding: '16px',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--border-color)',
                marginBottom: '16px'
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{item.name}</h3>
                <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>${item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ width: '30px', height: '30px', background: '#f3f4f6', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                >
                  -
                </button>
                <span style={{ fontWeight: '600', width: '25px', textAlign: 'center' }}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ width: '30px', height: '30px', background: '#f3f4f6', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                >
                  +
                </button>
              </div>

              <p style={{ fontWeight: 'bold', width: '80px', textAlign: 'right' }}>
                ${item.price * item.quantity}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{ background: 'none', border: 'none', color: 'var(--error-color)', cursor: 'pointer', fontSize: '16px' }}
              >
                🗑️
              </button>
            </div>
          ))}

          <Button variant="outline" onClick={clearCart} style={{ color: 'var(--error-color)', borderColor: 'var(--error-color)' }}>
            Clear Cart
          </Button>
        </div>

        {/* Cart Summary */}
        <div style={{
          background: 'var(--surface-color)',
          padding: '24px',
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: 'var(--muted-text-color)' }}>
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', color: 'var(--muted-text-color)' }}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
            <span>Total</span>
            <span style={{ color: 'var(--primary-color)' }}>${cartTotal.toFixed(2)}</span>
          </div>

          <Link to="/checkout" style={{ display: 'block' }}>
            <Button style={{ width: '100%', padding: '12px' }}>Proceed to Checkout 🚀</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}