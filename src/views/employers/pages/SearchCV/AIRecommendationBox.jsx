import React, { useState } from "react";
import styles from "./AIRecommendationBox.module.scss";
import CVCard from "./CVCard.jsx";
export default function AIRecommendationBox() {
    const [jobDescription, setJobDescription] = useState("");
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [recommendedCvs, setRecommendedCvs] = useState([]);

    const handleGetRecommendations = async () => {
        setIsAiLoading(true);

        // mock AI
        setTimeout(() => {
            setRecommendedCvs([
                {
                    id: 1,
                    fullName: "Nguyễn Văn A",
                    skills: ["React", "Node.js", "TypeScript"],
                    avatar: 'https://picsum.photos/seed/1/200/200',
                    matchScore: 95,
                    matchReason: "Có kinh nghiệm dày dặn với React và Next.js",
                    experienceYears: 5,
                    title: "Senior Frontend Developer"
                },
                {
                    id: 2,
                    fullName: "Trần Thị B",
                    avatar: 'https://picsum.photos/seed/1/200/200',
                    skills: ["Vue.js", "JavaScript"],
                    matchScore: 80,
                    matchReason: "Nắm vững căn bản Frontend",
                    experienceYears: 3,
                    title: "Frontend Developer"
                },
            ]);
            setIsAiLoading(false);
        }, 1500);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <span className={styles.iconBox}>
                            <svg
                                className={styles.icon}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </span>
                        Gợi ý CV thông minh
                    </h2>

                    <p className={styles.subtitle}>
                        Hãy dán bản mô tả công việc (JD) hoặc yêu cầu tuyển dụng. AI sẽ quét
                        toàn bộ kho CV để tìm ra các bản hồ sơ có kỹ năng và kinh nghiệm tương
                        xứng nhất.
                    </p>
                </div>

                {/* Body */}
                <div className={styles.body}>
                    <div>
                        <div className={styles.labelRow}>
                            <label className={styles.label}>
                                Nội dung Yêu cầu tuyển dụng
                            </label>
                            <span className={styles.hint}>
                                Tối thiểu 20 từ để AI hoạt động tốt nhất
                            </span>
                        </div>

                        <textarea
                            rows={8}
                            className={styles.textarea}
                            placeholder="Ví dụ: Cần tuyển Senior Frontend Developer có 5 năm kinh nghiệm React. Yêu cầu am hiểu sâu về Performance optimization, biết Next.js và có tư duy sản phẩm tốt..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    <div className={styles.buttonWrapper}>
                        <button
                            onClick={handleGetRecommendations}
                            disabled={isAiLoading || !jobDescription.trim()}
                            className={`${styles.button} ${isAiLoading || !jobDescription.trim()
                                ? styles.buttonDisabled
                                : styles.buttonActive
                                }`}
                        >
                            {isAiLoading ? (
                                <>
                                    <svg
                                        className={styles.spinner}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className={styles.spinnerBg}
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className={styles.spinnerFg}
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                    Hệ thống đang quét kho CV...
                                </>
                            ) : (
                                <>
                                    <svg
                                        className={styles.searchIcon}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    Phân tích & Gợi ý hồ sơ
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Result */}
            {recommendedCvs.length > 0 && (
                <div className={styles.result}>
                    <div className={styles.resultHeader}>
                        <span />
                        <h3>Kết quả phân tích từ AI</h3>
                        <span />
                    </div>

                    <div className={styles.resultGrid}>
                        {recommendedCvs.map((cv) => (
                            <CVCard key={cv.id} cv={cv} isRecommended />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
