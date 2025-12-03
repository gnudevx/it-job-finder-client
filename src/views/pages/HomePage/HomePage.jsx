import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";

import FilterBar from "@/views/candidates/components/FilterBar/FilterBar.jsx";
import useFavorites from "@/hooks/useFavorites";
import JobCard from "@/views/candidates/components/JobCard/JobCard.jsx";
import { getAllJobs } from "@/api/jobService";
import Pagination from "@/components/common/Pagination/Pagination";
import { useAuth } from "@/contexts/AuthContext.jsx";

export default function HomePage() {
    const { authToken } = useAuth();

    // ❗ ĐÃ LOẠI favorites để tránh ESLint error
    const { toggleFavorite, isFavorite } = useFavorites();

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({});
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 20;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getAllJobs();

                const formatted = data.map(job => ({
                    id: job._id,
                    title: job.title,
                    company: job.group_id?.name || "Không rõ",
                    salary: job.salary_raw || "Thoả thuận",
                    location: job.location?.name || "Không rõ",
                    experience: job.experience,
                    createdAt: job.createdAt || job.updatedAt || null
                }));

                const sorted = formatted.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA; // mới nhất lên đầu
                });

                setJobs(sorted);
            } catch (error) {
                console.error("Error loading jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
        setCurrentPage(1);
    };

    const normalizeText = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\./g, "")
            .replace(/\s+/g, "")
            .toLowerCase();
    };

    const handleSearchSubmit = () => {
        setFilters({ ...filters, keyword: search });
        setCurrentPage(1);
    };

    const filtered = jobs.filter((job) => {
        const keyword = filters.keyword?.toLowerCase() || "";

        const searchMatch =
            (job.title?.toLowerCase() || "").includes(keyword) ||
            (job.company?.toLowerCase() || "").includes(keyword);

        if (!searchMatch) return false;

        return Object.entries(filters).every(([key, value]) => {
            if (!value || key === "keyword") return true;

            if (key === "experience") {
                return Number(job.experience) >= Number(value);
            }

            if (key === "salaryLevel") {
                const salary = parseInt(job.salary.replace(/\D/g, ""));
                if (!salary) return true;
                return salary >= Number(value);
            }

            if (key === "location") {
                return normalizeText(job.location).includes(normalizeText(value));
            }

            if (key === "createDate") {
                // value là số ngày
                const jobDate = new Date(job.createdAt);
                const now = new Date();
                const diffDays = Math.floor((now - jobDate) / (1000 * 60 * 60 * 24));
                return diffDays < Number(value);
            }

            return job[key]?.toLowerCase().includes(String(value).toLowerCase());
        });
    });

    const totalPages = Math.ceil(filtered.length / jobsPerPage);
    const indexOfLast = currentPage * jobsPerPage;
    const indexOfFirst = indexOfLast - jobsPerPage;
    const currentJobs = filtered.slice(indexOfFirst, indexOfLast);

    return (
        <div className={styles["home-container"]}>
            <div className={styles["top-section"]}>
                <h1 className={styles.title}>HireIT - Tạo CV, Tìm việc làm hiệu quả</h1>
                <div className={styles["search-box"]}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm việc làm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                    />
                    <button onClick={handleSearchSubmit}>Tìm kiếm</button>
                </div>
            </div>

            <FilterBar onChange={handleFilterChange} />

            <div className={styles.totalJobs}>
                Tổng số việc làm: {filtered.length}
            </div>

            <div className={styles["jobs-grid"]}>
                {currentJobs.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        isFavorite={isFavorite(job.id)}
                        onToggleFavorite={toggleFavorite}
                        onClick={() => navigate(`/job/${job.id}`)}
                        authToken={authToken}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    onChange={(newPage) => setCurrentPage(newPage)}
                />
            )}
        </div>
    );
}
