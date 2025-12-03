// types.js
export const SupportTicketStatus = {
    OPEN: "Open",
    RESOLVED: "Resolved",
};

/** Kiểu dữ liệu ticket */
export const SupportTicket = {
    id: "",
    employerName: "",
    subject: "",
    message: "",
    date: "",
    status: SupportTicketStatus.OPEN,
};