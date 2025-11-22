import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./JobDetail.module.scss";
import useFavorites from "@/hooks/useFavorites";
import { getJobDetail } from "@/api/jobService";

export default function JobDetail() {
    const { id } = useParams();

    // Lấy authToken từ localStorage
    const authToken = localStorage.getItem("authToken");

    // Truyền token vào hook
    const { toggleFavorite, isFavorite } = useFavorites(authToken);

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    // ============ APPLY STATE (đưa lên trên!) ===============
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [selectedCV, setSelectedCV] = useState("");
    const [note, setNote] = useState("");

    const defaultCVs = [
        { id: 1, name: "CV_Default_1.pdf" },
        { id: 2, name: "CV_Default_2.pdf" },
    ];

    const [myCVs] = useState(() => {
        const stored = JSON.parse(localStorage.getItem("myCVs") || "[]");
        return stored.length > 0 ? stored : defaultCVs;
    });

    useEffect(() => {
        localStorage.setItem("myCVs", JSON.stringify(myCVs));
    }, [myCVs]);


    // ============ FETCH JOB ============
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await getJobDetail(id);

                const formatted = {
                    id: data._id,
                    title: data.title,
                    deadline: data.deadline,
                    description: data.description,
                    requirements: Array.isArray(data.requirements)
                        ? data.requirements.join("\n")
                        : data.requirements,
                    benefits: Array.isArray(data.benefits)
                        ? data.benefits.join("\n")
                        : data.benefits,
                    work_location_detail: data.work_location_detail,
                    working_time: data.working_time,
                    link: data.link,
                };

                setJob(formatted);
            } catch (error) {
                console.error("Lỗi tải job:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);


    // ====== RETURN SECTION ======
    if (loading) return <div>Đang tải...</div>;
    if (!job) return <div>Không tìm thấy tin tuyển dụng.</div>;

    const { title, deadline, description, requirements, benefits, work_location_detail, working_time, link } = job;

    // applied
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
    const hasApplied = appliedJobs.some((j) => j.jobId === id);

    const handleSubmitApplication = () => {
        if (!selectedCV) {
            alert("Vui lòng chọn CV để ứng tuyển!");
            return;
        }

        const newApplied = [
            ...appliedJobs,
            {
                jobId: id,
                title: job.title,
                cv: selectedCV,
                note,
                date: new Date().toISOString(),
            },
        ];

        localStorage.setItem("appliedJobs", JSON.stringify(newApplied));

        alert("Ứng tuyển thành công!");
        setShowApplyForm(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleRow}>
                <h1>{title}</h1>

                {authToken && (
                    <button
                        className={styles.favBtn}
                        onClick={() => toggleFavorite(id)}
                    >
                        {isFavorite(id) ? "💖 Bỏ lưu" : "🤍 Lưu việc"}
                    </button>
                )}
            </div>

            <div className={styles.deadline}>Hạn nộp hồ sơ: {deadline}</div>

            <section>
                <h2>Mô tả công việc</h2>
                <ul>
                    {(description || "").split("\n").map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Yêu cầu ứng viên</h2>
                <ul>
                    {(requirements || "").split("\n").map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Quyền lợi</h2>
                <ul>
                    {(benefits || "").split("\n").map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Địa điểm làm việc</h2>
                {(work_location_detail || "").split("\n").map((loc, idx) => (
                    <p key={idx}>{loc}</p>
                ))}
            </section>

            <section>
                <h2>Thời gian làm việc</h2>
                {(working_time || "").split("\n").map((t, idx) => (
                    <p key={idx}>{t}</p>
                ))}
            </section>

            <section>
                <h2>Link gốc</h2>
                <a href={link} target="_blank" rel="noreferrer">
                    Mở bài đăng trên TopCV
                </a>
            </section>

            <button
                className={styles.applyBtn}
                disabled={hasApplied}
                onClick={() => !hasApplied && setShowApplyForm(true)}
            >
                {hasApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
            </button>

            {showApplyForm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Ứng tuyển: {title}</h2>

                        <label>Chọn CV</label>
                        <select
                            className={styles.select}
                            value={selectedCV}
                            onChange={(e) => setSelectedCV(e.target.value)}
                        >
                            <option value="">-- Chọn CV --</option>
                            {myCVs.map((cv) => (
                                <option key={cv.id} value={cv.name}>
                                    {cv.name}
                                </option>
                            ))}
                        </select>

                        <label>Ghi chú</label>
                        <textarea
                            className={styles.textarea}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />

                        <div className={styles.modalActions}>
                            <button className={styles.submitBtn} onClick={handleSubmitApplication}>
                                Nộp hồ sơ
                            </button>
                            <button className={styles.cancelBtn} onClick={() => setShowApplyForm(false)}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}