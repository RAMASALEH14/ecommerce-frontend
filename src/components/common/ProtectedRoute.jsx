import React from 'react';
import { Navigate, Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from './UIElements';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '50px', marginBottom: '15px' }}>🚫</div>
        <h2 style={{ color: 'var(--error-color)', marginBottom: '10px' }}>403 - Unauthorized Access</h2>
        <p style={{ color: 'var(--muted-text-color)', marginBottom: '20px' }}>
          You do not have permission to view the Admin Dashboard.
        </p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  return children;
}