import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecommendJobs.module.scss";
import JobCard from "@/views/candidates/components/JobCard/JobCard.jsx";
import Pagination from "@/components/common/Pagination/Pagination.jsx";
import { getJobDetail } from "@/api/jobService";

export default function RecommendJobs() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [page, setPage] = useState(1);
    const [pageJobsDetail, setPageJobsDetail] = useState([]);
    const limit = 5;

    const navigate = useNavigate();

    // ==============================
    // 1) Gọi API /recommend
    // ==============================
    useEffect(() => {
        const selectedCV = JSON.parse(localStorage.getItem("selectedCV") || "null");

        if (!selectedCV) {
            navigate("/candidate/account/mycvs");
            return;
        }

        const fetchRecommend = async () => {
            try {
                setLoading(true);

                const blob = await fetch(selectedCV.data).then((res) => res.blob());
                const formData = new FormData();
                formData.append("file", blob, selectedCV.name);

                const res = await fetch("http://localhost:8000/recommend", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();
                setResults(data);
            } catch (err) {
                console.error("Lỗi khi gọi API Recommend:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommend();
    }, [navigate]);

    // ==============================
    // 2) Khi đổi trang → fetch detail của 5 job
    // ==============================
    useEffect(() => {
        if (!results) return;

        const start = (page - 1) * limit;
        const currentJobs = results.recommendations.slice(start, start + limit);

        const fetchDetails = async () => {
            try {
                const detailPromises = currentJobs.map((job) =>
                    getJobDetail(job.id).catch(() => null)
                );

                const detailedList = await Promise.all(detailPromises);
                setPageJobsDetail(detailedList.filter(Boolean));
            } catch (e) {
                console.error("Lỗi load detail:", e);
            }
        };

        fetchDetails();
    }, [page, results]);

    // ==============================
    // 3) Render
    // ==============================
    if (loading) return <p className={styles.loading}>Đang phân tích CV...</p>;
    if (!results) return null;

    const totalJobs = results.recommendations.length;
    const totalPages = Math.ceil(totalJobs / limit);

    const goJobDetail = (id) => navigate(`/candidate/job/${id}`);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Gợi ý việc làm</h2>

            <h3 className={styles.sectionTitle}>Kỹ năng tìm thấy:</h3>
            <div className={styles.skills}>{results.skills_found.join(", ")}</div>

            <h3 className={styles.sectionTitle}>
                Danh sách việc làm phù hợp ({totalJobs})
            </h3>

            <div className={styles.jobList}>
                {pageJobsDetail.map((job) => (
                    <JobCard
                        key={job._id}
                        job={{
                            id: job._id,
                            title: job.title,
                            company: job.company || "Công ty đang cập nhật",
                            salary: job.salary_raw || "Thoả thuận",
                            location: job.location?.name || "Không rõ",
                        }}
                        isFavorite={false}
                        onToggleFavorite={() => {}}
                        onClick={() => goJobDetail(job._id)}
                    />
                ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
    );
}
