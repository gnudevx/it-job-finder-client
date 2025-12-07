// ManageAppliedCV.jsx
import React, { useState, useEffect, useCallback } from "react";
import styles from "./ManageAppliedCV.module.scss";
import { getEmployerApplications, updateEmployerApplicationStatus } from "@api/applicationService/employerApplication.js";
import StatusSelect from "./StatusSelect";
import FilterBar from "./FilterBar";
import PropTypes from "prop-types";

// -------------------- CV Item Component --------------------
function CVItem({ app, onStatusUpdated }) {
  const [status, setStatus] = useState(app.status);
  const [loading, setLoading] = useState(false);

  const handleViewPDF = () => {
    if (app.resumeId) {
      window.open(`http://localhost:5000/api/resumes/${app.resumeId._id}/view`, "_blank");
    } else {
      alert("Ứng viên chưa tải CV lên.");
    }
  };

  const handleSaveStatus = async () => {
    setLoading(true);
    try {
      const updatedApp = await updateEmployerApplicationStatus(app._id, status);
      // Truyền cả updatedAt mới về ManageAppliedCV
      onStatusUpdated(app._id, updatedApp.status, updatedApp.updatedAt);
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái!");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className={styles.cvItem}>
      <div className={styles.cvProfile}>
        <div className={styles.cvName}>{app.candidateId?.fullName}</div>
        <div className={styles.cvJob}>{app.jobId?.title}</div>
        <div className={styles.cvDate}>
          Ngày ứng tuyển: {new Date(app.appliedAt).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
        </div>
        <div className={styles.cvDate}>
          Ngày cập nhật: {new Date(app.updatedAt).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
        </div>
      </div>

      <div className={styles.cvActions}>
        <div className={styles.statusWrapper}>
          <span className={styles.statusLabel}>Trạng thái: </span>
          <StatusSelect
            currentStatus={status}
            onChange={(newStatus) => setStatus(newStatus)}
          />
        </div>

        <div className={styles.actionBtns}>
          <button
            className={styles.saveStatusBtn}
            onClick={handleSaveStatus}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu trạng thái"}
          </button>

          <button className={styles.viewPdfBtn} onClick={handleViewPDF}>
            Xem CV
          </button>
        </div>
      </div>

    </div>
  );
}

CVItem.propTypes = {
  app: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    candidateId: PropTypes.shape({
      fullName: PropTypes.string,
    }),
    jobId: PropTypes.shape({
      title: PropTypes.string,
    }),
    appliedAt: PropTypes.string.isRequired,
    status: PropTypes.string,
    resumeId: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  onStatusUpdated: PropTypes.func.isRequired,
};

// -------------------- Main Component --------------------
function ManageAppliedCV() {
  const [filters, setFilters] = useState({
    q: "",
    campaign: "",
    status: "",
    source: "",
    range: "all",
    appliedAt: "",
    toDate: "",
  });
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const campaigns = []; // TODO: load job campaigns từ API

  // Debounce load API
  const loadData = useCallback(
    (() => {
      let timer;
      return (filters) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
          setLoading(true);
          try {
            const data = await getEmployerApplications(filters);
            setApplications(data);
          } catch (e) {
            console.error(e);
          }
          setLoading(false);
        }, 300);
      };
    })(),
    []
  );

  useEffect(() => {
    loadData(filters);
  }, [filters, loadData]);

  const handleStatusUpdated = (id, newStatus, updatedAt) => {
    setApplications((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: newStatus, updatedAt } : item
      )
    );
    alert("Cập nhật trạng thái CV thành công");
  };

  return (
    <div className={styles.pageWrap}>
      <div className={styles.container}>
        <h2 className={styles.title}>Quản lý CV ứng tuyển</h2>

        <FilterBar filters={filters} setFilters={setFilters} campaigns={campaigns} />

        <div style={{ marginTop: "24px" }}>
          {loading && <p>Đang tải...</p>}
          {!loading && applications.length === 0 && <p>Không có ứng viên nào.</p>}

          {!loading &&
            applications.map((app) => (
              <CVItem key={app._id} app={app} onStatusUpdated={handleStatusUpdated} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ManageAppliedCV;
