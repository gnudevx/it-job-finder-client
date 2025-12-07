import axiosClient from "@/services/axiosClient.js";

export const loadPersonalInfo = async () => {
  const res = await axiosClient.get("/candidates/profile");
  return res?.data; // data.user
};

export const savePersonalInfo = async (data) => {
  const res = await axiosClient.put("/candidates/profile", data);
  return res?.data; // trả user
};
