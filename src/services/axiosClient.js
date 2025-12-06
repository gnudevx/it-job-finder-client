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
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Trả response.data thay vì response nguyên gốc
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axiosClient.get('/api/auth/refresh-token');
        // Giả sử backend trả accessToken mới trong res
        const { accessToken } = res;
        localStorage.setItem('authToken', accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem("authToken");
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
