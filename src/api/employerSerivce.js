import axiosClient from "@/services/axiosClient.js";

export default {
    update: (data) => axiosClient.put("/employer/account/settings/personal", data),
    getMe: () => axiosClient.get("/employer/account/settings/personal"),
    getEmployerProgressService: () => axiosClient.get("/employer/account/settings/personal/progress"),
};
