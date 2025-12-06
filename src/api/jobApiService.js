// src/api/jobApiService.js
import axiosClient from "@/services/axiosClient.js";

const jobApiService = {
    // Lấy tất cả job
    getAllJobs: () => axiosClient.get("/admin/manage/recruiment"),

    // Cập nhật trạng thái job
    updateJobStatus: (jobId, status) =>
        axiosClient.patch(`/admin/manage/jobs/${jobId}/status`, { status }),

    // Lấy chi tiết job
    getJobDetail: (jobId) => axiosClient.get(`/admin/manage/jobs/${jobId}`),
    createJob: (payload) => axiosClient.post("/employer/api/jobs/create", payload),
    updateJob: (jobId, payload) => axiosClient.put(`/employer/api/jobs/edit/${jobId}`, payload),
};

export default jobApiService;
