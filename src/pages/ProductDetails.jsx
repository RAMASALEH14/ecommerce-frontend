import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { Button, Alert } from '../components/common/UIElements';
import ProductCard from '../components/products/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useStore();
  const { addToCart } = useCart();

  const product = products.find((p) => String(p.id) === String(id));
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState(null);

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: 'var(--muted-text-color)', margin: '15px 0' }}>The product you are looking for does not exist.</p>
        <Link to="/products"><Button>Back to Products</Button></Link>
      </div>
    );
  }

  const isOutOfStock = product.stockQuantity === 0;

  const handleAddToCart = () => {
    const res = addToCart(product, quantity);
    if (res.success) {
      setAlert({ type: 'success', message: `Successfully added ${quantity} item(s) to cart!` });
    } else {
      setAlert({ type: 'error', message: res.message });
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '60px' }}>
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}
          />
        </div>
        <div>
          <span style={{ fontSize: '13px', color: 'var(--muted-text-color)', textTransform: 'uppercase' }}>{product.category}</span>
          <h1 style={{ fontSize: '30px', margin: '10px 0' }}>{product.name}</h1>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '16px' }}>${product.price}</p>
          <p style={{ color: 'var(--muted-text-color)', lineHeight: '1.8', marginBottom: '24px' }}>{product.description}</p>

          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: isOutOfStock ? 'var(--error-color)' : 'var(--success-color)' }}>
            {isOutOfStock ? '● Out of Stock' : `● In Stock (${product.stockQuantity} items available)`}
          </p>

          {!isOutOfStock && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '24px' }}>
              <label style={{ fontWeight: '600', fontSize: '14px' }}>Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stockQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockQuantity, Number(e.target.value))))}
                style={{ width: '70px', padding: '8px', textAlign: 'center', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
            </div>
          )}

          <Button onClick={handleAddToCart} disabled={isOutOfStock} style={{ padding: '12px 30px', fontSize: '16px' }}>
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart 🛒'}
          </Button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <h2 style={{ marginBottom: '20px', fontSize: '22px' }}>Related Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}