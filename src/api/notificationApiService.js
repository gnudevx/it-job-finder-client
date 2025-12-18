import axiosClient from "@/services/axiosClient";

const notificationApiService = {
    // admin gửi thông báo
    create: (payload) =>
        axiosClient.post(`/admin/notification`, payload),

    adminList: (role, page = 1, limit = 10) =>
        axiosClient.get(
            `/admin/notification?page=${page}&limit=${limit}&role=${role}`
        ),

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
        axiosClient.post(`/employer/system-notification/${id}/read`),

    // candidate xem list
    candidateList: (page = 1, limit = 5) =>
        axiosClient.get(`/candidate/system-notification?page=${page}&limit=${limit}`),

    getNotificationCandidate: () =>
        axiosClient.get(`/candidate/system-notification/notifications`),
    // candidate xem chi tiết
    candidateGetById: (id) =>
        axiosClient.get(`/candidate/system-notification/${id}`),

    // candidate đánh dấu đã đọc
    candidateMarkRead: (id) =>
        axiosClient.post(`/candidate/system-notification/${id}/read`)

};

export default notificationApiService;
