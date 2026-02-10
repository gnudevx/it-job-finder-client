// FilterBar.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "./ManageAppliedCV.module.scss";

function IconSearch() {
  return <i className="far fa-search" aria-hidden="true"></i>;
}

function FilterBar({ filters, setFilters, campaigns }) {
  // --- Handlers ---
  const onTextChange = (e) =>
    setFilters((prev) => ({ ...prev, q: e.target.value }));

  const onStatusChange = (e) =>
    setFilters((prev) => ({ ...prev, status: e.target.value }));

  const onTimeChange = (e) => {
    const value = e.target.value;

    setFilters((prev) => ({
      ...prev,
      range: value,
      ...(value !== "custom"
        ? { appliedAt: "", toDate: "" } // reset custom date
        : {}),
    }));
  };

  const onCustomDateChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const clearFilters = () =>
    setFilters({
      q: "",
      campaign: "",
      status: "",
      range: "all",
      appliedAt: "",
      toDate: "",
    });

  // --- JSX ---
  return (
    <div className={styles.filterBar}>
      {/* SEARCH BOX */}
      <form className={styles.searchBox} onSubmit={(e) => e.preventDefault()}>
        <input
          className={styles.searchInput}
          placeholder="Tìm kiếm tên ứng viên, tin tuyển dụng"
          value={filters.q}
          onChange={onTextChange}
        />
        <button className={styles.searchBtn} type="submit">
          <IconSearch />
        </button>
      </form>

      {/* SELECT ROW */}
      <div className={styles.selectsRow}>
        {/* Campaign */}
        <select
          className={styles.select}
          value={filters.campaign}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, campaign: e.target.value }))
          }
        >
          <option value="">Chọn tin tuyển dụng</option>
          {campaigns.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          className={styles.select}
          value={filters.status}
          onChange={onStatusChange}
        >
          <option value="">Nhập trạng thái CV</option>
          <option value="applied">Tiếp nhận</option>
          <option value="reviewed">Phù hợp</option>
          <option value="interviewing">Hẹn phỏng vấn</option>
          <option value="hired">Nhận việc</option>
          <option value="rejected">Chưa phù hợp</option>
        </select>

        {/* Time Range */}
        <select
          className={styles.select}
          value={filters.range}
          onChange={onTimeChange}
        >
          <option value="all">Tất cả thời gian</option>
          <option value="today">Hôm nay</option>
          <option value="7days">7 ngày gần đây nhất</option>
          <option value="30days">30 ngày gần đây nhất</option>
          <option value="thisMonth">Tháng này </option>
          <option value="lastMonth">Tháng trước </option>
          <option value="custom">Tùy chỉnh...</option>
        </select>

        {/* Custom Date Range */}
        {filters.range === "custom" && (
          <div className={styles.customDateWrap}>
            <input
              type="date"
              className={styles.dateInput}
              value={filters.appliedAt}
              onChange={(e) => onCustomDateChange("appliedAt", e.target.value)}
            />
            <span className={styles.dateSeparator}>–</span>
            <input
              type="date"
              className={styles.dateInput}
              value={filters.toDate}
              onChange={(e) => onCustomDateChange("toDate", e.target.value)}
            />
          </div>
        )}

        <button className={styles.clearBtn} type="button" onClick={clearFilters}>
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
}

FilterBar.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  campaigns: PropTypes.array.isRequired,
};

export default FilterBar;
