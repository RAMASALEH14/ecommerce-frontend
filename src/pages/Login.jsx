import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button, Alert } from '../components/common/UIElements';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        navigate(res.user.role === 'admin' ? '/admin' : '/profile');
      } else {
        setError(res.message);
      }
    }, 600);
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div style={{ background: 'var(--surface-color)', padding: '40px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', width: '100%', maxWidth: '420px', boxShadow: 'var(--shadow-md)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px' }}>Welcome Back</h2>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', marginBottom: '20px', fontSize: '12px', color: 'var(--muted-text-color)' }}>
          <p><b>Customer Demo:</b> customer@store.com / password123</p>
          <p><b>Admin Demo:</b> admin@store.com / admin123</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '10px', top: '34px', background: 'none', border: 'none', fontSize: '12px', color: 'var(--muted-text-color)' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <Button type="submit" disabled={loading} style={{ width: '100%', padding: '12px' }}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--muted-text-color)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}