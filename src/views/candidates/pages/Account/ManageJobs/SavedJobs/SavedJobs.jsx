import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SavedJobs.module.scss";
import JobCard from "@/views/candidates/components/JobCard/JobCard";
import { mockJobList } from "@/models/jobs/mockJobList";
import useFavorites from "@/hooks/useFavorites";

export default function SavedJobs() {
    const navigate = useNavigate();
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    const savedJobs = mockJobList.filter(job => favorites.includes(job.id));

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>⭐ Công việc đã lưu</h2>

            {savedJobs.length === 0 ? (
                <p className={styles.empty}>Bạn chưa lưu công việc nào.</p>
            ) : (
                <div className={styles.jobsGrid}>
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isFavorite={isFavorite(job.id)}
                            onToggleFavorite={toggleFavorite}
                            onClick={() => navigate(`/candidate/job/${job.id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
