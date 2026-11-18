import React from 'react';
import { Link } from 'react-router';

export function Button({ children, variant = 'primary', type = 'button', onClick, disabled, style, ...props }) {
  const styles = {
    primary: { background: 'var(--primary-color)', color: '#fff', border: 'none' },
    secondary: { background: 'var(--secondary-color)', color: '#17202a', border: 'none' },
    danger: { background: 'var(--error-color)', color: '#fff', border: 'none' },
    outline: { background: 'transparent', color: 'var(--primary-color)', border: '1px solid var(--primary-color)' }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 18px',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '14px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'var(--transition)',
        ...styles[variant],
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function Loader({ text = 'Loading...' }) {
  return (
    <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--primary-color)' }}>
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>⏳</div>
      <p style={{ fontWeight: '600' }}>{text}</p>
    </div>
  );
}

export function Alert({ type = 'info', message, onClose }) {
  if (!message) return null;
  const colors = {
    success: { bg: '#dcfce7', text: '#15803d', border: '#86efac' },
    error: { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' },
    warning: { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' },
    info: { bg: '#e0f2fe', text: '#0369a1', border: '#7dd3fc' }
  };
  const theme = colors[type] || colors.info;

  return (
    <div style={{
      background: theme.bg,
      color: theme.text,
      border: `1px solid ${theme.border}`,
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px'
    }}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: theme.text, fontWeight: 'bold' }}>
          ✖
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon = '📭', title, description, actionText, actionLink }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 20px',
      background: 'var(--surface-color)',
      borderRadius: 'var(--border-radius)',
      border: '1px solid var(--border-color)',
      margin: '20px 0'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{ marginBottom: '8px', color: 'var(--text-color)' }}>{title}</h3>
      <p style={{ color: 'var(--muted-text-color)', marginBottom: '20px', fontSize: '14px' }}>{description}</p>
      {actionText && actionLink && (
        <Link to={actionLink}>
          <Button>{actionText}</Button>
        </Link>
      )}
    </div>
  );
}