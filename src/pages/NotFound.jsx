import React from 'react';
import { Link } from 'react-router';
import { Button } from '../components/common/UIElements';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div style={{ fontSize: '70px', marginBottom: '10px' }}>🔍</div>
      <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--muted-text-color)', marginBottom: '24px' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}