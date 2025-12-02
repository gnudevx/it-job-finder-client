import axios from "axios";

const API =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// LOGIN
export const login = async ({ email, password }) => {
  const res = await axios.post(`${API}/auth/login`, { email, password });
  return res.data;
};

// REFRESH TOKEN
export const refreshTokenRequest = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const res = await axios.post(`${API}/auth/refresh-token`, {
    refreshToken,
  });

  const data = res.data;

  if (data?.authToken) {
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    return data;
  }

  throw new Error("Refresh failed");
};

// LOGOUT
export const logoutRequest = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    if (refreshToken) {
      await axios.post(`${API}/auth/logout`, { refreshToken });
    }
  } catch (e) {
    console.error("Logout error:", e);
  }

  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
};
