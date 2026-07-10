import axiosClient from '@/services/axiosClient.js';

export const changePasswordAPI = async (payload) => {
  const res = await axiosClient.put('/api/user/change-password', payload);
  return res?.data || res;
};
