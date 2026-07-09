import axiosClient from '@/services/axiosClient';

// LOGIN
export const login = ({ email, password }) =>
  axiosClient.post('/api/auth/login', { email, password });

// REGISTER
export const register = (payload) => axiosClient.post('/api/auth/register', payload);

// REFRESH TOKEN
export const refreshTokenRequest = () => axiosClient.post('/api/auth/refresh-token');

// LOGOUT
export const logoutRequest = () => axiosClient.post('/api/auth/logout');

// GOOGLE LOGIN
export const googleLogin = (code) => axiosClient.post('/api/auth/google', { code });

const authService = {
  login,
  register,
  refreshTokenRequest,
  logoutRequest,
  googleLogin,
};
export default authService;
