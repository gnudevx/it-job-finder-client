const PRODUCTION_FRONTEND_ORIGIN = 'https://it-job-finder-client-five.vercel.app';
const PRODUCTION_BACKEND_ORIGIN = 'https://it-job-finder-server.onrender.com';

export function loginWithGoogle(callback) {
  const isProductionClient = window.location.origin === PRODUCTION_FRONTEND_ORIGIN;

  if (isProductionClient) {
    const popup = window.open(
      `${PRODUCTION_BACKEND_ORIGIN}/api/auth/google/start`,
      'google-login',
      'width=500,height=700'
    );

    if (!popup) {
      alert('Trình duyệt đang chặn popup. Hãy cho phép popup rồi thử lại.');
      return;
    }

    const messageHandler = (event) => {
      if (event.origin !== PRODUCTION_FRONTEND_ORIGIN && event.origin !== PRODUCTION_BACKEND_ORIGIN) {
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
    return;
  }

  // Kiểm tra Google SDK đã load chưa
  if (!window.google || !window.google.accounts) {
    console.error('❌ Google SDK chưa được load!');
    alert('Google SDK chưa load! Hãy kiểm tra lại script Google Identity.');
    return;
  }

  const client = window.google.accounts.oauth2.initCodeClient({
    client_id: '1002795794314-ncnjv1en9k5ukte6artpbls9rfkqd5m6.apps.googleusercontent.com',
    scope: 'openid email profile',
    ux_mode: 'popup',
    callback: (response) => {
      console.log('Google response:', response);

      if (response.error) {
        console.error('Google login error:', response.error);
        alert('Google đăng nhập thất bại!');
        return;
      }

      if (!response.code) {
        console.error('Không nhận được code từ Google!');
        alert('Không nhận được mã đăng nhập từ Google!');
        return;
      }

      // Trả code về FE Login.jsx
      callback(response.code);
    },
  });

  // Bắt đầu popup đăng nhập
  client.requestCode();
}
