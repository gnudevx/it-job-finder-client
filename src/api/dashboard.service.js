import api from "@/services/axiosClient"; // axios instance

export const dashboardService = {
  getSummary() {
    return api.get("/admin/dashboard/summary");
  },

  getJobStats() {
    return api.get("/admin/dashboard/jobs-stats");
  },

  getUserGrowth() {
    return api.get("/admin/dashboard/users-growth");
  },

  getEmployerStats() {
    return api.get("/admin/dashboard/employers-stats");
  },
};
