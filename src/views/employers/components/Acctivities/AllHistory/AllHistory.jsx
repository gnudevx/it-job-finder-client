import React, { useEffect, useState } from "react";
import styles from "./AllHistory.module.scss";
import Pagination from "@/components/common/Pagination/Pagination.jsx";

export default function AllHistory() {
    const [histories, setHistories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages] = useState(2);

    // 🧩 Dữ liệu giả (mock)
    const mockData = {
        1: [
            {
                date: "11/11/2025",
                logs: [{ time: "15:39", action: "Đăng nhập" }],
            },
            {
                date: "07/11/2025",
                logs: [
                    { time: "02:43", action: "Đăng xuất" },
                    { time: "01:52", action: "Đăng nhập" },
                ],
            },
        ],
        2: [
            {
                date: "06/11/2025",
                logs: [
                    { time: "22:58", action: "Đăng xuất" },
                    { time: "22:56", action: "Đăng nhập" },
                ],
            },
            {
                date: "05/11/2025",
                logs: [
                    { time: "21:12", action: "Đăng nhập" },
                    { time: "21:30", action: "Đăng xuất" },
                ],
            },
        ],
        3: [
            {
                date: "04/11/2025",
                logs: [
                    { time: "09:45", action: "Đăng nhập" },
                    { time: "10:15", action: "Đăng xuất" },
                    { time: "14:00", action: "Đăng nhập" },
                ],
            },
        ],
        4: [
            {
                date: "03/11/2025",
                logs: [
                    { time: "08:12", action: "Đăng nhập" },
                    { time: "12:00", action: "Đăng xuất" },
                ],
            },
        ],
        5: [
            {
                date: "02/11/2025",
                logs: [
                    { time: "11:11", action: "Đăng nhập" },
                    { time: "11:25", action: "Đăng xuất" },
                ],
            },
        ],
    };

    // 🪄 Giả lập fetch dữ liệu mỗi khi đổi trang
    useEffect(() => {
        // Giả lập trễ 300ms như gọi API thật
        const timer = setTimeout(() => {
            setHistories(mockData[page] || []);
        }, 300);

        return () => clearTimeout(timer);
    }, [page]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Tất cả lịch sử</h3>
            </div>

            <div className={styles.historyList}>
                {histories.map((item, idx) => (
                    <div key={idx} className={styles.dateGroup}>
                        <div className={styles.date}>{item.date}</div>
                        <ul className={styles.logList}>
                            {item.logs.map((log, i) => (
                                <li key={i} className={styles.logItem}>
                                    <span className={styles.dot}></span>
                                    <span className={styles.time}>{log.time}</span>
                                    <span className={styles.action}>{log.action}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* 🔹 Truyền props cho component Pagination */}
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChange={setPage}
                />
            </div>
        </div>
    );
}
