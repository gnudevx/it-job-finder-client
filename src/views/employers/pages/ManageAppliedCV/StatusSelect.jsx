import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./StatusSelect.module.scss";

function StatusSelect({ currentStatus, onChange }) {
  const [status, setStatus] = useState(currentStatus);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onChange(newStatus);
  };

  return (
    <select value={status} onChange={handleChange} className={styles.select}>
      <option value="applied">Tiếp nhận</option>
      <option value="reviewed">Phù hợp</option>
      <option value="interviewing">Hẹn phỏng vấn</option>
      <option value="hired">Nhận việc</option>
      <option value="rejected">Chưa phù hợp</option>
    </select>
  );
}

StatusSelect.propTypes = {
  currentStatus: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StatusSelect;
