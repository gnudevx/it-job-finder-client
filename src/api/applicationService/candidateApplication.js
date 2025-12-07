import axiosClient from "../../services/axiosClient";

const API_URL = "http://localhost:5000/candidates/applications";

export const applyJob = async ({ jobId, resumeId, coverLetter, token }) => {
  const res = await axiosClient.post(
    `${API_URL}/apply`, // dùng backticks và ${} để interpolate
    { jobId, resumeId, coverLetter },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const getMyAppliedJobs = async (token) => {
  const res = await axiosClient.get(`${API_URL}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data; // trả về JSON trực tiếp
};