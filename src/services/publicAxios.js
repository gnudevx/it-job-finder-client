import axios from 'axios';

// Public axios instance used for endpoints that should be accessible by guests
const publicClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // Do not send credentials by default for public requests
  withCredentials: false,
});

// Return response.data for compatibility with other axios instances
publicClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default publicClient;
