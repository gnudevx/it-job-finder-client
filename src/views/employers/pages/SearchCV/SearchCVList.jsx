import { useState, useMemo, useEffect } from "react";
import styles from "./SearchCVList.module.scss";
import axiosClient from "@/services/axiosClient.js";
import CVCard from "./CVCard";

const SearchCVList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [cvs, setCvs] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [suggestions] = useState([]);
    useEffect(() => {
        const fetchCVs = async () => {
            try {
                const res = await axiosClient.get("/employer/search-cv");
                setCvs(res);
                console.log(res)
            } catch (err) {
                console.error(err);
            }
        };

        fetchCVs();
    }, []);
    const allSkills = useMemo(() => {
        const skills = new Set();

        cvs.forEach(cv => {
            if (Array.isArray(cv.skills)) {
                cv.skills.forEach(s => skills.add(s));
            }
        });

        return Array.from(skills);
    }, [cvs]);
    const toggleSkill = skill => {
        setSelectedSkills(prev =>
            prev.includes(skill)
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        );
    };
    const filteredCVs = useMemo(() => {
        const q = searchQuery.toLowerCase();

        return cvs.filter(cv => {
            const skills = Array.isArray(cv.skills) ? cv.skills : [];

            const matchesSearch =
                cv.fullName?.toLowerCase().includes(q) ||
                cv.title?.toLowerCase().includes(q) ||
                skills.some(s => s.toLowerCase().includes(q));

            const matchesSkills =
                selectedSkills.length === 0 ||
                selectedSkills.some(s => skills.includes(s));

            return matchesSearch && matchesSkills;
        });
    }, [cvs, searchQuery, selectedSkills]);
    return (
        <div className={styles.layout}>
            {/* SIDEBAR */}
            <aside className={styles.sidebar}>
                <div className={styles.filterBox}>
                    <h4>Lọc theo Kỹ năng CV</h4>
                    <div className={styles.skills}>
                        {allSkills.map(skill => (
                            <button
                                key={skill}
                                onClick={() => toggleSkill(skill)}
                                className={
                                    selectedSkills.includes(skill)
                                        ? styles.skillActive
                                        : styles.skill
                                }
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>
            <section className={styles.content}>
                <input
                    className={styles.searchInput}
                    placeholder="Tìm kiếm CV theo kỹ năng, vị trí hoặc từ khóa..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />

                {suggestions.length > 0 && (
                    <div className={styles.suggestions}>
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setSearchQuery(s)}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}

                {filteredCVs.map(cv => (
                    <CVCard key={cv.id} cv={cv} />
                ))}
            </section>
        </div>
    );
};

export default SearchCVList;
