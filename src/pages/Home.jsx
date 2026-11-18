import React from 'react';
import { Link } from 'react-router';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/products/ProductCard';
import { Button } from '../components/common/UIElements';

export default function Home() {
  const { products, categories } = useStore();
  const featuredProducts = products.filter((p) => p.featured || p.id <= 4);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-color), #0f2338)',
        color: '#fff',
        padding: '80px 20px',
        textAlign: 'center',
        borderRadius: '0 0 20px 20px',
        marginBottom: '40px'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '38px', marginBottom: '16px' }}>Next-Gen Tech & Gadgets Store</h1>
          <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '24px' }}>
            Discover top-quality headphones, high-performance laptops, and smart accessories with best prices.
          </p>
          <Link to="/products">
            <Button variant="secondary" style={{ padding: '12px 28px', fontSize: '16px' }}>
              Shop All Products 🚀
            </Button>
          </Link>
        </div>
      </section>

      <div className="container">
        {/* Categories Section */}
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Browse Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                style={{
                  background: 'var(--surface-color)',
                  padding: '20px',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '16px', color: 'var(--text-color)' }}>{cat.name}</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted-text-color)', marginTop: '4px' }}>{cat.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px' }}>Featured Products</h2>
            <Link to="/products" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>View All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}