import React, { useState } from "react";
import styles from "./AppliedJobs.module.scss";
import { mockJobList } from "@/models/mockJobList";
import JobCard from "@/components/candidates/JobCard/JobCard.jsx"; 
import { useNavigate } from "react-router-dom";
import useFavorites from "@/hooks/useFavorites";

export default function AppliedJobs() {
    const [search] = useState("");
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();

    // Lấy danh sách ứng tuyển
    const applied = JSON.parse(localStorage.getItem("appliedJobs") || "[]");

    // Join dữ liệu từ mockJobList để lấy full thông tin job
    const appliedJobDetails = applied
        .map((app) => mockJobList.find((j) => j.id === app.jobId))
        .filter(Boolean); // loại bỏ job không tồn tại

    // Lọc theo search
    const filtered = appliedJobDetails.filter(
        (job) =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles["home-container"]}>
            <h2 className={styles.heading}>Danh sách công việc đã ứng tuyển</h2>

            <div className={styles["jobs-grid"]}>
                {filtered.length === 0 && (
                    <p>Bạn chưa ứng tuyển công việc nào.</p>
                )}

                {filtered.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        isFavorite={isFavorite(job.id)}
                        onToggleFavorite={toggleFavorite}
                        onClick={() => navigate(`/candidate/job/${job.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
