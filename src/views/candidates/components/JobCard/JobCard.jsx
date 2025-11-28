import React from "react";
import PropTypes from "prop-types";
import { Heart } from "lucide-react";
import styles from "./JobCard.module.scss";

export default function JobCard({
    job,
    isFavorite,
    onToggleFavorite,
    onClick
}) {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.topRow}>
                <img src="/logo192.png" alt={job.company} className={styles.logo} />

                {/* Luôn hiển thị nút tim */}
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
            <div className={styles.companyRow}>
                <div className={styles.company}>{job.company}</div>

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
                <span className={styles.salary}>{job.salary}</span>
                <span className={styles.location}>{job.location}</span>
            </div>
        </div>
    );
}

JobCard.propTypes = {
    job: PropTypes.object.isRequired,
    isFavorite: PropTypes.bool,
    onToggleFavorite: PropTypes.func,
    onClick: PropTypes.func
};
