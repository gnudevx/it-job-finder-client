import React, { useEffect, useState } from "react";
import styles from "./NotificationDetail.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import notificationApiService from "@/api/notificationApiService";

export default function NotificationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    useEffect(() => {
        if (!id) return;

        const load = async () => {
            try {
                const res = await notificationApiService.getById(id);
                setDetail(res);
                // Đánh dấu đã đọc
                if (!res.isRead) await notificationApiService.markRead(id);
            } catch (err) {
                console.error(err);
            }
        };
        load();
    }, [id]);
    if (!detail) return <div>Loading...</div>;
    return (
        <div className={styles.detail}>
            <button className={styles.back} onClick={() => navigate(-1)}>
                ← Quay lại
            </button>

            <h2 className={styles.title}>{detail.title}</h2>
            <div className={styles.date}>{new Date(detail.createdAt).toLocaleString("vi-VN")}</div>
            <p className={styles.desc}>{detail.message}</p>
        </div>
    );
}
