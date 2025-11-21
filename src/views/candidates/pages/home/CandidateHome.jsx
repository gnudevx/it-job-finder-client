import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CandidateHome.module.scss";
import FilterBar from "@views/candidates/components/FilterBar/FilterBar.jsx";
import useFavorites from "@/hooks/useFavorites";
import JobCard from "@/views/candidates/components/JobCard/JobCard.jsx";
import { getAllJobs } from "@/api/jobService";
import Pagination from "@/components/common/Pagination/Pagination";

export default function HomePage() {
    const { favorites, toggleFavorite } = useFavorites();
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({});
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 20;

    const navigate = useNavigate();

    // 🟦 Load job từ backend khi vào trang
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
                }));

                setJobs(formatted);
            } catch (error) {
                console.error("Error loading jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
        setCurrentPage(1); // reset về trang 1 khi lọc
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
        setCurrentPage(1); // reset khi search
    };

    // 🟦 Lọc job như cũ — (đặt trước pagination)
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

            return job[key]?.toLowerCase().includes(String(value).toLowerCase());
        });
    });

    // 🟦 Pagination logic (đặt dưới filtered)
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
                        isFavorite={favorites.includes(job.id)}
                        onToggleFavorite={toggleFavorite}
                        onClick={() => navigate(`/candidate/job/${job.id}`)}
                    />
                ))}
            </div>

            {/* 🟩 Thanh phân trang */}
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