// Simple auth helper. Tùy app bạn có token lưu ở localStorage hay context, sửa cho phù hợp.
export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("token"); // hoặc 'accessToken' tùy project
    return !!token; // return true nếu có token
  } catch (err) {
    return false;
  }
};

// export helper để login/logout khi cần
export const saveToken = (token) => localStorage.setItem("token", token);
export const clearToken = () => localStorage.removeItem("token");