// src/api/employerPhoneApi.js
import axiosClient from "@/services/axiosClient.js";

const employerPhoneApiService = {
    verifyPhone: (data) => {
        return axiosClient.post("/employer/account/phone-verify", data);
    },
};

export default employerPhoneApiService;
