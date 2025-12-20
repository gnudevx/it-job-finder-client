import React, { useEffect, useState } from "react";
import styles from "./AllHistory.module.scss";
import Pagination from "@/components/common/Pagination/Pagination.jsx";
import { getAuthLogs } from "@/api/authLog.service";
export default function AllHistory() {
    const [histories, setHistories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    const transformLogs = (rawLogs) => {
        const map = {};

        rawLogs.forEach((log) => {
            const dateObj = new Date(log.createdAt);

            const date = dateObj.toLocaleDateString("vi-VN");
            const time = dateObj.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            });

            if (!map[date]) {
                map[date] = [];
            }

            map[date].push({
                time,
                action: log.action === "LOGIN" ? "Đăng nhập" : "Đăng xuất",
            });
        });

        return Object.entries(map).map(([date, logs]) => ({
            date,
            logs,
        }));
    };

    // 🪄 Giả lập fetch dữ liệu mỗi khi đổi trang
    useEffect(() => {
        const fetchHistories = async () => {
            try {
                const res = await getAuthLogs(page, 5);
                // res = { data, pagination }
                console.log("res", res)
                const formatted = transformLogs(res.data);

                setHistories(formatted);
                setTotalPages(res.pagination.totalPages);
            } catch (err) {
                console.error("Fetch auth logs failed", err);
            }
        };

        fetchHistories();
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
