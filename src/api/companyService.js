import axiosClient from "../services/axiosClient";

const companyService = {
    create: (data) => axiosClient.post("/employer/account/settings/company-info", data),
    update: (id, data) => axiosClient.put(`/employer/account/settings/company-info/${id}`, data),
    getCompany: () => axiosClient.get("/employer/account/settings/company-info"),
    getMyCompany: () => axiosClient.get("/employer/account/settings/my-company-info"),
    selectCompany: (companyId) =>
        axiosClient.post("/employer/account/settings/select-company", { companyId }),
    getCompanyPublic: (employerId) =>
        axiosClient.get(`/company/by-employer/${employerId}`),
};

export default companyService;
