import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./JobDetail.module.scss";
import useFavorites from "@/hooks/useFavorites";
import { getJobDetail } from "@/api/jobService";

export default function JobDetail() {
    const mockCompany = {
    name: "CÔNG TY TNHH TMDV ADFLY VIỆT NAM",
    logo: "https://cdn-new.topcv.vn/unsafe/80x/https://static.topcv.vn/company_logos/1g3gyTtHdfyN9ndE5aLL3F15xIWW7hLb_1659587053____814dcd7883821b4807a29497c20ef6d1.jpg",
    scale: "100-499 nhân viên",
    field: "Khác",
    address:
        "Tầng 2, tòa nhà TSA Building số 53-55-57 Phó Đức Chính, Phường Nguyễn Thái Bình, Quận 1, TPHCM",
    link: "#",
    };

    const { id } = useParams();
    const authToken = localStorage.getItem("authToken");
    const { toggleFavorite, isFavorite } = useFavorites(authToken);

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    // APPLY FORM
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

    // Fetch job
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
                    level: data.level,
                    education: data.education,
                    quantity: data.quantity,
                    jobType: data.jobType,
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

    if (loading) return <div>Đang tải...</div>;
    if (!job) return <div>Không tìm thấy tin tuyển dụng.</div>;

    const { title, deadline, description, requirements, benefits, 
        work_location_detail, working_time, link, level, education, quantity, jobType  } = job;

    // Check applied
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
        <div className={styles.pageContainer}>
            {/* ================== LEFT CONTENT ================== */}
            <div className={styles.leftColumn}>
                <div className={styles.jobHeader}>
                    <h1 className={styles.title}>{title}</h1>

                    {authToken && (
                        <button
                            className={styles.favoriteBtn}
                            onClick={() => toggleFavorite(id)}
                        >
                            {isFavorite(id) ? "💖 Bỏ lưu" : "🤍 Lưu việc"}
                        </button>
                    )}
                </div>

                <p className={styles.deadline}>
                    Hạn nộp hồ sơ: <strong>{deadline}</strong>
                </p>

                <section className={styles.section}>
                    <h2>Mô tả công việc</h2>
                    <ul>
                        {(description || "").split("\n").map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Yêu cầu ứng viên</h2>
                    <ul>
                        {(requirements || "").split("\n").map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Quyền lợi</h2>
                    <ul>
                        {(benefits || "").split("\n").map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </section>

                <button
                    className={styles.applyBtn}
                    disabled={hasApplied}
                    onClick={() => !hasApplied && setShowApplyForm(true)}
                >
                    {hasApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
                </button>
            </div>

            {/* ================== RIGHT SIDEBAR ================== */}
            <div className={styles.rightColumn}>
                <div className={styles.companyInfo}>
                    <div className={styles.companyTop}>
                        <img src={mockCompany.logo} alt={mockCompany.name} />
                        <div className={styles.companyName}>
                            <a href={mockCompany.link}>{mockCompany.name}</a>
                        </div>
                    </div>

                    <div className={styles.companyBottom}>
                        <div className={styles.companyInfoList}>
                            <div className={styles.companyItem}>
                                <div className={styles.companyItemIcon}>👥</div>
                                <div className={styles.companyItemText}>
                                    <span className={styles.companyItemTitle}>Quy mô:</span>
                                    <span className={styles.companyItemValue}>{mockCompany.scale}</span>
                                </div>
                            </div>

                            <div className={styles.companyItem}>
                                <div className={styles.companyItemIcon}>📦</div>
                                <div className={styles.companyItemText}>
                                    <span className={styles.companyItemTitle}>Lĩnh vực:</span>
                                    <span className={styles.companyItemValue}>{mockCompany.field}</span>
                                </div>
                            </div>

                            <div className={styles.companyItem}>
                                <div className={styles.companyItemIcon}>📍</div>
                                <div className={styles.companyItemText}>
                                    <span className={styles.companyItemTitle}>Địa điểm:</span>
                                    <span className={styles.companyItemValue}>{mockCompany.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.sidebarBox}>

                    <p><strong>Địa điểm làm việc:</strong></p>
                    {(work_location_detail || "").split("\n").map((loc, idx) => (
                        <p key={idx}>{loc}</p>
                    ))}
                    <p style={{ marginTop: "12px" }}>
                        <strong>Thời gian làm việc:</strong>
                    </p>

                    {/* Nếu là string (dạng cũ) */}
                    {typeof working_time === "string" && (
                        <p>{working_time}</p>
                    )}

                    {/* Nếu là object (dạng mới) */}
                    {typeof working_time === "object" && working_time !== null && (
                        <p>
                            {working_time.dayFrom} – {working_time.dayTo}:{" "}
                            {working_time.timeFrom} – {working_time.timeTo}
                        </p>
                    )}

                    <a href={link} target="_blank" rel="noreferrer" className={styles.sourceLink}>
                        Xem bài đăng trên TopCV
                    </a>
                </div>

                <div className={styles.generalBox}>
                    <div className={styles.generalTitle}>Thông tin chung</div>

                    <div className={styles.generalContent}>

                        <div className={styles.generalItem}>
                        <div className={styles.generalIcon}>🏷️</div>
                        <div>
                            <div className={styles.generalLabel}>Cấp bậc</div>
                            <div className={styles.generalValue}>{level}</div>
                        </div>
                        </div>

                        <div className={styles.generalItem}>
                        <div className={styles.generalIcon}>🎓</div>
                        <div>
                            <div className={styles.generalLabel}>Học vấn</div>
                            <div className={styles.generalValue}>{education}</div>
                        </div>
                        </div>

                        <div className={styles.generalItem}>
                        <div className={styles.generalIcon}>👥</div>
                        <div>
                            <div className={styles.generalLabel}>Số lượng tuyển</div>
                            <div className={styles.generalValue}>{quantity} người</div>
                        </div>
                        </div>

                        <div className={styles.generalItem}>
                        <div className={styles.generalIcon}>💼</div>
                        <div>
                            <div className={styles.generalLabel}>Hình thức làm việc</div>
                            <div className={styles.generalValue}>
                            {jobType === "fulltime" ? "Toàn thời gian" : "Bán thời gian"}
                            </div>
                        </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* ================== APPLY MODAL ================== */}
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
