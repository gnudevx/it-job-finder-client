export function loginWithGoogle(callback) {
  // Kiểm tra Google SDK đã load chưa
  if (!window.google || !window.google.accounts) {
    console.error("❌ Google SDK chưa được load!");
    alert("Google SDK chưa load! Hãy kiểm tra lại script Google Identity.");
    return;
  }

  const client = window.google.accounts.oauth2.initCodeClient({
    client_id: "1002795794314-ncnjv1en9k5ukte6artpbls9rfkqd5m6.apps.googleusercontent.com",
    scope: "openid email profile",
    ux_mode: "popup",
    callback: (response) => {
      console.log("Google response:", response);

      if (response.error) {
        console.error("Google login error:", response.error);
        alert("Google đăng nhập thất bại!");
        return;
      }

      if (!response.code) {
        console.error("Không nhận được code từ Google!");
        alert("Không nhận được mã đăng nhập từ Google!");
        return;
      }

      // Trả code về FE Login.jsx
      callback(response.code);
    },
  });

  // Bắt đầu popup đăng nhập
  client.requestCode();
}
