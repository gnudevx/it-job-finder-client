import React, { useState, useRef, useEffect } from "react";
import { X, Send, User, ShieldCheck, Paperclip } from "lucide-react";
import styles from "./TicketDetailModal.module.scss";

const TicketStatus = {
    PENDING: "PENDING",
    REVIEWING: "REVIEWING",
    RESOLVED: "RESOLVED",
};
import PropTypes from "prop-types";
export default function TicketDetailModal({
    ticket,
    currentUserRole = "ADMIN", // 'ADMIN' hoặc 'USER'
    onClose,
    onReply,
    onStatusChange,
}) {
    const [replyContent, setReplyContent] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [ticket?.replies]);

    if (!ticket) return null;

    const handleSendReply = () => {
        console.log("SEND REPLY CLICKED, ticket =", ticket);
        if (!replyContent.trim()) return;
        onReply(ticket.id || ticket._id, replyContent);
        setReplyContent("");
    };

    const isAdmin = currentUserRole === "ADMIN";

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h2 className={styles.title}>
                            {ticket.type === "SUPPORT" ? "Yêu cầu hỗ trợ" : "Góp ý sản phẩm"}{" "}
                            <span className={styles.ticketId}>#{(ticket.id || ticket._id || "").slice(0, 8)}</span>
                        </h2>
                        <div className={styles.subInfo}>
                            <span
                                className={
                                    ticket.status === TicketStatus.PENDING
                                        ? styles.statusOpen
                                        : ticket.status === TicketStatus.REVIEWING
                                            ? styles.statusResponded
                                            : styles.statusClosed
                                }
                            >
                                {ticket.status}
                            </span>
                            <span className={styles.date}>
                                {ticket.createdAt.toLocaleString("vi-VN")}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className={styles.closeBtn}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className={styles.body}>
                    {/* Left: Ticket Info */}
                    <div className={styles.left}>
                        <div className={styles.infoSection}>
                            <h4>Thông tin chi tiết</h4>
                            <div className={styles.infoBox}>
                                <div>
                                    <span>Tiêu đề / Danh mục</span>
                                    <p>{ticket.title || ticket.category}</p>
                                </div>
                                <div>
                                    <span>Nội dung</span>
                                    <p>{ticket.content}</p>
                                </div>
                                {ticket.files?.length > 0 && (
                                    <div>
                                        <span>Đính kèm ({ticket.files.length})</span>
                                        <div className={styles.files}>
                                            {ticket.files.map((file, idx) => (
                                                <div key={idx} className={styles.fileItem}>
                                                    <Paperclip size={14} />
                                                    <span>{file.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {isAdmin && (
                            <div className={styles.infoSection}>
                                <h4>Cập nhật trạng thái</h4>
                                <select
                                    value={ticket.status}
                                    onChange={(e) =>
                                        onStatusChange && onStatusChange(ticket.id, e.target.value)
                                    }
                                >
                                    <option value={TicketStatus.PENDING}>PENDING (Chờ xử lý)</option>
                                    <option value={TicketStatus.REVIEWING}>REVIEWING (Đang xử lí)</option>
                                    <option value={TicketStatus.RESOLVED}>RESOLVED (Đã xử lí)</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Right: Conversation */}
                    <div className={styles.right}>
                        <div className={styles.chatArea}>
                            {/* Original message */}
                            <div className={styles.messageRow}>
                                <div className={styles.avatar}>
                                    <User size={16} />
                                </div>
                                <div className={styles.messageBubbleOriginal}>
                                    <p>{ticket.content}</p>
                                    <span>Original Request</span>
                                </div>
                            </div>

                            {/* Replies */}
                            {ticket.replies?.map((reply) => {
                                const isMe =
                                    (isAdmin && reply.sender === "ADMIN") ||
                                    (!isAdmin && reply.sender === "USER");
                                return (
                                    <div
                                        key={reply.id}
                                        className={`${styles.messageRow} ${isMe ? styles.reverseRow : ""
                                            }`}
                                    >
                                        <div
                                            className={`${styles.avatar} ${isMe ? styles.avatarMe : ""
                                                }`}
                                        >
                                            {reply.sender === "ADMIN" ? (
                                                <ShieldCheck size={16} />
                                            ) : (
                                                <User size={16} />
                                            )}
                                        </div>
                                        <div
                                            className={`${styles.messageBubble} ${isMe ? styles.messageMe : ""
                                                }`}
                                        >
                                            <p>{reply.content}</p>
                                            <span>{reply.timestamp.toLocaleString("vi-VN")}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Reply Input */}
                        <div className={styles.replyBox}>
                            {ticket.status === TicketStatus.CLOSED ? (
                                <div className={styles.closedNotice}>
                                    Ticket này đã đóng, không thể gửi thêm phản hồi.
                                </div>
                            ) : (
                                <>
                                    <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder="Nhập phản hồi..."
                                    />
                                    <button
                                        onClick={handleSendReply}
                                        disabled={!replyContent.trim()}
                                    >
                                        <Send size={18} />
                                        <span>Gửi</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
TicketDetailModal.propTypes = {
    ticket: PropTypes.shape({
        id: PropTypes.string.isRequired,
        _id: PropTypes.string,
        type: PropTypes.oneOf(["SUPPORT", "FEEDBACK"]).isRequired,
        status: PropTypes.oneOf([
            TicketStatus.OPEN,
            TicketStatus.RESPONDED,
            TicketStatus.CLOSED,
        ]).isRequired,
        title: PropTypes.string,
        category: PropTypes.string,
        content: PropTypes.string.isRequired,
        files: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            })
        ),
        createdAt: PropTypes.instanceOf(Date).isRequired,
        replies: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                sender: PropTypes.oneOf(["ADMIN", "USER"]).isRequired,
                content: PropTypes.string.isRequired,
                timestamp: PropTypes.instanceOf(Date).isRequired,
            })
        ),
    }),
    currentUserRole: PropTypes.oneOf(["ADMIN", "USER"]),
    onClose: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func,
};