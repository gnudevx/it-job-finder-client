import React from "react";
import PropTypes from "prop-types";
import { Heart, HeartOff } from "lucide-react";
import styles from "./JobCard.module.scss";

export default function JobCard({
    job,
    isFavorite,
    onToggleFavorite,
    onClick,
    authToken
}) {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.topRow}>
                <img src="/logo192.png" alt={job.company} className={styles.logo} />

                {/* CHỈ CHO LOGIN USER BẤM TIM */}
                {authToken && (
                    <button
                        className={styles.favoriteBtn}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(job.id);
                        }}
                    >
                        {isFavorite ? (
                            <HeartOff size={20} color="red" />
                        ) : (
                            <Heart size={20} />
                        )}
                    </button>
                )}
            </div>

            <div className={styles.title}>{job.title}</div>
            <div className={styles.company}>{job.company}</div>

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
    onClick: PropTypes.func,
    authToken: PropTypes.string
};
