import React from "react";
import PropTypes from "prop-types";
import styles from "./JobFilters.module.scss";
import { CiSearch } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import CustomSelect from "./CustomSelect";
export default function JobFilters({ filters, setFilters }) {
    const update = (field) => (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFilters({ ...filters, [field]: value });
    };
    const visibilityOptions = [
        { value: "all", label: "Tất cả" },
        { value: "hidden", label: "Không hiển thị" },
        { value: "visible", label: "Đang hiển thị" },
        { value: "expired_visible", label: "Hết hạn hiển thị" },
    ];

    const approvalOptions = [
        { value: "all", label: "Tất cả" },
        { value: "approved", label: "Đã duyệt" },
        { value: "pending", label: "Chưa duyệt" },
    ];

    const expiredOptions = [
        { value: "all", label: "Tất cả thời gian" },
        { value: "expired", label: "Đã hết hạn" },
        { value: "not_expired", label: "Còn hạn" },
    ];

    return (
        // Đổi tên class ngoài cùng để tránh xung đột với style cũ
        <div className={styles.filtersContainer}>
            {/* HÀNG 1 */}
            <div className={styles.row}>
                {/* 1. Thanh tìm kiếm */}
                <div className={styles.inputGroup}>
                    <CiSearch className={styles.icon} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm tin tuyển dụng theo tiêu đề hoặc mã tin"
                        value={filters.search}
                        onChange={update("search")}
                    />
                </div>

                {/* 2. Trạng thái hiển thị */}
                <CustomSelect
                    label="Trạng thái hiển thị"
                    options={visibilityOptions}
                    value={filters.visibility}
                    onChange={val => setFilters({ ...filters, visibility: val })}
                />

                {/* 3. Trạng thái duyệt tin */}
                <CustomSelect
                    label="Trạng thái duyệt tin"
                    options={approvalOptions}
                    value={filters.approval}
                    onChange={val => setFilters({ ...filters, approval: val })}
                />
            </div>

            {/* HÀNG 2 */}
            <div className={styles.row}>
                {/* 4. Ngày hết hạn (Thêm mới) */}
                <CustomSelect
                    label="Ngày hết hạn hiển thị"
                    options={expiredOptions}
                    value={filters.expired}
                    onChange={val => setFilters({ ...filters, expired: val })}
                    icon={<CiCalendar size={20} />}
                />


                {/* 5. Checkbox chạy dịch vụ */}
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={filters.runningService}
                        onChange={update("runningService")}
                    />
                    Đang chạy dịch vụ
                </label>
            </div>
        </div>
    );
}

// Prop types và Default props giữ nguyên như cũ
JobFilters.propTypes = {
    filters: PropTypes.shape({
        search: PropTypes.string,
        visibility: PropTypes.string,
        approval: PropTypes.string,
        expired: PropTypes.string,
        runningService: PropTypes.bool,
    }).isRequired,
    setFilters: PropTypes.func.isRequired,
};

JobFilters.defaultProps = {
    filters: {
        search: "",
        visibility: "all",
        approval: "all",
        expired: "all",
        runningService: false,
    },
};