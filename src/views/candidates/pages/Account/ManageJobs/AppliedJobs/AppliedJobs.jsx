import React, { useEffect, useState } from "react";
import styles from "./AppliedJobs.module.scss";
import JobCard from "@/views/candidates/components/JobCard/JobCard.jsx"; 
import { useNavigate } from "react-router-dom";
import useFavorites from "@/hooks/useFavorites";
import { getMyAppliedJobs } from "@/api/applicationService/candidateApplication";
import Pagination from "@/components/common/Pagination/Pagination";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const { isFavorite, toggleFavorite } = useFavorites(authToken);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const appliedJobs = await getMyAppliedJobs(authToken);

        const jobDetails = appliedJobs
          .map((app) => {
            const job = app.jobId;
            return {
              id: job?._id,
              title: job?.title,
              group: job?.group_id?.name || "Không rõ",
              salary: job?.salary_raw || "Thoả thuận",
              location: job?.location?.name || "Không rõ",
              experience: job?.experience,
              createdAt: job?.createdAt,
              status: app.status,
              updatedAt: app.updatedAt
            };
          })
          .filter(Boolean);

        setJobs(jobDetails);
      } catch (err) {
        console.error("Lỗi tải công việc đã ứng tuyển:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [authToken]);

  // Search
  const filtered = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      (job.group && job.group.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const paginatedJobs = filtered.slice(startIndex, endIndex);

  if (loading) return <p>Đang tải danh sách công việc đã ứng tuyển...</p>;

  return (
    <div className={styles["home-container"]}>
      <h2 className={styles.heading}>Danh sách công việc đã ứng tuyển</h2>

      <div className={styles["jobs-grid"]}>
        {paginatedJobs.length === 0 && <p>Bạn chưa ứng tuyển công việc nào.</p>}

        {paginatedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isFavorite={isFavorite(job.id)}
            onToggleFavorite={() => toggleFavorite(job.id)}
            onClick={() => navigate(`/job/${job.id}`)}
            showStatusAndUpdate={true}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}
