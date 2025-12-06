import axiosClient from "@/services/axiosClient";

const notificationApiService = {
    // admin gửi thông báo
    create: (payload) =>
        axiosClient.post("/admin/notification/employer", payload),

    // admin xem list
    adminList: (page = 1, limit = 10) =>
        axiosClient.get(`/admin/notification/employer?page=${page}&limit=${limit}`),

    // employer xem list
    employerList: (page = 1, limit = 5) =>
        axiosClient.get(`/employer/system-notification?page=${page}&limit=${limit}`),

    getNotificationEmployer: () =>
        axiosClient.get(`/employer/system-notification/notifications`),

    // employer xem chi tiết
    getById: (id) =>
        axiosClient.get(`/employer/system-notification/${id}`),

    // employer đánh dấu đã đọc
    markRead: (id) =>
        axiosClient.post(`/employer/system-notification/${id}/read`)

};

export default notificationApiService;
