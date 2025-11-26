import React, { useEffect, useState } from "react";
import styles from "./HisUpdateAccount.module.scss";
import { Dot } from "lucide-react";

export default function HisUpdateAccount() {
    const [history, setHistory] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const mockData = [
        { id: 1, userId: 123, action: "Đổi mật khẩu", timestamp: "2025-11-12T19:52:00Z" },
        { id: 2, userId: 123, action: "Cập nhật email", timestamp: "2025-11-10T15:30:00Z" },
        { id: 3, userId: 123, action: "Cập nhật số điện thoại", timestamp: "2025-11-11T12:20:00Z" },
        { id: 4, userId: 123, action: "Thay đổi avatar", timestamp: "2025-11-08T09:10:00Z" },
        // ... bạn có thể thêm nhiều mock data hơn để test scroll
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setHistory(mockData);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    // Lọc theo khoảng ngày
    const filteredHistory = history.filter((item) => {
        const itemDate = new Date(item.timestamp).toISOString().split("T")[0]; // yyyy-mm-dd
        if (startDate && itemDate < startDate) return false;
        if (endDate && itemDate > endDate) return false;
        return true;
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Lịch sử cập nhật tài khoản</h2>
                <div className={styles.dateRange}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={styles.datePicker}
                    />
                    <span>→</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={styles.datePicker}
                    />
                </div>
            </div>

            <div className={styles.list}>
                {filteredHistory.length === 0 ? (
                    <p>Chưa có hoạt động nào</p>
                ) : (
                    filteredHistory.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.dateSection}>
                                <span className={styles.date}>{new Date(item.timestamp).toLocaleDateString()}</span>
                                <Dot className={styles.dot} />
                                <span className={styles.timestamp}>{formatTime(item.timestamp)}</span>
                            </div>
                            <span className={styles.action}>{item.action}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
