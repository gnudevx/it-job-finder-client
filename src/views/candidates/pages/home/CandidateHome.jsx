import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CandidateHome.module.scss";
import FilterBar from "@views/candidates/components/FilterBar/FilterBar.jsx";
import { mockJobList } from "@/models/mockJobList";
import useFavorites from "@/hooks/useFavorites";
import JobCard from "@/components/candidates/JobCard/JobCard.jsx";

export default function HomePage() {
    const { favorites, toggleFavorite } = useFavorites(); // 🔥 FIXED
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({});
    const navigate = useNavigate();

    const handleFilterChange = (type, value) => {
        setFilters({ ...filters, [type]: value });
    };

    const jobs = mockJobList;

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

            return job[key]?.toLowerCase().includes(String(value).toLowerCase());
        });
    });

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

            <div className={styles["jobs-grid"]}>
                {filtered.map((job) => (
                    <JobCard
                        key={job.id} // 🔥 FIXED
                        job={job}
                        isFavorite={favorites.includes(job.id)} // 🔥 FIXED
                        onToggleFavorite={toggleFavorite}
                        onClick={() => navigate(`/candidate/job/${job.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
