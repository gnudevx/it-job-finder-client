import React, { useEffect, useState } from "react";
import styles from "./AppliedJobs.module.scss";
import JobCard from "@/views/candidates/components/JobCard/JobCard.jsx"; 
import { useNavigate } from "react-router-dom";
import useFavorites from "@/hooks/useFavorites";
import { getMyAppliedJobs } from "@/api/applicationService/candidateApplication";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search] = useState("");
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const { isFavorite, toggleFavorite } = useFavorites(authToken);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const appliedJobs = await getMyAppliedJobs(authToken);

        const jobDetails = appliedJobs.map((app) => {
          const job = app.jobId;
          console.log(app.updatedAt);
          return {
            id: job._id,
            title: job.title,
            group: job.group_id?.name || "Không rõ",
            salary: job.salary_raw || "Thoả thuận",
            location: job.location?.name || "Không rõ",
            experience: job.experience,
            createdAt: job.createdAt,
            status: app.status,
            updatedAt: app.updatedAt
          };
        }).filter(Boolean);

        setJobs(jobDetails);
      } catch (err) {
        console.error("Lỗi tải công việc đã ứng tuyển:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [authToken]);

  // Lọc theo search
  const filtered = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      (job.group && job.group.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <p>Đang tải danh sách công việc đã ứng tuyển...</p>;

  return (
    <div className={styles["home-container"]}>
      <h2 className={styles.heading}>Danh sách công việc đã ứng tuyển</h2>

      <div className={styles["jobs-grid"]}>
        {filtered.length === 0 && <p>Bạn chưa ứng tuyển công việc nào.</p>}

        {filtered.map((job) => (
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
    </div>
  );
}
