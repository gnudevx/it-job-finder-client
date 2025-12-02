import client from "./client";

export const getUserInfoAPI = async () => {
  const res = await client.get("/user/personal-info");
  return res.data;
};