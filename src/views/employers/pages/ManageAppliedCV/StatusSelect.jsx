import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './StatusSelect.module.scss';

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

  // Hàm map class màu động dựa trên trạng thái
  const getStatusClass = (statusKey) => {
    switch (statusKey) {
      case 'applied':
        return styles.statusApplied;
      case 'reviewed':
        return styles.statusReviewed;
      case 'interviewing':
        return styles.statusInterviewing;
      case 'hired':
        return styles.statusHired;
      case 'rejected':
        return styles.statusRejected;
      default:
        return '';
    }
  };

  return (
    <div className={styles.wrapper}>
      <select
        value={status}
        onChange={handleChange}
        className={`${styles.select} ${getStatusClass(status)}`}
      >
        <option value="applied">Tiếp nhận</option>
        <option value="reviewed">Phù hợp</option>
        <option value="interviewing">Hẹn phỏng vấn</option>
        <option value="hired">Nhận việc</option>
        <option value="rejected">Chưa phù hợp</option>
      </select>
    </div>
  );
}

StatusSelect.propTypes = {
  currentStatus: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StatusSelect;
