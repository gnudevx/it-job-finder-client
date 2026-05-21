import publicClient from '@/services/publicAxios.js';

const API_URL = '/api/jobs';

export const getAllJobs = async (params = {}) => {
  // Use public client so unauthenticated guests can fetch job listings
  return publicClient.get(API_URL, { params });
};

export const getJobDetail = async (id) => {
  // Use public client so guests can fetch job details without triggering auth flows
  return publicClient.get(`${API_URL}/${id}`);
};
