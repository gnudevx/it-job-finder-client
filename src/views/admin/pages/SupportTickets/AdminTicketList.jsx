import React, { useState } from "react";
import { Eye } from "lucide-react";
import styles from "./AdminTicketList.module.scss";

const TicketType = {
    SUPPORT: "SUPPORT",
    FEEDBACK: "FEEDBACK",
};

const TicketStatus = {
    OPEN: "OPEN",
    RESPONDED: "RESPONDED",
    CLOSED: "CLOSED",
};

// MOCK DATA nếu bạn muốn test
const mockTickets = [
    {
        id: "1",
        type: TicketType.SUPPORT,
        status: TicketStatus.OPEN,
        title: "Lỗi đăng tin",
        category: "Tin tuyển dụng",
        content: "Không thể đăng tin mới.",
        createdAt: new Date(),
    },
    {
        id: "2",
        type: TicketType.FEEDBACK,
        status: TicketStatus.RESPONDED,
        title: "Góp ý UI",
        category: "Giao diện",
        content: "Nên cải thiện màu sắc button.",
        createdAt: new Date(),
    },
];
import PropTypes from "prop-types";
export default function AdminTicketList({ tickets = mockTickets, onViewTicket }) {
    const [filterType, setFilterType] = useState("ALL");
    const [filterStatus, setFilterStatus] = useState("ALL");

    const filteredTickets = tickets.filter((t) => {
        const typeMatch = filterType === "ALL" || t.type === filterType;
        const statusMatch = filterStatus === "ALL" || t.status === filterStatus;
        return typeMatch && statusMatch;
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Quản lý Yêu cầu & Góp ý</h2>
                <div className={styles.filters}>
                    <div className={styles.filter}>
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <option value="ALL">Tất cả loại</option>
                            <option value={TicketType.SUPPORT}>Hỗ trợ</option>
                            <option value={TicketType.FEEDBACK}>Góp ý</option>
                        </select>
                    </div>
                    <div className={styles.filter}>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="ALL">Tất cả trạng thái</option>
                            <option value={TicketStatus.OPEN}>Mới</option>
                            <option value={TicketStatus.RESPONDED}>Đã phản hồi</option>
                            <option value={TicketStatus.CLOSED}>Đóng</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Loại</th>
                            <th>Tiêu đề / Danh mục</th>
                            <th>Ngày tạo</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.length === 0 ? (
                            <tr>
                                <td colSpan={5} className={styles.empty}>
                                    Không có dữ liệu phù hợp
                                </td>
                            </tr>
                        ) : (
                            filteredTickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td>
                                        <span
                                            className={
                                                ticket.type === TicketType.SUPPORT
                                                    ? styles.supportBadge
                                                    : styles.feedbackBadge
                                            }
                                        >
                                            {ticket.type === TicketType.SUPPORT ? "Report" : "Feedback"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.title}>{ticket.title || ticket.category}</div>
                                        <div className={styles.content}>{ticket.content}</div>
                                    </td>
                                    <td>{ticket.createdAt.toLocaleDateString("vi-VN")}</td>
                                    <td>
                                        <span
                                            className={
                                                ticket.status === TicketStatus.OPEN
                                                    ? styles.statusOpen
                                                    : ticket.status === TicketStatus.RESPONDED
                                                        ? styles.statusResponded
                                                        : styles.statusClosed
                                            }
                                        >
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className={styles.viewBtn}
                                            onClick={() => onViewTicket(ticket)}
                                            title="Xem chi tiết & Phản hồi"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
AdminTicketList.propTypes = {
    tickets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.oneOf([TicketType.SUPPORT, TicketType.FEEDBACK]).isRequired,
            status: PropTypes.oneOf([TicketStatus.OPEN, TicketStatus.RESPONDED, TicketStatus.CLOSED]).isRequired,
            title: PropTypes.string,
            category: PropTypes.string,
            content: PropTypes.string.isRequired,
            createdAt: PropTypes.instanceOf(Date).isRequired,
        })
    ),
    onViewTicket: PropTypes.func.isRequired,
};