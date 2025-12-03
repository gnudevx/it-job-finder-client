import React, { useState } from "react";
import { SupportTicketStatus } from "./types";
import { MessageSquare, Check, Reply } from "lucide-react";
import styles from "./SupportTickets.module.scss";

const mockTickets = [
    { id: "1", employerName: "Tech Corp", subject: "Lỗi không đăng được tin", message: "Tôi bị báo lỗi limit dù chưa hết lượt.", date: "2023-10-25", status: SupportTicketStatus.OPEN },
    { id: "2", employerName: "Design Studio", subject: "Hỏi về gói VIP", message: "Bên mình có gói đăng tin nổi bật không?", date: "2023-10-24", status: SupportTicketStatus.RESOLVED },
];

export default function SupportTickets() {
    const [tickets, setTickets] = useState(mockTickets);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyText, setReplyText] = useState("");

    const handleResolve = (id) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status: SupportTicketStatus.RESOLVED } : t));
        if (selectedTicket?.id === id) setSelectedTicket(prev => prev ? { ...prev, status: SupportTicketStatus.RESOLVED } : null);
    };

    const handleReply = () => {
        if (!selectedTicket) return;
        alert(`Đã gửi phản hồi tới ${selectedTicket.employerName}: ${replyText}`);
        handleResolve(selectedTicket.id);
        setReplyText("");
        setSelectedTicket(null);
    };

    return (
        <div className={styles.container}>
            {/* Ticket List */}
            <div className={styles.list}>
                <div className={styles.listHeader}><h2>Yêu cầu hỗ trợ</h2></div>
                <div className={styles.listBody}>
                    {tickets.map(ticket => (
                        <div
                            key={ticket.id}
                            onClick={() => setSelectedTicket(ticket)}
                            className={`${styles.ticket} ${selectedTicket?.id === ticket.id ? styles.selected : ""}`}
                        >
                            <div className={styles.ticketHeader}>
                                <span className={ticket.status === SupportTicketStatus.OPEN ? styles.open : styles.resolved}>{ticket.employerName}</span>
                                <span className={`${styles.statusBadge} ${ticket.status === SupportTicketStatus.OPEN ? styles.openBadge : styles.resolvedBadge}`}>
                                    {ticket.status}
                                </span>
                            </div>
                            <p className={styles.subject}>{ticket.subject}</p>
                            <p className={styles.date}>{ticket.date}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ticket Detail */}
            <div className={styles.detail}>
                {selectedTicket ? (
                    <>
                        <div className={styles.detailHeader}>
                            <div>
                                <h2>{selectedTicket.subject}</h2>
                                <p>Từ: {selectedTicket.employerName}</p>
                            </div>
                            {selectedTicket.status === SupportTicketStatus.OPEN && (
                                <button className={styles.resolveBtn} onClick={() => handleResolve(selectedTicket.id)}>
                                    <Check size={16} /> Đánh dấu đã xử lý
                                </button>
                            )}
                        </div>

                        <div className={styles.detailBody}>
                            <div className={styles.messageBox}>
                                {selectedTicket.message}
                            </div>
                        </div>

                        {selectedTicket.status === SupportTicketStatus.OPEN ? (
                            <div className={styles.replyBox}>
                                <input
                                    type="text"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Nhập nội dung phản hồi..."
                                    className={styles.input}
                                />
                                <button
                                    onClick={handleReply}
                                    disabled={!replyText.trim()}
                                    className={styles.btnReply}
                                >
                                    <Reply size={18} /> Gửi
                                </button>
                            </div>
                        ) : (
                            <div className={styles.resolvedNotice}>
                                Yêu cầu này đã được xử lý.
                            </div>
                        )}
                    </>
                ) : (
                    <div className={styles.emptyDetail}>
                        <MessageSquare size={48} />
                        <p>Chọn một yêu cầu để xem chi tiết</p>
                    </div>
                )}
            </div>
        </div>
    );
}
