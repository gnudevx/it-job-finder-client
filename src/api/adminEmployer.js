import axiosClient from "@/services/axiosClient.js";

const employerService = {
    getAllEmployers: async () => {
        const res = await axiosClient.get("/admin/manage/getAllEmployersWithJobLimit");
        return res;
    },

    getEmployerById: async (id) => {
        const res = await axiosClient.get(`/admin/manage/employers/${id}`);
        return res;
    },
    updateEmployerStatus: async (id, data) => {
        const res = await axiosClient.patch(`/admin/manage/employers/${id}/status`, data);
        return res;
    },
    adminChangePassword: async (id, data) => {
        const res = await axiosClient.patch(`/admin/manage/employers/${id}/change-password`, data);
        return res;
    }

};

export default employerService;
