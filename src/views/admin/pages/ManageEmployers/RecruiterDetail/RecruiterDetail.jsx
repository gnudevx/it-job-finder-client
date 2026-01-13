import React, { useState } from "react";
import {
    ArrowLeft,
    Sparkles,
    TrendingUp,
    ShieldAlert,
} from "lucide-react";
import styles from "./RecruiterDetail.module.scss";
import PropTypes from "prop-types";
import logo from "@/assets/logo.jpg";
import employerService from "@api/adminEmployer.js";

import ChangePasswordModal from "./ChangePasswordModal";
export default function RecruiterDetail({ recruiter, onBack, onStatusChange }) {
    const [analysis, setAnalysis] = useState(null);
    const [analyzing,] = useState(false);
    async function handleUpdateStatus(employerId, newStatus) {
        if (!confirm(`Bạn có chắc muốn đổi trạng thái thành ${newStatus}?`)) return;

        try {
            await employerService.updateEmployerStatus(employerId, { status: newStatus });
            alert(`Đã cập nhật trạng thái thành công!`);

            // Báo cho component cha cập nhật state
            onStatusChange(employerId, newStatus);
        } catch (err) {
            alert("Lỗi: " + err.response?.data?.message);
        }
    }
    const [showChangePassword, setShowChangePassword] = useState(false);
    // const handleAnalyze = async () => {
    //     setAnalyzing(true);
    //     try {
    //         const result = await analyzeRecruiterProfile(recruiter);
    //         setAnalysis(result);
    //     } catch (e) {
    //         alert("Lỗi khi phân tích. Vui lòng kiểm tra API Key.");
    //     } finally {
    //         setAnalyzing(false);
    //     }
    // };
    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.headerRow}>
                <button onClick={onBack} className={styles.backButton}>
                    <ArrowLeft className={styles.backIcon} />
                </button>
                <h2 className={styles.pageTitle}>Hồ sơ nhà tuyển dụng</h2>
            </div>

            {/* Top card */}
            <div className={styles.topCard}>
                <div className={styles.topCardRow}>
                    <div className={styles.companyInfoRow}>
                        <img
                            src={logo}
                            alt={recruiter.companyName}
                            className={styles.companyLogo}
                        />

                        <div>
                            <h3 className={styles.companyName}>{recruiter.companyName}</h3>

                            <div className={styles.joinInfo}>
                                <span>Tham gia: {recruiter.joinedDate}</span>
                                <span>•</span>
                                <span>ID: {recruiter.id}</span>
                            </div>

                            <div className={styles.badgeRow}>
                                <span
                                    className={
                                        recruiter.status === "ACTIVE"
                                            ? styles.statusActive
                                            : styles.statusInactive
                                    }
                                >
                                    {recruiter.status}
                                </span>

                                <span className={styles.tierBadge}>{recruiter.tier} Plan</span>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className={styles.actionColumn}>
                        <div className={styles.actionRow}>
                            <button
                                className={styles.btnPrimary}
                                onClick={() => setShowChangePassword(true)}
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                        {showChangePassword && (
                            <ChangePasswordModal
                                recruiter={recruiter}
                                onClose={() => setShowChangePassword(false)}
                            />
                        )}
                        {recruiter.status === "ACTIVE" ? (
                            <button
                                className={styles.btnDanger}
                                onClick={() => handleUpdateStatus(recruiter.id, "inactive")}
                            >
                                Khóa tài khoản
                            </button>
                        ) : (
                            <button
                                className={styles.btnSuccess}
                                onClick={() => handleUpdateStatus(recruiter.id, "active")}
                            >
                                Mở khóa tài khoản
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.mainGrid}>
                {/* Left Column */}
                <div className={styles.leftCol}>
                    {/* Contact Info */}
                    <div className={styles.card}>
                        <h4 className={styles.cardTitle}>Thông tin liên hệ</h4>

                        <div className={styles.infoGrid}>
                            <div>
                                <span className={styles.label}>Người liên hệ</span>
                                <span className={styles.value}>{recruiter.contactName}</span>
                            </div>

                            <div>
                                <span className={styles.label}>Email</span>
                                <span className={styles.value}>{recruiter.email}</span>
                            </div>

                            <div>
                                <span className={styles.label}>Điện thoại</span>
                                <span className={styles.value}>{recruiter.phone}</span>
                            </div>

                            <div>
                                <span className={styles.label}>Số dư tin đăng</span>
                                <span className={styles.creditBalance}>
                                    {recruiter.remaining}
                                </span>
                            </div>

                            <div className={styles.descFull}>
                                <span className={styles.label}>Mô tả</span>
                                <p className={styles.description}>{recruiter.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Job list */}
                    <div className={styles.jobCard}>
                        <div className={styles.jobHeader}>
                            <h4 className={styles.cardTitle}>Tin tuyển dụng gần đây</h4>
                            <button className={styles.viewAllBtn}>Xem tất cả</button>
                        </div>

                        <div className={styles.tableWrapper}>
                            <table className={styles.jobTable}>
                                <thead>
                                    <tr>
                                        <th>Tiêu đề tin </th>
                                        <th>Ngày đăng </th>
                                        <th>Lượt xem tin</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recruiter.jobs.length > 0 ? (
                                        recruiter.jobs.map((job) => (
                                            <tr key={job.id}>
                                                <td>{job.title}</td>
                                                <td>{job.postedDate}</td>
                                                <td>{job.views}</td>
                                                <td>
                                                    <span
                                                        className={
                                                            job.status === "Open"
                                                                ? styles.jobStatusOpen
                                                                : styles.jobStatusClosed
                                                        }
                                                    >
                                                        {job.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className={styles.emptyJob}>
                                                Chưa có tin tuyển dụng nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column — AI Analysis */}
                <div className={styles.aiCol}>
                    <div className={styles.aiCard}>
                        <div className={styles.sparkleBg}>
                            <Sparkles className={styles.sparkleLarge} />
                        </div>

                        <div className={styles.aiContent}>
                            <h4 className={styles.aiTitle}>
                                <Sparkles className={styles.aiIcon} />
                                Gemini AI Phân tích
                            </h4>

                            {/* Not analyzed yet */}
                            {!analysis ? (
                                <div className={styles.aiInitial}>
                                    <p className={styles.aiDesc}>
                                        Sử dụng AI để đánh giá độ uy tín, phát hiện rủi ro và nhận
                                        đề xuất quản lý cho nhà tuyển dụng này.
                                    </p>

                                    <button
                                        // onClick={handleAnalyze}
                                        className={styles.aiBtn}
                                        disabled={analyzing}
                                    >
                                        {analyzing ? (
                                            <>
                                                <div className={styles.spinner}></div>
                                                Đang phân tích...
                                            </>
                                        ) : (
                                            "Phân tích ngay"
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.aiResult}>
                                    {/* Score */}
                                    <div className={styles.scoreBox}>
                                        <span className={styles.scoreLabel}>Điểm uy tín</span>

                                        <span
                                            className={
                                                analysis.score > 80
                                                    ? styles.scoreGood
                                                    : analysis.score > 50
                                                        ? styles.scoreWarn
                                                        : styles.scoreBad
                                            }
                                        >
                                            {analysis.score}/100
                                        </span>
                                    </div>

                                    {/* Summary */}
                                    <div>
                                        <span className={styles.sectionTitle}>Tóm tắt</span>
                                        <p className={styles.summary}>{analysis.summary}</p>
                                    </div>

                                    {/* Risks */}
                                    {analysis.risks.length > 0 && (
                                        <div className={styles.riskBox}>
                                            <span className={styles.riskTitle}>
                                                <ShieldAlert className={styles.riskIcon} />
                                                Rủi ro tiềm ẩn
                                            </span>

                                            <ul className={styles.riskList}>
                                                {analysis.risks.map((risk, i) => (
                                                    <li key={i}>{risk}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Recommendations */}
                                    <div>
                                        <span className={styles.sectionTitle}>
                                            Đề xuất cho Admin
                                        </span>

                                        <ul className={styles.recommendList}>
                                            {analysis.recommendations.map((rec, i) => (
                                                <li key={i} className={styles.recommendItem}>
                                                    <TrendingUp className={styles.recommendIcon} />
                                                    <span>{rec}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button className={styles.reanalyzeBtn} onClick={() => setAnalysis(null)}>
                                        Phân tích lại
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
RecruiterDetail.propTypes = {
    recruiter: PropTypes.shape({
        id: PropTypes.string.isRequired,
        logoUrl: PropTypes.string,
        companyName: PropTypes.string,
        industry: PropTypes.string,
        joinedDate: PropTypes.string,
        status: PropTypes.string,
        tier: PropTypes.string,
        userId: PropTypes.string.isRequired,
        contactName: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,

        creditBalance: PropTypes.number,
        description: PropTypes.string,
        remaining: PropTypes.string,
        jobs: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                title: PropTypes.string,
                level: PropTypes.string,
                salary: PropTypes.string,
            })
        ),
    }).isRequired,

    onBack: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
};