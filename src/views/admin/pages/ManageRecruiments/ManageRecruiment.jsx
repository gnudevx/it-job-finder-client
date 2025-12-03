import React, { useState } from "react";
import { JobStatus } from "./types";
import { Check, X, Eye, Filter } from "lucide-react";
import styles from "./ManageRecruiment.module.scss";

const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend React",
    companyName: "Tech Corp",
    postedDate: "2023-10-25",
    status: JobStatus.PENDING,
    description: "Cần tuyển ReactJS 3 năm kinh nghiệm...",
  },
  {
    id: "2",
    title: "Backend Node.js",
    companyName: "Startup Fast",
    postedDate: "2023-10-24",
    status: JobStatus.PENDING,
    description: "NodeJS, Microservices...",
  },
  {
    id: "3",
    title: "Designer UI/UX",
    companyName: "Creative Agency",
    postedDate: "2023-10-23",
    status: JobStatus.APPROVED,
    description: "Figma, Adobe XD...",
  },
];

const ManageRecruiment = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filter, setFilter] = useState("All");

  const handleStatusChange = (id, newStatus) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
  };

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((j) => j.status === filter);

  return (
    <div className={styles.container}>
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
              <tr key={job.id} className={styles.row}>
                <td className={styles.titleCol}>{job.title}</td>
                <td className={styles.textGray}>{job.companyName}</td>
                <td className={styles.textMuted}>{job.postedDate}</td>

                <td>
                  <span
                    className={`${styles.statusTag} ${job.status === JobStatus.PENDING
                        ? styles.pending
                        : job.status === JobStatus.APPROVED
                          ? styles.approved
                          : styles.rejected
                      }`}
                  >
                    {job.status}
                  </span>
                </td>

                <td className={styles.right}>
                  <div className={styles.actions}>
                    <button
                      className={styles.iconBtn}
                      title="Xem chi tiết"
                    >
                      <Eye size={18} />
                    </button>

                    {job.status === JobStatus.PENDING && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(job.id, JobStatus.APPROVED)
                          }
                          className={styles.approveBtn}
                          title="Duyệt"
                        >
                          <Check size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleStatusChange(job.id, JobStatus.REJECTED)
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
        </table>

        {filteredJobs.length === 0 && (
          <div className={styles.empty}>Không có dữ liệu</div>
        )}
      </div>
    </div>
  );
};

export default ManageRecruiment;
