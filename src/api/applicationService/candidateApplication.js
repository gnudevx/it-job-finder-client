import axiosClient from '@/services/axiosClient';

const API_URL = '/candidates/applications';

export const applyJob = async ({ jobId, resumeId, note, token }) => {
  const res = await axiosClient.post(
    `${API_URL}/apply`,
    { jobId, resumeId, note },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res?.data ?? res;
};

export const getMyAppliedJobs = async (token) => {
  const res = await axiosClient.get(`${API_URL}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (Array.isArray(res)) return res;
  return res?.data ?? [];
};