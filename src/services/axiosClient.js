// src/services/axiosClient.js
import axios from 'axios';

// Khởi tạo axios instance
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ⚠️ Rất quan trọng khi dùng cookie
});

// Trả response.data thay vì response nguyên gốc
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');

    // Nếu lỗi là 401 (unauthorized) và chưa thử refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;
      try {
        // Gọi API refresh token (nó tự lấy từ cookie HttpOnly)
        await axiosClient.get('/api/auth/refresh-token');

        // Retry lại request gốc sau khi đã refresh thành công
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Nếu refresh cũng fail → logout
        console.error('Refresh token failed:', refreshError);
        window.location.href = '/login';
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("authToken");
        return Promise.reject(refreshError);
      }
    }

    // Nếu lỗi khác hoặc đã retry rồi → reject như bình thường
    return Promise.reject(error);
  }
);

export default axiosClient;
