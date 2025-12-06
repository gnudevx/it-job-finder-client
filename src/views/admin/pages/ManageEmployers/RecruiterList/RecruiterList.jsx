import React, { useState } from "react";
import PropTypes from "prop-types";
import { Filter } from "lucide-react";
import styles from "./RecruiterList.module.scss";
import logo from "@/assets/logo.jpg"
/**
 * RecruiterList.jsx
 * - Accepts recruiters (array) and onViewDetail (fn)
 * - Default recruiters = [] to avoid undefined errors
 */

export default function RecruiterList({ recruiters = [], onViewDetail }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const filtered = recruiters.filter((r) => {
        const name = (r.companyName || "").toLowerCase();
        const email = (r.email || "").toLowerCase();
        const q = (searchTerm || "").toLowerCase();
        const matchSearch = name.includes(q) || email.includes(q);
        const matchStatus = filterStatus === "all" || r.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const getStatusClass = (status) => {
        switch (status) {
            case "ACTIVE":
                return styles.statusActive;
            case "PENDING":
                return styles.statusPending;
            case "SUSPENDED":
            case "BLOCKED":
                return styles.statusBlocked;
            default:
                return styles.statusDefault;
        }
    };

    const getTierClass = (tier) => {
        switch (tier) {
            case "ENTERPRISE":
                return styles.tierEnterprise;
            case "PREMIUM":
                return styles.tierPremium;
            case "STANDARD":
                return styles.tierStandard;
            default:
                return styles.tierDefault;
        }
    };

    return (
        <div className={styles.wrapper}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>Danh sách nhà tuyển dụng</h2>

                <div className={styles.searchFilterRow}>
                    {/* Search */}
                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            placeholder="Tìm theo tên công ty, email..."
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filter */}
                    <div className={styles.selectBox}>
                        <select
                            className={styles.select}
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="ACTIVE">Hoạt động</option>
                            <option value="PENDING">Chờ duyệt</option>
                            <option value="SUSPENDED">Đã khóa</option>
                        </select>
                        <div className={styles.filterIcon}><Filter /></div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th>Công ty / Liên hệ</th>
                            <th>Gói đăng ký</th>
                            <th>Trạng thái</th>
                            <th>Số dư tin</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>

                    <tbody className={styles.tbody}>
                        {filtered.map((recruiter) => (
                            <tr key={recruiter.id} className={styles.row}>
                                <td className={styles.companyCell}>
                                    <div className={styles.logoWrap}>
                                        <img
                                            src={logo}
                                            alt={recruiter.companyName || ""}
                                            className={styles.logo}
                                        />
                                    </div>

                                    <div className={styles.companyInfo}>
                                        <div className={styles.companyName}>
                                            {recruiter.companyName}
                                        </div>
                                        <div className={styles.sub}>{recruiter.email}</div>
                                    </div>
                                </td>

                                <td>
                                    <span className={`${styles.tierBadge} ${getTierClass(recruiter.tier)}`}>
                                        {recruiter.tier || "Free"}
                                    </span>
                                </td>

                                <td>
                                    <span className={`${styles.statusBadge} ${getStatusClass(recruiter.status)}`}>
                                        {recruiter.status}
                                    </span>
                                </td>

                                <td>
                                    <span className={styles.credit}>
                                        <strong>{recruiter.creditBalance ?? 0}</strong> tin
                                    </span>
                                </td>

                                <td className={styles.actions}>
                                    <button
                                        onClick={() => onViewDetail && onViewDetail(recruiter)}
                                        className={styles.viewBtn}
                                    >
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className={styles.empty}>Không có nhà tuyển dụng nào</div>
                )}
            </div>

            {/* Footer / Pagination Mock */}
            <div className={styles.footer}>
                <span>Hiển thị {filtered.length} kết quả</span>

                <div className={styles.pager}>
                    <button className={styles.pageBtn} disabled>
                        Trước
                    </button>
                    <button className={styles.pageBtn}>Sau</button>
                </div>
            </div>
        </div>
    );
}

RecruiterList.propTypes = {
    recruiters: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            companyName: PropTypes.string,
            email: PropTypes.string,
            phone: PropTypes.string,
            logoUrl: PropTypes.string,
            tier: PropTypes.string,
            status: PropTypes.string,
            creditBalance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            jobs: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                    title: PropTypes.string,
                })
            ),
        })
    ).isRequired,
    onViewDetail: PropTypes.func.isRequired,
};
