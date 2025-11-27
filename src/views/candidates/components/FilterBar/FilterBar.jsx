import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./FilterBar.module.scss";

export default function FilterBar({ onChange }) {
    const filterTypes = [
        { key: "location", label: "Địa điểm" },
        { key: "salaryLevel", label: "Mức lương" },
        { key: "experience", label: "Kinh nghiệm" },
        { key: "skills", label: "Chuyên môn" },
        { key: "createDate", label: "Ngày đăng" },
    ];

    const quickOptions = {
        location: ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Toàn quốc"],
        salaryLevel: ["Dưới 10 triệu", "10 - 20 triệu", "20 - 30 triệu", "Trên 30 triệu"],
        experience: ["Chưa có kinh nghiệm", "1 năm trở xuống", "1 năm", "2 năm", "3 năm", "Từ 4–5 năm"],
        skills: ["SQL", "Python", "Java", "Node.js", "React", "DevOps"],
        createDate: ["Hôm nay", "3 ngày qua", "7 ngày qua", "14 ngày qua"],
    };

    const convertValue = (key, value) => {
        switch (key) {
            case "salaryLevel":
                if (value.includes("Dưới")) return 10;
                if (value.includes("10 - 20")) return 20;
                if (value.includes("20 - 30")) return 30;
                if (value.includes("Trên 30")) return 999;
                return "";

            case "experience":
                if (value.includes("Chưa")) return 0;
                if (value.includes("1 năm trở xuống")) return 1;
                if (value.includes("1 năm")) return 1;
                if (value.includes("2 năm")) return 2;
                if (value.includes("3 năm")) return 3;
                if (value.includes("4") || value.includes("5")) return 4;
                return "";

            case "createDate":
                if (value.includes("Hôm nay")) return 1;
                if (value.includes("3")) return 3;
                if (value.includes("7")) return 7;
                if (value.includes("14")) return 14;
                return "";

            default:
                return value;
        }
    };

    const [activeFilter, setActiveFilter] = useState("experience");
    const [selectedFilters, setSelectedFilters] = useState({});

    const scrollRef = useRef(null);

    const scrollLeft = () => (scrollRef.current.scrollLeft -= 150);
    const scrollRight = () => (scrollRef.current.scrollLeft += 150);

    return (
        <div className={styles.filterBar}>
            {/* Dropdown */}
            <div className={styles.dropdown}>
                <span>Lọc theo:</span>
                <select
                    value={activeFilter}
                    onChange={(e) => {
                        const newKey = e.target.value;
                        setActiveFilter(newKey);
                        // Reset filter cũ về rỗng trước khi áp dụng filter mới
                        onChange(activeFilter, ""); 
                    }}
                >
                    {filterTypes.map((f) => (
                        <option key={f.key} value={f.key}>
                            {f.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Quick filter */}
            <div className={styles.quickArea}>
                <button className={`${styles.arrowBtn} ${styles.leftArrow}`} onClick={scrollLeft}>
                    ‹
                </button>

                <div className={styles.quickOptions} ref={scrollRef}>
                    {quickOptions[activeFilter].map((op) => (
                        <button
                            key={op}
                            className={`${styles.option} ${
                                selectedFilters[activeFilter] === op ? styles.active : ""
                            }`}
                            onClick={() => {
                                const v = op === "Toàn quốc" ? "" : convertValue(activeFilter, op);

                                setSelectedFilters(prev => ({
                                    ...prev,
                                    [activeFilter]: op
                                }));

                                onChange(activeFilter, v);
                            }}
                        >
                            {op}
                        </button>
                    ))}
                </div>

                <button className={`${styles.arrowBtn} ${styles.rightArrow}`} onClick={scrollRight}>
                    ›
                </button>
            </div>
        </div>
    );
}

FilterBar.propTypes = {
    onChange: PropTypes.func.isRequired,
};
