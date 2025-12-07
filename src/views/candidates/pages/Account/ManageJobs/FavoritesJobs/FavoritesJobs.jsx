import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FavoritesJobs.module.scss";
import JobCard from "@/views/candidates/components/JobCard/JobCard.jsx";
import { getAllJobs } from "@/api/jobService";
import useFavorites from "@/hooks/useFavorites";
import Pagination from "@/components/common/Pagination/Pagination";

export default function SavedJobs() {
    const navigate = useNavigate();
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const [jobs, setJobs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 12;

    useEffect(() => {
        const fetchJobs = async () => {
            const data = await getAllJobs();

            const formatted = data.data.map(job => ({
                id: job._id,
                title: job.title,
                group: job.group_id?.name || "Không rõ",
                salary: job.salary_raw || "Thoả thuận",
                location: job.location?.name || "Không rõ",
                experience: job.experience,
                createdAt: job.createdAt,
            }));

            setJobs(formatted);
        };

        fetchJobs();
    }, []);

    const savedJobs = jobs.filter(job => favorites.includes(job.id));
    const totalPages = Math.ceil(savedJobs.length / jobsPerPage);

    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;

    const paginatedJobs = savedJobs.slice(startIndex, endIndex);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>⭐ Công việc yêu thích</h2>

            {savedJobs.length === 0 ? (
                <p className={styles.empty}>Bạn chưa lưu công việc nào.</p>
            ) : (
                <div className={styles.jobsGrid}>
                    {paginatedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isFavorite={isFavorite(job.id)}
                            onToggleFavorite={toggleFavorite}
                            onClick={() => navigate(`/job/${job.id}`)}
                        />
                    ))}
                </div>
            )}

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
