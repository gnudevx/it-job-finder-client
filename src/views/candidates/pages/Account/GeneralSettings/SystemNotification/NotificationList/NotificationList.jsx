import React, { useState, useEffect } from "react";
import styles from "./NotificationList.module.scss";
import Pagination from "@/components/common/Pagination/Pagination.jsx";
import PropTypes from "prop-types";
import notificationApiService from "@/api/notificationApiService";
import { useNavigate } from "react-router-dom";

export default function NotificationList() {
    const [page, setPage] = useState(1);
    const [notifications, setNotifications] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate(); // <-- thêm navigate

    const TYPE_LABEL = { SYSTEM: "Hệ thống", FEATURE: "Tính năng", PROMOTION: "Khuyến mãi", ALERT: "Cảnh báo" };
    const TYPE_STYLE = { SYSTEM: styles.system, FEATURE: styles.feature, PROMOTION: styles.promotion, ALERT: styles.alert };

    useEffect(() => { load(); }, [page]);

    const load = async () => {
        try {
            const res = await notificationApiService.candidateList(page, 10);
            setNotifications(res.items);
            setTotalPages(res.totalPages);
        } catch (e) {
            console.error(e);
        }
    };

    const handleClick = async (n) => {
        try {
            navigate(`/candidate/system-notification/${n._id}`); // <-- navigate sang chi tiết
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.list}>
            {notifications.map((n) => (
                <div key={n._id} className={styles.item}>
                    <div className={`${styles.tag} ${TYPE_STYLE[n.type]}`}>{TYPE_LABEL[n.type]}</div>
                    <div className={styles.time}>{new Date(n.createdAt).toLocaleDateString("vi-VN")}</div>
                    <div className={styles.title} onClick={() => handleClick(n)}>
                        {n.title}
                        {!n.isRead && <span className={styles.dot}></span>}
                    </div>
                </div>
            ))}

            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
    );
}
NotificationList.propTypes = {
    onSelect: PropTypes.func.isRequired,
};
