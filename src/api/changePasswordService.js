import client from "./client";

export const changePasswordAPI = async (payload) => {
  const res = await client.put("/user/change-password", payload);
  return res?.data || res;
};