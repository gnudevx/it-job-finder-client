import axiosClient from "./axiosClient";

const accountService = {
    changePassword: (data) =>
        axiosClient.put("/employer/account/settings/password", data),
};

export default accountService;
