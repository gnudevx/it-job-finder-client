import React, { useState, useEffect } from "react";
import styles from "./CompanyInfo.module.scss";
import SearchCompany from "./SearchCompany/SearchCompany.jsx";
import CreateCompany from "./CreateCompany/CreateCompany.jsx";
import CompanyDetail from "./CompanyDetail/CompanyDetail.jsx";
import { useEmployerProgress } from "@/contexts/EmployerProgressContext";
import { Search, CirclePlus } from "lucide-react";
export default function CompanyInfo() {
    const { steps, setStep } = useEmployerProgress();
    const [activeTab, setActiveTab] = useState("search"); // "search" | "create"
    const [selectedCompany, setSelectedCompany] = useState(null);

    // Nếu đã có dữ liệu lưu, hiển thị chi tiết luôn
    useEffect(() => {
        if (steps.companyInfoUpdated) {
            const savedCompany = JSON.parse(localStorage.getItem("selectedCompany"));
            if (savedCompany) setSelectedCompany(savedCompany);
        }
    }, [steps.companyInfoUpdated]);

    const handleSelectCompany = (company) => {
        setSelectedCompany(company);
        setStep("companyInfoUpdated", true);
        localStorage.setItem("selectedCompany", JSON.stringify(company));
    };

    const handleSaveComplete = (savedCompany) => {
        setSelectedCompany(savedCompany);
        setStep("companyInfoUpdated", true);
        localStorage.setItem("selectedCompany", JSON.stringify(savedCompany));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Thông tin công ty</h3>
            </div>
            <div className={styles.form} >
                {/* 🟩 Tabs giống TopCV */}
                <div className={styles.tabs}>
                    <div
                        className={`${styles.tab} ${activeTab === "search" ? styles.active : ""}`}
                        onClick={() => setActiveTab("search")}
                    >
                        <div className={styles.tabTitle}>
                            <div className={styles["icon-box"]}>
                                <Search size={18} />
                            </div>
                            <div className={styles.tabText}>
                                <span>
                                    Tìm kiếm thông tin công ty
                                </span>
                                <p>Dành cho doanh nghiệp đã có trên TopCV</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styles.tab} ${activeTab === "create" ? styles.active : ""}`}
                        onClick={() => setActiveTab("create")}
                    >
                        <div className={styles.tabTitle}>
                            <div className={styles["icon-box"]}>
                                <CirclePlus size={18} />
                            </div>
                            <div className={styles.tabText}>
                                <span>
                                    Tạo công ty mới
                                </span>
                                <p>Dành cho doanh nghiệp lần đầu sử dụng TopCV</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🧩 Nội dung từng tab */}
                <div className={styles.content}>
                    {activeTab === "search" && (
                        <SearchCompany onSelectCompany={handleSelectCompany} />
                    )}

                    {activeTab === "create" && (
                        <CreateCompany
                            selectedCompany={selectedCompany}
                            onSaveComplete={handleSaveComplete}
                            onCancel={() => setActiveTab("search")}
                        />
                    )}

                    {selectedCompany && (
                        <CompanyDetail company={selectedCompany} onEdit={() => setActiveTab("create")} />
                    )}
                </div>
            </div>
        </div>
    );
}
