import React, { useState, useRef, useEffect } from "react";
import styles from "./NotificationDropdown.module.scss";
import { FaBell } from "react-icons/fa";

export const NotificationDropdown = () => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const ref = useRef();

    // Đóng khi click ra ngoài
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // ✅ Giống “Insights”: Fetch khi mở dropdown
    useEffect(() => {
        // Fetch dữ liệu 1 lần khi component mount (hoặc sau này gọi API)
        const mockData = [
            {
                id: 1,
                title: "Workshop miễn phí: Nâng cấp kỹ năng phân tích dữ liệu",
                content:
                    "Tham gia buổi workshop đặc biệt giúp bạn nắm vững kỹ năng phân tích dữ liệu bằng Excel và Power BI. Số lượng vé giới hạn!",
                date: "12/11/2025",
                isRead: false,
            },
            {
                id: 2,
                title: "Tuyển sinh khóa ReactJS cho người mới bắt đầu",
                content:
                    "Khóa học ReactJS thực hành 100% dự án thật, phù hợp cho sinh viên CNTT và lập trình viên mới.",
                date: "10/11/2025",
                isRead: false,
            },
            {
                id: 3,
                title: "Nhận học bổng 50% cho khóa lập trình Backend",
                content:
                    "Ưu đãi học bổng lên đến 50% dành cho học viên đăng ký sớm khóa NodeJS Backend Developer.",
                date: "08/11/2025",
                isRead: false,
            }
        ];
        setNotifications(mockData);
    }, []);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
        <div className={styles.wrapper} ref={ref}>
            <button
                className={styles.trigger}
                onClick={() => setOpen((prev) => !prev)}
            >
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
                                >
                                    <div className={styles.itemLeft}>
                                        <div className={styles.iconDot}>i</div>
                                    </div>
                                    <div className={styles.itemBody}>
                                        <div className={styles.itemTitle}>{n.title}</div>
                                        <div className={styles.itemText}>{n.content}</div>
                                        <div className={styles.itemDate}>{n.date}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className={styles.footer}>
                        <button className={styles.viewAll}>Xem tất cả</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default NotificationDropdown;