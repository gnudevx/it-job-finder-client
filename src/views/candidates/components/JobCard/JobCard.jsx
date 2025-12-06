import React from "react";
import PropTypes from "prop-types";
import { Heart } from "lucide-react";
import styles from "./JobCard.module.scss";

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
            <div className={styles.topRow}>
                <img
                    src="/logo192.png"
                    className={styles.logo}
                />

                <button
                    className={styles.favoriteBtn}
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

            <div className={styles.title}>{job.title}</div>
                {showStatusAndUpdate && (
                    <div className={styles.statusUpdate}>
                        <p className={styles.status}>
                        Trạng thái: <strong>{STATUS_LABELS[job.status] || "Không rõ"}</strong>
                        </p>
                        <p className={styles.updatedAt}>
                        Cập nhật gần nhất:{" "}
                        <strong>{new Date(job.updatedAt).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}</strong>
                        </p>
                    </div>
                )}

            <div className={styles.groupRow}>
                <div className={styles.group}>{job.group}</div>

                {job.createdAt && (
                    <div className={styles.postDate}>
                        Ngày đăng:{" "}
                        <strong>
                            {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                        </strong>
                    </div>
                )}
            </div>

            <div className={styles.meta}>
                <span className={styles.salary}>Lương: {formatSalary(job.salary)}</span>
                <span className={styles.location}>{job.location}</span>
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
