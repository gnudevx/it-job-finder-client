import React, { useEffect, useState } from "react";
import { Dot } from "lucide-react";
import styles from "./HisReportCVRecommend.module.scss";

export default function HisReportCVRecommend() {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const mockData = [
        {
            id: 1,
            userId: 101,
            jobTitle: "Frontend Developer",
            numSuggested: 10,
            note: "Đề xuất tự động dựa trên kỹ năng ReactJS",
            timestamp: "2025-11-11T09:22:00Z",
        },
        {
            id: 2,
            userId: 101,
            jobTitle: "Backend Developer",
            numSuggested: 8,
            note: "Hệ thống AI đề xuất dựa trên vị trí công việc tương tự",
            timestamp: "2025-11-09T12:15:00Z",
        },
        {
            id: 3,
            userId: 101,
            jobTitle: "UI/UX Designer",
            numSuggested: 5,
            note: "CV được đề xuất dựa trên job đăng gần đây",
            timestamp: "2025-11-02T16:45:00Z",
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setReports(mockData);
            setFilteredReports(mockData);
        }, 400);
    }, []);

    const formatTime = (timestamp) => {
        const d = new Date(timestamp);
        const h = d.getHours().toString().padStart(2, "0");
        const m = d.getMinutes().toString().padStart(2, "0");
        return `${h}:${m}`;
    };

    const handleFilter = () => {
        if (!fromDate && !toDate) return setFilteredReports(reports);
        const from = fromDate ? new Date(fromDate) : new Date("2000-01-01");
        const to = toDate ? new Date(toDate) : new Date("2100-01-01");
        const result = reports.filter((r) => {
            const t = new Date(r.timestamp);
            return t >= from && t <= to;
        });
        setFilteredReports(result);
    };

    return (
        <div className={styles.recommendContainer}>
            <div className={styles.header}>
                <h2>Lịch sử báo cáo CV (Đề xuất)</h2>
                <div className={styles.filter}>
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    <span>→</span>
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    <button onClick={handleFilter}>Lọc</button>
                </div>
            </div>

            <div className={styles.list}>
                {filteredReports.length === 0 ? (
                    <p>Không có dữ liệu trong khoảng thời gian này</p>
                ) : (
                    filteredReports.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.dateSection}>
                                <span className={styles.date}>{new Date(item.timestamp).toLocaleDateString()}</span>
                                <Dot />
                                <span className={styles.timestamp}>{formatTime(item.timestamp)}</span>
                            </div>
                            <div className={styles.detail}>
                                <strong>Vị trí:</strong> {item.jobTitle} <br />
                                <span>Đề xuất: <strong>{item.numSuggested}</strong> CV</span>
                                <p>Ghi chú: {item.note}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
