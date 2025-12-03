import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./RecommendJobs.module.scss";
import JobCard from "@/views/candidates/components/JobCard/JobCard.jsx";
import Pagination from "@/components/common/Pagination/Pagination.jsx";
import { getJobDetail } from "@/api/jobService";

export default function RecommendJobs() {
    const [loading] = useState(false);
    const [results, setResults] = useState(null);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const cv = location.state?.cv;
    const [pageJobsDetail, setPageJobsDetail] = useState([]);
    const limit = 5;

    // Gọi API /recommend
    useEffect(() => {
        if (!cv) {
        navigate("/candidate/account/mycvs");
        return;
        }

        const fetchRecommend = async () => {
        const res = await fetch(cv.url); // cv.url từ DB
        const blob = await res.blob();

        const formData = new FormData();
        formData.append("file", blob, cv.name);

        const recommendRes = await fetch("http://localhost:8000/recommend", {
            method: "POST",
            body: formData,
        });

        const data = await recommendRes.json();
        setResults(data);
        };

        fetchRecommend();
    }, [cv, navigate]);

    // Khi đổi trang → fetch detail của 5 job
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

    // Render
    if (loading) return <p className={styles.loading}>Đang phân tích CV...</p>;
    if (!results) return null;

    const totalJobs = results.recommendations.length;
    const totalPages = Math.ceil(totalJobs / limit);

    const goJobDetail = (id) => navigate(`/job/${id}`);

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
