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
    failedQueue.forEach((p) => {
        if (error) p.reject(error);
        else p.resolve(token);
    });

    failedQueue = [];
};

api.interceptors.request.use(
    (config) => {
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("authToken")
                : null;

        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (res) => res,

    async (error) => {
        if (!error.response)
            return Promise.reject({
                message: "Không nhận được phản hồi từ server.",
                originalError: error
            });

        const originalRequest = error.config;
        const status = error.response.status;

        // ✔ Token hết hạn
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

                if (!newToken) throw new Error("Không lấy được token mới.");

                localStorage.setItem("authToken", newToken);
                api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);

                try {
                    await logoutRequest();
                } catch (e) {Error}

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
