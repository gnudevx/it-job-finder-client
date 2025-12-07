import React from "react";
import PropTypes from "prop-types";
import styles from "./JobCard.module.scss";
import {
    Heart,
    MapPin,
    DollarSign,
    Calendar,
    Building2
} from "lucide-react";

export default function JobCard({
    job,
    isFavorite,
    onToggleFavorite,
    onClick,
    showStatusAndUpdate
}) {
    const STATUS_LABELS = {
        applied: "Đã ứng tuyển",
        reviewed: "Phù hợp",
        interviewing: "Hẹn phỏng vấn",
        hired: "Nhận việc",
        rejected: "Chưa phù hợp"
    };

    const formatSalary = (salaryStr) => {
        if (!salaryStr) return "";
        return salaryStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.topLine}></div>

            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.logoWrapper}>
                        <img
                            src={job.logo || "/logo192.png"}
                            alt={job.company}
                            className={styles.logo}
                        />
                    </div>

                    <div>
                        <h3 className={styles.title}>{job.title}</h3>

                        <div className={styles.companyRow}>
                            <Building2 size={14} className={styles.companyIcon} />
                            <span className={styles.companyName}>
                                {job.company || "Công ty không xác định"}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    className={styles.favButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(job.id);
                    }}
                >
                    <Heart
                        size={20}
                        fill={isFavorite ? "red" : "none"}
                        color={isFavorite ? "red" : "black"}
                    />
                </button>
            </div>

            <div className={styles.body}>
                <div className={styles.salaryBox}>
                    <DollarSign size={14} className={styles.salaryIcon} />
                    {formatSalary(job.salary)}
                </div>

                <div className={styles.locationRow}>
                    <MapPin size={16} className={styles.locationIcon} />
                    {job.location}
                </div>

                {job.tags && (
                    <div className={styles.tags}>
                        {job.tags.map((tag, i) => (
                            <span key={i} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                )}
            </div>

            {showStatusAndUpdate && (
                <div className={styles.statusUpdate}>
                    <p className={styles.status}>
                        Trạng thái: <strong>{STATUS_LABELS[job.status] || "Không rõ"}</strong>
                    </p>
                    <p className={styles.updatedAt}>
                        Cập nhật:{" "}
                        <strong>
                            {new Date(job.updatedAt).toLocaleString("vi-VN", {
                                timeZone: "Asia/Ho_Chi_Minh"
                            })}
                        </strong>
                    </p>
                </div>
            )}

            <div className={styles.footer}>
                <div className={styles.dateRow}>
                    <Calendar size={14} className={styles.dateIcon} />
                    {job.createdAt && (
                        <>
                            Ngày đăng:{" "}
                            <strong>
                                {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                            </strong>
                        </>
                    )}
                </div>

                <button className={styles.applyButton}>Ứng tuyển ngay</button>
            </div>
        </div>
    );
}

JobCard.propTypes = {
    job: PropTypes.object.isRequired,
    isFavorite: PropTypes.bool,
    onToggleFavorite: PropTypes.func,
    onClick: PropTypes.func,
    showStatusAndUpdate: PropTypes.bool
};
