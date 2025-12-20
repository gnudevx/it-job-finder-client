import axiosClient from "../services/axiosClient";

export const getAuthLogs = (page = 1, limit = 5) => {
    return axiosClient.get(
        `/api/auth/logs?page=${page}&limit=${limit}`
    );

};
export const accountActivityService = {
    getAccountSettingActivities: () =>
        axiosClient.get("/employer/account/activities/account-setting"),
};