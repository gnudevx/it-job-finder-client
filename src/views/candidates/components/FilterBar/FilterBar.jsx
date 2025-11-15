import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./FilterBar.module.scss";

export default function FilterBar({ onChange }) {
    const filterTypes = [
        { key: "location", label: "Địa điểm" },
        { key: "salaryLevel", label: "Mức lương" },
        { key: "experience", label: "Kinh nghiệm" },
        { key: "type", label: "Hình thức" },
    ];

    const quickOptions = {
        location: ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Toàn quốc"],
        salaryLevel: ["Dưới 10 triệu", "10 - 20 triệu", "20 - 30 triệu", "Trên 30 triệu"],
        experience: ["Chưa có kinh nghiệm", "1 năm trở xuống", "1 năm", "2 năm", "3 năm", "Từ 4–5 năm"],
        type: ["Full-time", "Part-time", "Hybrid", "Remote"],
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

            default:
                return value;
        }
    };

    const [activeFilter, setActiveFilter] = useState("experience");
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
                    onChange={(e) => setActiveFilter(e.target.value)}
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
                            className={styles.option}
                            onClick={() => onChange(activeFilter, convertValue(activeFilter, op))}
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
