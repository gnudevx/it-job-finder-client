import axiosClient from '@/services/axiosClient.js';

const API_URL = '/api/jobs';

export const getAllJobs = async (params = {}) => {
  const res = await axiosClient.get(API_URL, { params });
  return res;
};

export const getJobDetail = async (id) => {
  const res = await axiosClient.get(`${API_URL}/${id}`);
  return res;
};
