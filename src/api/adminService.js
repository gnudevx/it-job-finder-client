import axiosClient from "../services/axiosClient";

const adminService = {
  AllCandidates: () => axiosClient.get('/admin/managing/candidates'),

  GetCandidate: (id) => axiosClient.get(`/admin/managing/candidates/${id}`),

  // Create candidate
  CreateCandidate: (data) => axiosClient.post("/admin/managing/candidates", data),

  // Update candidate
  UpdateCandidate: (id, data) => axiosClient.put(`/admin/managing/candidates/${id}`, data),

  // Delete candidate
  DeleteCandidate: (id) => axiosClient.delete(`/admin/managing/candidates/${id}`),

  AllEmployers: (token) =>
    axiosClient.get('/admin/managing/employers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }),
};

export default adminService;
