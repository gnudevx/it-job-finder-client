import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearError, clearNotification } from '@/redux/slices/globalSlice.js';

const AUTO_DISMISS_MS = 4000;

export default function GlobalToast() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.global.error);

  const notification = useSelector((state) => state.global.notification);

  useEffect(() => {
    if (!error) return;

    const t = setTimeout(() => {
      dispatch(clearError());
    }, AUTO_DISMISS_MS);

    return () => clearTimeout(t);
  }, [error, dispatch]);

  useEffect(() => {
    if (!notification) return;

    const t = setTimeout(() => {
      dispatch(clearNotification());
    }, AUTO_DISMISS_MS);

    return () => clearTimeout(t);
  }, [notification, dispatch]);

  if (!error && !notification) return null;

  return (
    <div style={styles.container}>
      {error && (
        <div style={{ ...styles.toast, ...styles.error }}>
          <span>⚠️ {error}</span>

          <button style={styles.close} onClick={() => dispatch(clearError())}>
            ✕
          </button>
        </div>
      )}

      {notification && (
        <div
          style={{
            ...styles.toast,
            ...(notification.type === 'success' ? styles.success : styles.info),
          }}
        >
          <span>
            {notification.type === 'success' ? '✅' : 'ℹ️'} {notification.message}
          </span>

          <button style={styles.close} onClick={() => dispatch(clearNotification())}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  toast: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    minWidth: '280px',
    maxWidth: '420px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },

  error: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fca5a5',
    color: '#991b1b',
  },

  success: {
    backgroundColor: '#f0fdf4',
    border: '1px solid #86efac',
    color: '#166534',
  },

  info: {
    backgroundColor: '#eff6ff',
    border: '1px solid #93c5fd',
    color: '#1d4ed8',
  },

  close: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    color: 'inherit',
    opacity: 0.6,
  },
};
