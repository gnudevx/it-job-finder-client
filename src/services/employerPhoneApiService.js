// src/api/employerPhoneApi.js
import axiosClient from "./axiosClient";

const employerPhoneApiService = {
    verifyPhone: (data) => {
        return axiosClient.post("/employer/account/phone-verify", data);
    },
};

export default employerPhoneApiService;
