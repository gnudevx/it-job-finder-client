// src/api/jobApiService.js

import axiosClient from "@/services/axiosClient.js";

const jobApiService = {
    getPendingLicenses: () => axiosClient.get("/admin/business-license/pending"),
    getHistory: () => axiosClient.get("/admin/business-license/history"),

    updateLicenseStatus: (employerId, status) =>
        axiosClient.patch(`/admin/business-license/review/${employerId}`, { status }),
};

export default jobApiService;
