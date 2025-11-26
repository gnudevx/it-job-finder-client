import React, { useState, useEffect } from "react";
import { fetchNotifications } from "@/api/notificationApi";
import styles from "./NotificationList.module.scss";
import Pagination from "@/components/common/Pagination/Pagination.jsx";
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

            {/* ✅ Truyền props vào Pagination */}
            <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
            />
        </div>
    );
}

NotificationList.propTypes = {
    onSelect: PropTypes.func.isRequired,
};
