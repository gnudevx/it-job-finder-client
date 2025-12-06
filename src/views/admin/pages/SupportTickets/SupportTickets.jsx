import React, { useState, useEffect } from "react";
import AdminTicketList from "./AdminTicketList.jsx";
import TicketDetailModal from "./TicketDetailModal";
import ticketService from "@/api/ticketService";

export default function SupportTickets() {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // ⭐ Load danh sách ticket
    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        const res = await ticketService.getAllTickets();
        setTickets(
            (res.data || []).map(t => ({
                ...t,
                _id: t._id || t.id, // fallback
                createdAt: new Date(t.createdAt),
                replies: (t.replies || []).map(r => ({
                    ...r,
                    id: r.id || crypto.randomUUID(),
                    timestamp: r.timestamp ? new Date(r.timestamp) : new Date()
                }))
            }))
        );
    };

    const handleViewTicket = async (ticket) => {
        try {
            const res = await ticketService.getTicketById(ticket._id || ticket.id);

            // convert nếu cần
            const t = res.data;
            setSelectedTicket({
                ...t,
                _id: t._id || t.id,
                createdAt: new Date(t.createdAt),
                replies: (t.replies || []).map(r => ({
                    ...r,
                    id: r.id || crypto.randomUUID(),
                    timestamp: r.timestamp ? new Date(r.timestamp) : new Date()
                }))
            });
        } catch (err) {
            console.error("Load ticket fail", err);
            // fallback: vẫn mở ticket cũ
            setSelectedTicket({
                ...ticket,
                _id: ticket._id || ticket.id,
                replies: ticket.replies || []
            });
        }
    };

    const handleReply = async (ticketId, content) => {
        try {
            const res = await ticketService.replyToTicket(ticketId, { content });
            console.log(res);
            // Sau khi reply xong → cập nhật lại ticket đang xem
            setSelectedTicket((prev) => ({
                ...prev,
                replies: [
                    ...prev.replies,
                    {
                        id: res.replyId,
                        sender: "ADMIN",
                        content,
                        timestamp: new Date()
                    }
                ],
            }));

        } catch (err) {
            console.error("Reply fail:", err);
        }
    };

    const handleStatusChange = async (ticketId, newStatus) => {
        try {
            await ticketService.changeStatus(ticketId, { status: newStatus });

            setSelectedTicket((prev) => ({
                ...prev,
                status: newStatus
            }));
            setTickets(prevTickets =>
                prevTickets.map(t =>
                    t._id === ticketId ? { ...t, status: newStatus } : t
                )
            );
        } catch (err) {
            console.error("Update status fail:", err);
        }
    };

    const handleCloseModal = () => setSelectedTicket(null);

    return (
        <>
            <AdminTicketList tickets={tickets} onViewTicket={handleViewTicket} />

            {selectedTicket && (
                <TicketDetailModal
                    ticket={selectedTicket}
                    currentUserRole="ADMIN"
                    onClose={handleCloseModal}
                    onReply={handleReply}
                    onStatusChange={handleStatusChange}
                />
            )}
        </>
    );
}
