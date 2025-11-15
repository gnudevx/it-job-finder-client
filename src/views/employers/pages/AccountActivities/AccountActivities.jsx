import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./AccountAcctivities.module.scss";
import AccountTabs from "@/components/employers/AccountSidebar/AccountSidebar.jsx";
import AllHistory from "@views/employers/components/Acctivities/AllHistory/AllHistory.jsx";
import HisUpdateAccount from "@views/employers/components/Acctivities/HisUpdateAccount/HisUpdateAccount.jsx";
import HisReportCVSearch from "@views/employers/components/Acctivities/HisReportCVSearch/HisReportCVSearch.jsx";
import HisReportCVRecommend from "@views/employers/components/Acctivities/HisReportCVRecommend/HisReportCVRecommend.jsx";
import { FaHistory } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { TbMessageCircleUp } from "react-icons/tb";
export default function AccountAcctivities() {
    const tabs = [
        { icon: FaHistory, key: "all", label: "Tất cả lịch sử", path: "/employer/account/activities" },
        { icon: IoIosSettings, key: "hisUpdateAccount", label: "Lịch sử dụng cập nhật tài khoản", path: "/employer/account/activities/account-setting" },
        { icon: TbMessageCircleUp, key: "hisReportCVSearch", label: "Lịch sử báo cáo CV tìm kiếm", path: "/employer/account/activities/report-cv-search" },
        { icon: TbMessageCircleUp, key: "hisReportCVRecommend", label: "Lịch sử báo cáo CV đề xuất", path: "/employer/account/activities/report-recommend-cv" },
    ];
    return (
        <div className={styles.accountWrapper}>
            <div className={styles.accountContainer}>
                <div className={styles.sidebar}>
                    <AccountTabs tabs={tabs} />
                </div>
                <div className={styles.content}>
                    <Routes>
                        <Route index element={<AllHistory />} />
                        <Route path="account-setting" element={<HisUpdateAccount />} />
                        <Route path="report-cv-search" element={<HisReportCVSearch />} />
                        <Route path="report-recommend-cv" element={<HisReportCVRecommend />} />
                        {/* Nếu không có gì thì mặc định chuyển sang "activities" */}
                        <Route path="*" element={<Navigate to="." replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}