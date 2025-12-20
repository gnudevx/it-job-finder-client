import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./JobDetail.module.scss";
import useFavorites from "@/hooks/useFavorites";
import useApplyJob from "@/hooks/useApplyJob";
import { getJobDetail } from "@/api/jobService";
import salary from "@assets/salary.svg";
import location from "@assets/location.svg";
import experience from "@assets/experience.svg";
import companyService from "@/api/companyService";

export default function JobDetail() {
    const COMPANY_SIZE_MAP = {
        small: 'Dưới 50 nhân viên',
        medium: '50–199 nhân viên',
        large: '200+ nhân viên',
    };

    const { id } = useParams();
    const authToken = localStorage.getItem("authToken");
    const { toggleFavorite, isFavorite } = useFavorites(authToken);

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const [company, setCompany] = useState(null);
    const [loadingCompany, setLoadingCompany] = useState(true);

    // APPLY FORM
    const [showApplyForm, setShowApplyForm] = useState(false);

    const {
        myCVs,
        hasApplied,
        selectedCV,
        setSelectedCV,
        note,
        setNote,
        submitApplication,
    } = useApplyJob(id, authToken);

    // Fetch job
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await getJobDetail(id);

                const formatted = {
                    id: data._id,
                    title: data.title,
                    deadline: data.applicationDeadline,
                    jobDescription: data.jobDescription,
                    salary: data.salary_raw,
                    requirements: Array.isArray(data.requirements)
                        ? data.requirements.join("\n")
                        : data.requirements,
                    benefits: Array.isArray(data.benefits)
                        ? data.benefits.join("\n")
                        : data.benefits,
                    location: data.location?.name,
                    employer_id: data.employer_id,
                    experience: data.experience,
                    work_location_detail: data.work_location_detail,
                    working_time: data.working_time,
                    link: data.link,
                    level: data.level,
                    education: data.education,
                    quantity: data.quantity,
                    jobType: data.jobType,
                    createdAt: data.createdAt,
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

    useEffect(() => {
        if (!job?.employer_id) return;

        const fetchCompany = async () => {
            try {
                const res = await companyService.getCompanyPublic(job.employer_id);

                if (res.success) {
                    setCompany(res.data);
                }
            } catch (err) {
                console.error("Lỗi tải company:", err);
            } finally {
                setLoadingCompany(false);
            }
        };

        fetchCompany();
    }, [job?.employer_id]);

    if (loading) return <div>Đang tải...</div>;
    if (!job) return <div>Không tìm thấy tin tuyển dụng.</div>;

    const { title, deadline, jobDescription, requirements, benefits, 
        work_location_detail, working_time, link, level, education, quantity, jobType, createdAt  } = job;

    const handleSubmitApplication = async () => {
        const ok = await submitApplication();
        if (ok) {
            alert("Ứng tuyển thành công!");
            setShowApplyForm(false);
        } else {
            alert("Ứng tuyển thất bại!");
        }
    };

    return (
        <div className={styles.pageContainer}>
            {/* LEFT CONTENT */}
            <div className={styles.leftColumn}>
                <div className={styles["main-detail"]}>
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

                    <div className={styles.quickDetail}>
                        <div>
                            <img src={salary} className={styles["icon"]}></img>
                            <p>Lương<br />{job.salary}</p>
                        </div>
                        <div>
                            <img src={location} className={styles["icon"]}></img>
                            <p>Địa điểm<br />{job.location}</p>
                        </div>
                        <div>
                            <img src={experience} className={styles["icon"]}></img>
                            <p>Kinh nghiệm<br />{job.experience} năm</p>
                        </div>
                    </div>

                    <div className={styles["job-date"]}>
                        <p className={styles.postDate}>
                            Ngày đăng: <strong>{new Date(createdAt).toLocaleDateString("vi-VN")}</strong>
                        </p>

                        <p className={styles.deadline}>
                            Hạn nộp hồ sơ: <strong>{new Date(deadline).toLocaleDateString("vi-VN")}</strong>
                        </p>
                    </div>
                </div>

                <button
                    className={styles.applyBtn}
                    disabled={hasApplied}
                    onClick={() => {
                        if (!authToken) {
                            alert("Vui lòng đăng nhập để sử dụng chức năng ứng tuyển!");
                            return;
                        }
                        if (!hasApplied) setShowApplyForm(true);
                    }}
                >
                    {hasApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
                </button>

                <section className={styles.section}>
                    <h2>Mô tả công việc</h2>
                    <ul>
                        {(jobDescription || "").split("\n").map((item, idx) => (
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
            </div>

            {/* RIGHT SIDEBAR */}
            <div className={styles.rightColumn}>
                <div className={styles.companyInfo}>
                    {!loadingCompany && company && (
                        <>
                            <div className={styles.companyTop}>
                                <img
                                    src={company.logo || ""}
                                    alt={company.name}
                                    onError={(e) => {
                                        e.target.src = "";
                                    }}
                                />
                                <div className={styles.companyName}>
                                    <a
                                        href={`/company/${company._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {company.name}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.companyBottom}>
                                <div className={styles.companyInfoList}>
                                    <div className={styles.companyItem}>
                                        <div className={styles.companyItemIcon}>👥</div>
                                        <div className={styles.companyItemText}>
                                            <span className={styles.companyItemTitle}>Quy mô:</span>
                                            <span className={styles.companyItemValue}>
                                                {COMPANY_SIZE_MAP[company.size] || "Đang cập nhật"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.companyItem}>
                                        <div className={styles.companyItemIcon}>📦</div>
                                        <div className={styles.companyItemText}>
                                            <span className={styles.companyItemTitle}>Lĩnh vực:</span>
                                            <span className={styles.companyItemValue}>
                                                {company.field || company.industry || "Đang cập nhật"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.companyItem}>
                                        <div className={styles.companyItemIcon}>📍</div>
                                        <div className={styles.companyItemText}>
                                            <span className={styles.companyItemTitle}>Địa điểm:</span>
                                            <span className={styles.companyItemValue}>
                                                {company.address || "Đang cập nhật"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
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
                                <option key={cv.id} value={cv.id}> {/* value = _id */}
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
