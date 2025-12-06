import axiosClient from "@/services/axiosClient";

const supportService = {
    createSupport: async (formData) => {
        return axiosClient.post("/employer/support-box/suggest", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
    createFeedback: async (formData) => {
        return axiosClient.post("/employer/support-box/feedback", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
};

export default supportService;
