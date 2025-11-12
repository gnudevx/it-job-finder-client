import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./SupportBox.module.scss";
import AccountTabs from "@/components/employers/AccountSidebar/AccountSidebar.jsx";
import Support_Report from "@views/employers/components/SupportBox/Support_Report/Support_Report.jsx";
import SupposeProduction from "@views/employers/components/SupportBox/SupposeProduction/SupposeProduction.jsx";
import Recruitment from "@views/employers/components/SupportBox/Recruitment/Recruitment.jsx";
import Hotline from "@views/employers/components/SupportBox/Hotline/Hotline.jsx";
import { ImDropbox } from "react-icons/im";
import { FaListCheck } from "react-icons/fa6";
import { TbMessageCircleUp } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
export default function AccountAcctivities() {
    const tabs = [
        { icon: ImDropbox, key: "all", label: "Yêu cầu hỗ trợ & Báo cáo vi phạm", path: "/employer/support-box" },
        { icon: FaListCheck, key: "suggest", label: "Góp ý sản phẩm", path: "/employer/support-box/suggest" },
        { icon: TbMessageCircleUp, key: "recruitment-consulting", label: "Tư vấn tuyển dụng", path: "/employer/support-box/recruitment-consulting" },
        { icon: FaPhoneAlt, key: "hotline", label: "Hotline CSKH & Hỗ trợ dịch vụ", path: "/employer/support-box/hotline" },
    ];
    return (
        <div className={styles.accountWrapper}>
            <div className={styles.accountContainer}>
                <div className={styles.sidebar}>
                    <AccountTabs tabs={tabs} />
                </div>
                <div className={styles.content}>
                    <Routes>
                        <Route index element={<Support_Report />} />
                        <Route path="suggest" element={<SupposeProduction />} />
                        <Route path="recruitment-consulting" element={<Recruitment />} />
                        <Route path="hotline" element={<Hotline />} />
                        {/* Nếu không có gì thì mặc định chuyển sang "activities" */}
                        <Route path="*" element={<Navigate to="." replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}