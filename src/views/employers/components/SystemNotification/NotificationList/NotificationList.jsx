import React, { useState, useEffect } from "react";
import { fetchNotifications } from "@/api/notificationApi";
import styles from "./NotificationList.module.scss";
import PropTypes from "prop-types";

export default function NotificationList({ onSelect }) {
    const [page, setPage] = useState(1);
    const [notifications, setNotifications] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        fetchNotifications(page, 10).then((res) => {
            setNotifications(res.data);
            setTotalPages(res.totalPages);
        });
    }, [page]);

    return (
        <div className={styles.list}>
            {notifications.map((n) => (
                <div key={n.id} className={styles.item}>
                    <div
                        className={`${styles.tag} ${n.type === "feature" ? styles.feature : styles.notice
                            }`}
                    >
                        {n.type === "feature" ? "Tính năng" : "Thông báo"}
                    </div>

                    <div className={styles.time}>{n.date}</div>

                    <div
                        className={styles.title}
                        onClick={() => onSelect && onSelect(n)}
                    >
                        {n.title}
                    </div>
                </div>
            ))}

            <div className={styles.pagination}>
                <button
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                    className={styles.pageButton}
                >
                    «
                </button>
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className={styles.pageButton}
                >
                    ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))
                    .map((num) => (
                        <button
                            key={num}
                            className={`${styles.pageButton} ${num === page ? styles.active : ""
                                }`}
                            onClick={() => setPage(num)}
                        >
                            {num}
                        </button>
                    ))}

                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className={styles.pageButton}
                >
                    ›
                </button>
                <button
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                    className={styles.pageButton}
                >
                    »
                </button>
            </div>
        </div>
    );
}

NotificationList.propTypes = {
    onSelect: PropTypes.func.isRequired,
};
