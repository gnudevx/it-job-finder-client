import axiosClient from "@/services/axiosClient";

const ticketService = {
    getAllTickets: async () => {
        return axiosClient.get("/admin/manage/SupportTickets");
    },

    replyToTicket: async (ticketId, payload) => {
        // payload = { content, type }
        return axiosClient.post(`/admin/manage/SupportTickets/${ticketId}/reply`, payload);
    },

    changeStatus: async (ticketId, payload) => {
        // payload = { status, type }
        return axiosClient.patch(`/admin/manage/SupportTickets/${ticketId}/status`, payload);
    }
};

export default ticketService;
