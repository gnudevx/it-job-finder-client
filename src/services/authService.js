import axiosClient from '../api/axiosClient';

const authService = {
  login: (loginSchema) => axiosClient.post('/api/auth/login', loginSchema),
  refreshToken: () => axiosClient.get('/api/auth/refresh-token'),
  logout: () => axiosClient.post('/api/auth/logout'),
};

export default authService;
