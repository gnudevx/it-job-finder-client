import React, { useEffect, useState } from "react";
import { Dot } from "lucide-react";
import styles from "./HisReportCVSearch.module.scss";

export default function HisReportCVSearch() {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // 🔹 Mock dữ liệu hợp lý cho lịch sử tìm kiếm CV
    const mockData = [
        {
            id: 1,
            userId: 101,
            keyword: "React Developer",
            filters: { location: "Hồ Chí Minh", experience: "2-5 năm" },
            numResults: 25,
            timestamp: "2025-11-12T09:30:00Z",
        },
        {
            id: 2,
            userId: 101,
            keyword: "Java Backend",
            filters: { location: "Hà Nội", experience: "3-7 năm" },
            numResults: 40,
            timestamp: "2025-11-10T14:45:00Z",
        },
        {
            id: 3,
            userId: 101,
            keyword: "UI/UX Designer",
            filters: { location: "Đà Nẵng" },
            numResults: 12,
            timestamp: "2025-11-02T08:00:00Z",
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
        <div className={styles.searchContainer}>
            <div className={styles.header}>
                <h2>Lịch sử báo cáo CV (Tìm kiếm)</h2>
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
                                <strong>Từ khóa:</strong> {item.keyword} <br />
                                <span>
                                    <strong>Khu vực:</strong> {item.filters.location || "Không có"}{" "}
                                    | <strong>Kinh nghiệm:</strong> {item.filters.experience || "Không có"}
                                </span>
                                <p>Tìm thấy: <strong>{item.numResults}</strong> CV phù hợp</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}