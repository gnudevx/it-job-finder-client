import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { mockJobList } from "@/models/jobs/mockJobList";
import styles from "./JobDetail.module.scss";
import useFavorites from "@/hooks/useFavorites";

export default function JobDetail() {
    const { id } = useParams();
    const { toggleFavorite, isFavorite } = useFavorites();

    const job = mockJobList.find((j) => j.id === Number(id));
    if (!job) return <div>Không tìm thấy tin tuyển dụng.</div>;

    // ------- Apply states -------
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [selectedCV, setSelectedCV] = useState(null);
    const [note, setNote] = useState("");

    // Lấy danh sách CV
    const storedCVs = JSON.parse(localStorage.getItem("myCVs") || "[]");
    const myCVs =
        storedCVs.length === 0
            ? [
                  { id: 1, name: "CV_Default_1.pdf" },
                  { id: 2, name: "CV_Default_2.pdf" },
              ]
            : storedCVs;

    if (storedCVs.length === 0) {
        localStorage.setItem("myCVs", JSON.stringify(myCVs));
    }

    // -----------------------------
    // Kiểm tra job đã ứng tuyển chưa
    // -----------------------------
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
    const hasApplied = appliedJobs.some((j) => j.jobId === job.id);

    const handleSubmitApplication = () => {
        if (!selectedCV) {
            alert("Vui lòng chọn CV để ứng tuyển!");
            return;
        }

        const newAppliedJobs = [
            ...appliedJobs,
            {
                jobId: job.id,
                title: job.title,
                cv: selectedCV,
                note,
                date: new Date().toISOString(),
            },
        ];

        localStorage.setItem("appliedJobs", JSON.stringify(newAppliedJobs));

        alert("Ứng tuyển thành công!");
        setShowApplyForm(false);
    };

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

            <div className={styles.deadline}>
                Hạn nộp hồ sơ: {job.deadline}
            </div>

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

            {/* ======================== */}
            {/* BUTTON ỨNG TUYỂN */}
            {/* ======================== */}
            <button
                className={styles.applyBtn}
                disabled={hasApplied}
                onClick={() => !hasApplied && setShowApplyForm(true)}
            >
                {hasApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
            </button>

            {/* ======================== */}
            {/* APPLY POPUP */}
            {/* ======================== */}
            {showApplyForm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Ứng tuyển: {job.title}</h2>

                        {/* Chọn CV */}
                        <label>Chọn CV để ứng tuyển</label>
                        <select
                            value={selectedCV || ""}
                            className={styles.select}
                            onChange={(e) => setSelectedCV(e.target.value)}
                        >
                            <option value="">-- Chọn CV --</option>
                            {myCVs.map((cv) => (
                                <option key={cv.id} value={cv.name}>
                                    {cv.name}
                                </option>
                            ))}
                        </select>

                        {/* Ghi chú */}
                        <label>Ghi chú (không bắt buộc):</label>
                        <textarea
                            className={styles.textarea}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Ví dụ: Tôi có thể bắt đầu công việc ngay..."
                        />

                        <div className={styles.modalActions}>
                            <button
                                className={styles.submitBtn}
                                onClick={handleSubmitApplication}
                            >
                                Nộp hồ sơ ứng tuyển
                            </button>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => setShowApplyForm(false)}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
