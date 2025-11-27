import api from "./axiosInstance.js";

const unwrapData = (res) => res.data;

const handleError = (err) => {
  // nếu là axios error
  if (err.response) {
    // server trả lỗi
    const data = err.response.data;
    const message = data?.message || data?.error || "Server error";
    const status = err.response.status;
    return Promise.reject({ message, status, data });
  }
  // network hoặc khác
  return Promise.reject({ message: err.message || "Unknown error" });
};

export default {
  get: (url, config) => api.get(url, config).then(unwrapData).catch(handleError),
  post: (url, body, config) => api.post(url, body, config).then(unwrapData).catch(handleError),
  put: (url, body, config) => api.put(url, body, config).then(unwrapData).catch(handleError),
  delete: (url, config) => api.delete(url, config).then(unwrapData).catch(handleError),
  raw: api, // expose axios instance if needed
};