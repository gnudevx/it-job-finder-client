import axios from "@/services/axiosClient"; // tùy bạn đặt axios client ở đâu

export const getEmployerApplications = async (filters = {}) => {
  const params = {};

  if (filters.q) params.q = filters.q;
  if (filters.campaign) params.campaign = filters.campaign;
  if (filters.status) params.status = filters.status;
  if (filters.range) params.range = filters.range;
  if (filters.appliedAt) params.appliedAt = filters.appliedAt;
  if (filters.toDate) params.toDate = filters.toDate;

  const res = await axios.get("/employer/api/applications", { params });
  return res.data;
};

export const updateEmployerApplicationStatus = async (id, status) => {
  const res = await axios.patch(`/employer/api/applications/${id}/status`, {
    status,
  });
  return res.data;
};
