import React from 'react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary-color)', color: '#fff', padding: '40px 0 20px', marginTop: '60px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '30px' }}>
        <div>
          <h3 style={{ marginBottom: '15px', color: 'var(--secondary-color)' }}>🛒 Batman Store</h3>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>
            Your ultimate destination for high-end tech gear, computers, and smart accessories. Built with React & Vite.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '15px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#9ca3af' }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/login">Account Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '15px' }}>Contact Info</h4>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>📍 Amman, Jordan</p>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>📧 support@batmanstore.com</p>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>📞 +962 7 9000 0000</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', fontSize: '13px', color: '#9ca3af' }}>
        © 2026 Batman Store. All rights reserved. Mock Frontend Task.
      </div>
    </footer>
  );
}