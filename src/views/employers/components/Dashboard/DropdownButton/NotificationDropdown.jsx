import React, { useState, useRef, useEffect } from "react";
import styles from "./NotificationDropdown.module.scss";
import { FaBell } from "react-icons/fa";
import { io } from "socket.io-client";
import notificationApiService from "@/api/notificationApiService";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const NotificationDropdown = ({ employerId }) => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const ref = useRef();
    const navigate = useNavigate();

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Fetch notifications + kết nối socket
    useEffect(() => {
        if (!employerId) return;

        const fetchNotifications = async () => {
            try {
                const res = await notificationApiService.getNotificationEmployer(1, 10);
                const items = res.items.map((n) => ({
                    ...n,
                    date: new Date(n.sentAt).toLocaleString(),
                }));
                setNotifications(items || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchNotifications();

        const socket = io("http://localhost:5000");
        socket.emit("join", `employer:${employerId}`);

        socket.on("notification:new", (noti) => {
            const newNoti = { ...noti, date: new Date(noti.sentAt).toLocaleString() };
            setNotifications((prev) => [newNoti, ...prev]);
        });

        return () => socket.disconnect();
    }, [employerId]);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const handleClickNotification = async (n) => {
        try {
            // Đánh dấu đã đọc
            if (!n.isRead) {
                await notificationApiService.markRead(n.id);
                setNotifications((prev) =>
                    prev.map((item) => (item.id === n.id ? { ...item, isRead: true } : item))
                );
            }
            navigate(`/employer/system-notification/${n.id}`);
            setOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.wrapper} ref={ref}>
            <button className={styles.trigger} onClick={() => setOpen((prev) => !prev)}>
                <div className={styles.circle}>
                    <FaBell className={styles.bellIcon} />
                </div>
                {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
            </button>

            {open && (
                <div className={styles.panel}>
                    <div className={styles.header}>
                        <div className={styles.title}>Thông báo</div>
                        <button
                            className={styles.markAll}
                            onClick={() =>
                                setNotifications((prev) =>
                                    prev.map((n) => ({ ...n, isRead: true }))
                                )
                            }
                        >
                            Đánh dấu tất cả là đã đọc
                        </button>
                    </div>

                    <div className={styles.list}>
                        {notifications.length === 0 ? (
                            <div className={styles.empty}>Không có thông báo</div>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className={`${styles.item} ${n.isRead ? styles.read : ""}`}
                                    onClick={() => handleClickNotification(n)}
                                >
                                    <div className={styles.itemLeft}>
                                        <div className={styles.iconDot}>i</div>
                                    </div>
                                    <div className={styles.itemBody}>
                                        <div className={styles.itemTitle}>{n.title}</div>
                                        <div className={styles.itemText}>{n.message}</div>
                                        <div className={styles.itemDate}>{n.date}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className={styles.footer}>
                        <button className={styles.viewAll} onClick={() => navigate("/employer/system-notification/")}>
                            Xem tất cả
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

NotificationDropdown.propTypes = {
    employerId: PropTypes.string.isRequired,
};

export default NotificationDropdown;
