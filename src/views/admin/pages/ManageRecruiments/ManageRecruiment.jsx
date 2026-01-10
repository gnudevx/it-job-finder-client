import React, { useEffect, useState } from "react";
import { JobStatus } from "./types";
import { Check, X, Eye, Filter } from "lucide-react";
import styles from "./ManageRecruiment.module.scss";
import jobApiService from "@/api/jobApiService.js"; // ✅ service gọi backend
import JobDetailModal from "../../../../components/common/PreviewJob/JobDetailModal";
const ManageRecruiment = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [undoData, setUndoData] = useState(null);
  const [showUndo, setShowUndo] = useState(false);
  let undoTimer = null;
  const handleViewJob = async (id) => {
    try {
      const detail = await jobApiService.getJobDetail(id);
      console.log("Chi tiết job:", detail);
      setSelectedJob(detail.job);
      setIsModalOpen(true);
    } catch (err) {
      console.log("Lỗi lấy chi tiết job:", err);
    }
  };
  // 🔹 Lấy danh sách job từ backend
  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await jobApiService.getAllJobs();
      console.log(res);
      // Nếu backend trả { success, data }
      setJobs(res.jobs || []); // ✅ chắc chắn jobs là mảng
    } catch (err) {
      console.error("Lấy danh sách job lỗi:   ", err);
      alert("Không thể tải danh sách job");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadJobs();
  }, []);

  // 🔹 Cập nhật trạng thái job
  const handleStatusChange = async (id, newStatus) => {
    const oldJob = jobs.find(j => j._id === id);
    if (!oldJob) return;

    const oldStatus = oldJob.publishStatus;

    // 1️⃣ Update UI ngay lập tức
    setJobs(prev =>
      prev.map(job =>
        job._id === id ? { ...job, publishStatus: newStatus } : job
      )
    );

    // 2️⃣ Lưu thông tin để undo
    setUndoData({
      id,
      oldStatus,
    });
    setShowUndo(true);

    // 3️⃣ Nếu không undo sau 5 giây => commit API
    undoTimer = setTimeout(async () => {
      setShowUndo(false);
      try {
        await jobApiService.updateJobStatus(id, newStatus);
      } catch (err) {
        toast.alert("Cập nhật lỗi, khôi phục trạng thái cũ.");
        setJobs(prev =>
          prev.map(job =>
            job._id === id ? { ...job, publishStatus: oldStatus } : job
          )
        );
      }
    }, 1000);
  };
  const handleUndo = () => {
    if (!undoData) return;

    const { id, oldStatus } = undoData;

    clearTimeout(undoTimer); // Hủy gửi API

    // Khôi phục UI
    setJobs(prev =>
      prev.map(job =>
        job._id === id ? { ...job, publishStatus: oldStatus } : job
      )
    );

    setShowUndo(false);
    setUndoData(null);
  };
  // 🔹 Lọc job theo trạng thái
  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter(j => j.publishStatus.toLowerCase() === filter.toLowerCase());

  return (
    <div className={styles.container}>
      {showUndo && (
        <div className={styles.undoBar}>
          <span>Đã cập nhật trạng thái. Hoàn tác?</span>
          <button onClick={handleUndo}>Hoàn tác</button>
        </div>
      )}
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Kiểm Duyệt Tin Tuyển Dụng</h1>

        <div className={styles.filterGroup}>
          <Filter size={20} className={styles.filterIcon} />
          <select
            className={styles.select}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">Tất cả trạng thái</option>
            <option value={JobStatus.PENDING}>Chờ duyệt</option>
            <option value={JobStatus.APPROVED}>Đã duyệt</option>
            <option value={JobStatus.REJECTED}>Đã từ chối</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.empty}>Đang tải dữ liệu...</div>
        ) : filteredJobs.length === 0 ? (
          <div className={styles.empty}>Không có dữ liệu</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tiêu đề Job</th>
                <th>Công ty</th>
                <th>Ngày đăng</th>
                <th>Trạng thái</th>
                <th className={styles.right}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job._id} className={styles.row}>
                  <td className={styles.titleCol}>{job.title}</td>
                  <td className={styles.textGray}>
                    {job.employer_id?.companyId?.name || "Chưa có"}
                  </td>
                  <td className={styles.textMuted}>
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <span
                      className={`${styles.statusTag} ${job.publishStatus === JobStatus.PENDING.toLowerCase()
                        ? styles.pending
                        : job.publishStatus === JobStatus.APPROVED
                          ? styles.approved
                          : styles.rejected
                        }`}
                    >
                      {job.publishStatus}
                    </span>
                  </td>

                  <td className={styles.right}>
                    <div className={styles.actions}>
                      <button
                        className={styles.iconBtn}
                        title="Xem chi tiết"
                        onClick={() => handleViewJob(job._id)}
                      >
                        <Eye size={18} />
                      </button>

                      {job.publishStatus === JobStatus.PENDING.toLowerCase() && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(job._id, JobStatus.APPROVED.toLowerCase())
                            }
                            className={styles.approveBtn}
                            title="Duyệt"
                          >
                            <Check size={18} />
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(job._id, JobStatus.REJECTED.toLowerCase())
                            }
                            className={styles.rejectBtn}
                            title="Từ chối"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            {isModalOpen && (
              <JobDetailModal
                job={selectedJob}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageRecruiment;
