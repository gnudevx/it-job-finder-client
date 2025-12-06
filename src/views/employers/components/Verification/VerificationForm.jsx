import React, { useEffect, useState } from "react";
import styles from "./VerificationForm.module.scss";
import { FaArrowRight } from "react-icons/fa";
import { Circle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import employerApiService from "@/api/employerSerivce.js"; // giả sử service axios

export default function VerificationForm() {
    const [steps, setSteps] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await employerApiService.getEmployerProgressService();
                setSteps(res.steps);
            } catch (err) {
                console.error("Lấy progress thất bại", err);
            }
        };
        fetchProgress();
    }, []);

    if (!steps) return <div>Loading...</div>;

    // Nếu đã hoàn tất cả 3 bước, không cần hiển thị form
    if (steps.phoneVerified && steps.companyInfoUpdated && steps.licenseUploaded) {
        return null;
    }

    const options = [
        {
            label: "Xác thực số điện thoại",
            key: "phoneVerified",
            link: "/employer/account/phone-verify",
        },
        {
            label: "Cập nhật thông tin công ty",
            key: "companyInfoUpdated",
            link: "/employer/account/settings/company-info",
        },
        {
            label: "Xác thực Giấy đăng ký doanh nghiệp",
            key: "licenseUploaded",
            link: "/employer/account/settings/license",
        },
    ];

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h4>
                    Tài khoản xác thực: <span className={styles.level}>
                        {`${Object.values(steps).filter(Boolean).length}/3`}
                    </span>
                </h4>
                <p>
                    Nâng cấp tài khoản để đủ điều kiện đăng tin tuyển dụng.
                </p>
            </div>
            <div className={styles.progressWrapper}>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${Object.values(steps).filter(Boolean).length / 3 * 100}%` }}
                    />
                </div>
                <span className={styles.progressText}>
                    {Object.values(steps).filter(Boolean).length}/3 bước hoàn tất
                </span>
            </div>
            <div className={styles.verifySection}>
                <p className={styles.subTitle}>Xác thực thông tin</p>

                <div className={styles.optionList}>
                    {options.map((opt) => (
                        <div
                            key={opt.key}
                            className={`${styles.option} ${steps[opt.key] ? styles.completed : ""}`}
                            onClick={() => !steps[opt.key] && navigate(opt.link)}
                        >
                            {steps[opt.key] ? (
                                <CheckCircle size={15} color="#16a34a" />
                            ) : (
                                <Circle size={15} color="#ccc" />
                            )}

                            <label>{opt.label}</label>
                            <label>{opt.label}</label>
                            <div
                                className={styles.arrowWrapper}
                                style={{
                                    opacity: steps[opt.key] ? 0.3 : 1,
                                    cursor: steps[opt.key] ? "not-allowed" : "pointer",
                                }}
                            >
                                <FaArrowRight className={styles.arrowIcon} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.actions}>
                    <button className={styles.moreBtn} onClick={() => navigate("/employer/account/settings")}>
                        Tìm hiểu thêm
                    </button>
                </div>
            </div>
        </div>
    );
}
