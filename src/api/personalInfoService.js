import client from "./client";

export const loadPersonalInfo = async () => {
  const res = await client.get("/candidates/profile");
  return res?.data; // data.user
};

export const savePersonalInfo = async (data) => {
  const res = await client.put("/candidates/profile", data);
  return res?.data; // trả user
};
