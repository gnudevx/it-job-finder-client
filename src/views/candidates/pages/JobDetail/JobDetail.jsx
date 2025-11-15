import React from "react";
import { useParams } from "react-router-dom";
import { mockJobList } from "@/models/mockJobList";
import styles from "./JobDetail.module.scss";
import useFavorites from "@/hooks/useFavorites";

export default function JobDetail() {
    const { id } = useParams();
    const { toggleFavorite, isFavorite } = useFavorites();

    const job = mockJobList.find((j) => j.id === Number(id));

    if (!job) return <div>Không tìm thấy tin tuyển dụng.</div>;

    return (
        <div className={styles.container}>
            <div className={styles.titleRow}>
                <h1>{job.title}</h1>

                <button
                    className={styles.favBtn}
                    onClick={() => toggleFavorite(job.id)}
                >
                    {isFavorite(job.id) ? "💖 Bỏ lưu" : "🤍 Lưu việc"}
                </button>
            </div>

            <div className={styles.deadline}>Hạn nộp hồ sơ: {job.deadline}</div>

            <section>
                <h2>Mô tả công việc</h2>
                <ul>
                    {job.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Yêu cầu ứng viên</h2>
                <ul>
                    {job.requirements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Quyền lợi</h2>
                <ul>
                    {job.benefits.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Địa điểm làm việc</h2>
                {job.work_location_detail.map((loc, idx) => (
                    <p key={idx}>{loc}</p>
                ))}
            </section>

            <section>
                <h2>Thời gian làm việc</h2>
                {job.working_time.map((t, idx) => (
                    <p key={idx}>{t}</p>
                ))}
            </section>

            <section>
                <h2>Cách thức ứng tuyển</h2>
                <p>{job.applyGuide}</p>
            </section>

            <button className={styles.applyBtn}>Ứng tuyển ngay</button>
        </div>
    );
}
