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
                title: "Cơ hội cuối nhận vé miễn phí xây dựng khung BSC - KPI",
                content:
                    "Sự kiện tối ưu chiến lược BSC-KPI sẽ đóng cổng đăng ký sau 23h59 ngày 29/10. Nhận vé mời miễn phí ngay!",
                date: "29/10/2025",
                isRead: false,
            },
            {
                id: 2,
                title: "Vai trò của công nghệ trong chuẩn hóa lương 3P",
                content:
                    "Thầy Loan Văn Sơn chia sẻ về chiến lược xây dựng BSC-KPI trong chính sách lương 3P.",
                date: "27/10/2025",
                isRead: false,
            },
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