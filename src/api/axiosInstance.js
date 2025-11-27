import axios from "axios";
import { refreshTokenRequest, logoutRequest } from "./authService";

const api = axios.create({
  baseURL: "/api",
  withCredentials: false,
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject({
        message: "Network error or no response from server",
        originalError: error,
      });
    }

    const status = error.response.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResp = await refreshTokenRequest();
        const newToken = refreshResp?.authToken;
        if (!newToken) throw new Error("Refresh token failed");

        localStorage.setItem("authToken", newToken);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);

      } catch (refreshErr) {
        processQueue(refreshErr, null);

        // logout và clear token
        try {
          await logoutRequest();
        } catch (_) {
          // intentionally ignored
        }

        return Promise.reject(refreshErr);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
