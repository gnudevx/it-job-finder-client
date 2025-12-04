import React, { useState } from "react";
import AdminTicketList from "./AdminTicketList.jsx";
import TicketDetailModal from "./TicketDetailModal";

export default function SupportTickets() {
    const [selectedTicket, setSelectedTicket] = useState(null);

    const handleViewTicket = (ticket) => {
        setSelectedTicket(ticket);
    };

    const handleCloseModal = () => {
        setSelectedTicket(null);
    };

    const handleReply = (ticketId, content) => {
        console.log("Reply to ticket", ticketId, content);
        // update dữ liệu backend hoặc state ở đây
    };

    const handleStatusChange = (ticketId, status) => {
        console.log("Change status", ticketId, status);
        // update dữ liệu backend hoặc state ở đây
    };

    return (
        <>
            <AdminTicketList onViewTicket={handleViewTicket} />
            {selectedTicket && (
                <TicketDetailModal
                    ticket={selectedTicket}
                    onClose={handleCloseModal}
                    onReply={handleReply}
                    onStatusChange={handleStatusChange}
                />
            )}
        </>
    );
}
