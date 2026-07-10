const PRODUCTION_FRONTEND_ORIGIN =
  process.env.REACT_APP_FRONTEND_URL ||
  process.env.REACT_APP_CLIENT_URL ||
  'https://it-job-finder-client-five.vercel.app';
const PRODUCTION_BACKEND_ORIGIN =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_API_URL ||
  process.env.REACT_APP_BACKEND_URL ||
  'http://localhost:5000';

export function loginWithGoogle(callback) {
  const googleStartUrl = new URL('/api/auth/google/start', PRODUCTION_BACKEND_ORIGIN).toString();
  const popup = window.open(
    googleStartUrl,
    'google-login',
    'width=500,height=700'
  );

  if (!popup) {
    const { store } = require('@/redux/store');
    const { setNotification } = require('@/redux/slices/globalSlice');
    store.dispatch(setNotification({ message: 'Trình duyệt đang chặn popup. Hãy cho phép popup rồi thử lại.', type: 'error' }));
    return;
  }

  const messageHandler = (event) => {
    const allowedOrigins = [
      new URL(PRODUCTION_BACKEND_ORIGIN).origin,
      window.location.origin,
      PRODUCTION_FRONTEND_ORIGIN,
    ].filter(Boolean);

    if (!allowedOrigins.includes(event.origin)) {
      return;
    }

    if (event.data?.type !== 'google-auth-success') {
      return;
    }

    window.removeEventListener('message', messageHandler);
    if (!popup.closed) popup.close();
    callback(event.data.payload);
  };

  window.addEventListener('message', messageHandler);
}
