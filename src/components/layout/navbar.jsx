import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header style={{
      background: 'var(--surface-color, #fff)',
      borderBottom: '1px solid var(--border-color, #e5e7eb)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        {/* Logo */}
        <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
          🛒 Batman Store
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', flex: '0 1 400px', margin: '0 20px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 14px',
              border: '1px solid var(--border-color)',
              borderRadius: '8px 0 0 8px',
              outline: 'none',
              fontSize: '14px'
            }}
          />
          <button type="submit" style={{
            padding: '8px 16px',
            background: 'var(--primary-color)',
            color: '#fff',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            fontWeight: '600'
          }}>
            🔍
          </button>
        </form>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" style={{ fontWeight: '500' }}>Home</Link>
          <Link to="/products" style={{ fontWeight: '500' }}>Products</Link>
          
          <Link to="/cart" style={{ position: 'relative', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
            🛒 Cart
            {cartCount > 0 && (
              <span style={{
                background: 'var(--secondary-color)',
                color: '#17202a',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '11px',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/profile" style={{ fontWeight: '500', color: 'var(--primary-color)' }}>
                👤 {user.name.split(' ')[0]}
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" style={{ padding: '6px 10px', background: 'var(--secondary-color)', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}>
                  Admin
                </Link>
              )}
              <button onClick={logout} style={{ background: 'transparent', border: '1px solid var(--error-color)', color: 'var(--error-color)', padding: '5px 10px', borderRadius: '6px', fontSize: '13px' }}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" style={{ padding: '6px 12px', border: '1px solid var(--primary-color)', borderRadius: '6px', color: 'var(--primary-color)', fontSize: '14px' }}>
                Login
              </Link>
              <Link to="/register" style={{ padding: '6px 12px', background: 'var(--primary-color)', borderRadius: '6px', color: '#fff', fontSize: '14px' }}>
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}