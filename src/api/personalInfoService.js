import axios from "axios";

const API = "http://localhost:5000";

export const loadPersonalInfo = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Token không tồn tại");

  const res = await axios.get(`${API}/api/candidates/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

export const savePersonalInfo = async (data) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Token không tồn tại");

  const res = await axios.put(`${API}/api/candidates/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};
