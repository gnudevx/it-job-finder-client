import axiosClient from '@/services/axiosClient';

const ticketService = {
  getAllTickets: async () => {
    return axiosClient.get('/admin/manage/SupportTickets');
  },

  getTicketById: async (ticketId) => {
    // Frontend chỉ cần get, không cần type
    return axiosClient.get(`/admin/manage/SupportTickets/${ticketId}`);
  },

  replyToTicket: async (ticketId, payload) => {
    // payload = { content, type }
    // Ensure type is included
    const fullPayload = {
      ...payload,
      type: payload.type || 'SUPPORT', // default to SUPPORT if not specified
    };
    return axiosClient.post(`/admin/manage/SupportTickets/${ticketId}/reply`, fullPayload);
  },

  changeStatus: async (ticketId, payload) => {
    // payload = { status, type }
    // Ensure type is included
    const fullPayload = {
      ...payload,
      type: payload.type || 'SUPPORT', // default to SUPPORT if not specified
    };
    return axiosClient.patch(`/admin/manage/SupportTickets/${ticketId}/status`, fullPayload);
  },
};

export default ticketService;
