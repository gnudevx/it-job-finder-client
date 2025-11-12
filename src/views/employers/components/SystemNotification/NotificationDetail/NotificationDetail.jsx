import React from "react";
import styles from "./NotificationDetail.module.scss";
import PropTypes from "prop-types";

export function NotificationDetail({ notification, onBack }) {
    if (!notification) return null;

    return (
        <div className={styles.detail}>
            <button className={styles.back} onClick={onBack}>← Quay lại</button>

            <h2 className={styles.title}>{notification.title}</h2>
            <div className={styles.date}>{notification.date}</div>

            <p className={styles.desc}>{notification.description}</p>
        </div>
    );
}

NotificationDetail.propTypes = {
    notification: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    }),
    onBack: PropTypes.func.isRequired,
};
