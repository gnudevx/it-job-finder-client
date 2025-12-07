import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    ChevronLeft,
    ChevronRight,
    Filter as FilterIcon
} from "lucide-react";
import styles from "./FilterBar.module.scss";

export default function FilterBar({ onChange }) {
    const scrollRef = useRef(null);

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
        experience: ["Chưa có kinh nghiệm", "1 năm trở xuống", "1 năm", "2 năm", "3 năm", "4-5 năm"],
        skills: ["SQL", "Python", "Java", "Node.js", "React", "DevOps", "tiếng Anh", "AI"],
        createDate: ["Hôm nay", "3 ngày qua", "7 ngày qua", "14 ngày qua"],
    };

    const convertValue = (key, value) => {
        if (key === "salaryLevel") {
            if (value.includes("Dưới")) return 10;
            if (value.includes("10 - 20")) return 20;
            if (value.includes("20 - 30")) return 30;
            if (value.includes("Trên 30")) return 999;
        }

        if (key === "experience") {
            if (value.includes("Chưa")) return 0;
            if (value.includes("1 năm trở xuống")) return 1;
            if (value.includes("1 năm")) return 1;
            if (value.includes("2 năm")) return 2;
            if (value.includes("3 năm")) return 3;
            return 4;
        }

        if (key === "createDate") {
            if (value.includes("Hôm nay")) return 1;
            if (value.includes("3")) return 3;
            if (value.includes("7")) return 7;
            if (value.includes("14")) return 14;
        }

        return value === "Toàn quốc" ? "" : value;
    };

    const [activeFilter, setActiveFilter] = useState("experience");
    const [selectedFilters, setSelectedFilters] = useState({});

    const scroll = (direction) => {
        if (scrollRef.current) {
            const amount = 200;
            if (direction === "left") scrollRef.current.scrollLeft -= amount;
            else scrollRef.current.scrollLeft += amount;
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.container}>

                    {/* Select Box */}
                    <div className={styles.filterBox}>
                        <FilterIcon size={16} className={styles.filterIcon} />
                        <span className={styles.filterLabel}>Lọc theo:</span>

                        <select
                            className={styles.selectBox}
                            value={activeFilter}
                            onChange={(e) => {
                                const newKey = e.target.value;
                                setActiveFilter(newKey);
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

                    <div className={styles.divider}></div>

                    {/* Left Scroll Btn */}
                    <button
                        onClick={() => scroll("left")}
                        className={`${styles.arrowBtn} ${styles.hideOnMobile}`}
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {/* Scroll Buttons */}
                    <div ref={scrollRef} className={styles.scrollArea}>
                        {quickOptions[activeFilter].map((op) => {
                            const isActive =
                                activeFilter === "skills"
                                    ? selectedFilters.skills?.includes(op)
                                    : selectedFilters[activeFilter] === op;

                            return (
                                <button
                                    key={op}
                                    className={`${styles.filterItem} ${isActive ? styles.active : ""}`}
                                    onClick={() => {
                                        setSelectedFilters((prev) => {
                                            if (activeFilter === "skills") {
                                                const prevSkills = prev.skills || [];
                                                const newSkills = prevSkills.includes(op)
                                                    ? prevSkills.filter((s) => s !== op)
                                                    : [...prevSkills, op];

                                                onChange("skills", newSkills);
                                                return { ...prev, skills: newSkills };
                                            }

                                            const mappedValue = convertValue(activeFilter, op);

                                            onChange(activeFilter, mappedValue);
                                            return { ...prev, [activeFilter]: op };
                                        });
                                    }}
                                >
                                    {op}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Scroll Btn */}
                    <button
                        onClick={() => scroll("right")}
                        className={`${styles.arrowBtn} ${styles.hideOnMobile}`}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

FilterBar.propTypes = {
    onChange: PropTypes.func.isRequired,
};
