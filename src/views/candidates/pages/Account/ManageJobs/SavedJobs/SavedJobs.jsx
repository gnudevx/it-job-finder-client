import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SavedJobs.module.scss";
import JobCard from "@/views/candidates/components/JobCard/JobCard";
import { getAllJobs } from "@/api/jobService";
import useFavorites from "@/hooks/useFavorites";

export default function SavedJobs() {
    const navigate = useNavigate();
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const data = await getAllJobs();

            const formatted = data.map(job => ({
                id: job._id,
                title: job.title,
                company: job.group_id?.name || "Không rõ",
                salary: job.salary_raw || "Thoả thuận",
                location: job.location?.name || "Không rõ",
                experience: job.experience,
            }));

            setJobs(formatted);
        };

        fetchJobs();
    }, []);

    const savedJobs = jobs.filter(job => favorites.includes(job.id));

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
