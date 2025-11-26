import React from "react";
import styles from "./TopPointCard.module.scss";
import PropTypes from "prop-types";

export default function TopPointCard({ tpPoint, onExchange, onMission }) {
    return (
        <div className={styles.card}>
            <h3>Top Point (TP)</h3>
            <p className={styles.subtitle}>Điểm tích lũy đổi quà</p>

            <div className={styles.value}>
                <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="coin" />
                <span>{tpPoint}</span>
            </div>

            <div className={styles.actions}>
                <button onClick={onExchange}>Đổi quà</button>
                <button className={styles.secondary} onClick={onMission}>
                    Xem nhiệm vụ
                </button>
            </div>
        </div>
    );
}

TopPointCard.propTypes = {
    tpPoint: PropTypes.number.isRequired,
    onExchange: PropTypes.func,
    onMission: PropTypes.func,
};
