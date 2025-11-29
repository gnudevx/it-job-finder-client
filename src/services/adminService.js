import axiosClient from "./axiosClient";

const adminService = {
  AllCandidates: (token) =>
    axiosClient.get('/admin/managing/candidates', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true, 
    }),
  AllEmployers: (token) =>
    axiosClient.get('/admin/managing/employers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }),
};

export default adminService;
