import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecommendJobs.module.scss";

export default function RecommendJobs() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const navigate = useNavigate();

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
                console.error("Error during recommend:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommend();
    }, [navigate]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Gợi ý việc làm</h2>

            {loading && <p className={styles.loading}>Đang phân tích CV...</p>}

            {!loading && results && (
                <>
                    <h3 className={styles.sectionTitle}>Kỹ năng tìm thấy:</h3>
                    <div className={styles.skills}>
                        {results.skills_found.join(", ")}
                    </div>

                    <h3 className={styles.sectionTitle}>Top việc làm phù hợp:</h3>
                    <ul className={styles.jobList}>
                        {results.recommendations.map((job) => (
                            <li className={styles.jobItem} key={job.title}>
                                <div className={styles.jobTitle}>{job.title}</div>
                                <div className={styles.jobScore}>
                                    match: {job.score.toFixed(3)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
