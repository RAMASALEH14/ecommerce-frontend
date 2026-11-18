import React, { useState } from 'react';
import { Link } from 'react-router';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [feedback, setFeedback] = useState('');
  const isOutOfStock = product.stockQuantity === 0;

  const handleAdd = () => {
    const res = addToCart(product, 1);
    setFeedback(res.message);
    setTimeout(() => setFeedback(''), 2000);
  };

  return (
    <div style={{
      background: 'var(--surface-color)',
      borderRadius: 'var(--border-radius)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '190px', objectFit: 'cover' }}
        />
      </Link>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span style={{ fontSize: '12px', color: 'var(--muted-text-color)' }}>{product.category}</span>
        <Link to={`/products/${product.id}`}>
          <h3 style={{ margin: '6px 0', fontSize: '16px', color: 'var(--text-color)' }}>{product.name}</h3>
        </Link>
        <p style={{ fontWeight: 'bold', color: 'var(--primary-color)', fontSize: '18px', margin: '6px 0' }}>
          ${product.price}
        </p>
        <p style={{ fontSize: '13px', color: isOutOfStock ? 'var(--error-color)' : 'var(--success-color)', marginBottom: '12px' }}>
          {isOutOfStock ? '● Out of Stock' : `● In Stock (${product.stockQuantity})`}
        </p>

        {feedback && (
          <p style={{ fontSize: '12px', color: 'var(--primary-color)', background: '#f0f9ff', padding: '4px 8px', borderRadius: '4px', marginBottom: '8px' }}>
            {feedback}
          </p>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            style={{
              flex: 1,
              padding: '9px',
              background: isOutOfStock ? '#d1d5db' : 'var(--primary-color)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isOutOfStock ? 'not-allowed' : 'pointer'
            }}
          >
            {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
          </button>
          <Link
            to={`/products/${product.id}`}
            style={{
              padding: '9px 12px',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              fontSize: '13px',
              color: 'var(--text-color)'
            }}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}