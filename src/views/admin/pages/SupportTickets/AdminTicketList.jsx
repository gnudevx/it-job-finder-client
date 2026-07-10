import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import styles from './AdminTicketList.module.scss';
import PropTypes from 'prop-types';
import {
  SupportTicketStatus,
  normalizeSupportTicketStatus,
  getSupportTicketStatusLabel,
} from './type';

const TicketType = {
  SUPPORT: 'SUPPORT',
  FEEDBACK: 'FEEDBACK',
};

export default function AdminTicketList({ tickets, onViewTicket }) {
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredTickets = tickets.filter((t) => {
    const normalizedStatus = normalizeSupportTicketStatus(t.status);
    const typeMatch = filterType === 'ALL' || t.type === filterType;
    const statusMatch = filterStatus === 'ALL' || normalizedStatus === filterStatus;
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
              <option value={SupportTicketStatus.OPEN}>Mới</option>
              <option value={SupportTicketStatus.RESPONDED}>Đã phản hồi</option>
              <option value={SupportTicketStatus.CLOSED}>Đã đóng</option>
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
              filteredTickets.map((ticket) => {
                const normalizedStatus = normalizeSupportTicketStatus(ticket.status);

                return (
                  <tr key={ticket._id}>
                    <td>
                      <span
                        className={
                          ticket.type === TicketType.SUPPORT
                            ? styles.supportBadge
                            : styles.feedbackBadge
                        }
                      >
                        {ticket.type === TicketType.SUPPORT ? 'Hỗ trợ' : 'Góp ý'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.title}>{ticket.title || ticket.category}</div>
                      <div className={styles.content}>{ticket.content}</div>
                    </td>
                    <td>{ticket.createdAt.toLocaleDateString('vi-VN')}</td>
                    <td>
                      <span
                        className={
                          normalizedStatus === SupportTicketStatus.OPEN
                            ? styles.statusOpen
                            : normalizedStatus === SupportTicketStatus.RESPONDED
                              ? styles.statusResponded
                              : styles.statusClosed
                        }
                      >
                        {getSupportTicketStatusLabel(normalizedStatus)}
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
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

AdminTicketList.propTypes = {
  onViewTicket: PropTypes.func.isRequired,
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.oneOf([TicketType.SUPPORT, TicketType.FEEDBACK]).isRequired,
      title: PropTypes.string,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
