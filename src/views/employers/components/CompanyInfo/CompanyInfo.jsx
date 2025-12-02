import React, { useState, useEffect } from "react";
import styles from "./CompanyInfo.module.scss";
import SearchCompany from "./SearchCompany/SearchCompany.jsx";
import CreateCompany from "./CreateCompany/CreateCompany.jsx";
import CompanyDetail from "./CompanyDetail/CompanyDetail.jsx";
import { useEmployerProgress } from "@/contexts/EmployerProgressContext";
import { Search, CirclePlus } from "lucide-react";
import companyService from "@/api/companyService.js"
export default function CompanyInfo() {
    const { setStep } = useEmployerProgress();

    // choose | detail | edit
    const [mode, setMode] = useState("choose");

    const [activeTab, setActiveTab] = useState("search");
    const [selectedCompany, setSelectedCompany] = useState(null);

    // Load company saved trước đó
    useEffect(() => {
        async function loadCompany() {
            try {
                const res = await companyService.getMyCompany();
                if (res.company) {
                    setSelectedCompany(res.company);
                    setMode("detail");
                } else {
                    setMode("choose");
                }
            } catch (err) {
                setMode("choose");
            }
        }

        loadCompany();
    }, []);


    const handleSelectCompany = async (company) => {
        console.log("Chọn company:", company._id);
        try {
            const res = await companyService.selectCompany(company._id);
            console.log("API response:", res);
            setSelectedCompany(company);
            setStep("companyInfoUpdated", true);
            setMode("detail");
        } catch (err) {
            console.error("Lỗi khi chọn công ty:", err);
            alert("Lỗi khi chọn công ty");
        }
    };
    const handleSaveComplete = async () => {
        const res = await companyService.getMyCompany();
        setSelectedCompany(res.company);
        setStep("companyInfoUpdated", true); // báo hoàn thành bước
        setMode("detail");
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Thông tin công ty</h3>
            </div>

            <div className={styles.form}>
                {/* 🟩 MODE: CHỌN HOẶC TẠO */}
                {mode === "choose" && (
                    <>
                        {/* Tabs */}
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
                                        <span>Tìm kiếm thông tin công ty</span>
                                        <p>Dành cho doanh nghiệp đã có trên HireIT</p>
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
                                        <span>Tạo công ty mới</span>
                                        <p>Dành cho doanh nghiệp lần đầu sử dụng HireIT</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Nội dung */}
                        <div className={styles.content}>
                            {activeTab === "search" && (
                                <SearchCompany onSelectCompany={handleSelectCompany} />
                            )}

                            {activeTab === "create" && (
                                <CreateCompany
                                    selectedCompany={null}
                                    onSaveComplete={handleSaveComplete}
                                />
                            )}
                        </div>
                    </>
                )}

                {/* 🟦 MODE: DETAIL */}
                {mode === "detail" && selectedCompany && (
                    <CompanyDetail
                        company={selectedCompany}
                        onEdit={() => setMode("edit")}
                    />
                )}

                {/* 🟧 MODE: EDIT */}
                {mode === "edit" && (
                    <CreateCompany
                        selectedCompany={selectedCompany}
                        onSaveComplete={handleSaveComplete}
                        onCancel={() => setMode("detail")}
                    />
                )}
            </div>
        </div>
    );
}
