// Simple auth helper
export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('authToken'); // hoặc 'accessToken' tùy project
    return !!token; // return true nếu có token
  } catch (err) {
    return false;
  }
};

// export helper để login/logout khi cần
export const saveToken = (token) => localStorage.setItem('authToken', token);
export const clearToken = () => localStorage.removeItem('authToken');
