import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./AccountSettings.module.scss";
import AccountTabs from "@/components/employers/AccountSidebar/AccountSidebar.jsx";
import ChangePassword from "@/views/employers/components/Account/ChangePassword/ChangePassword.jsx";
import PersonalInfo from "@/views/employers/components/Account/PersonalInfo/PersonalInfo/PersonalInfo.jsx";
import BusinessLicense from "@/views/employers/components/Account/BusinessLicense/BusinessLicense.jsx";
import Settings from "@/views/employers/components/Account/Settings/Settings.jsx";
import Company from "@/views/employers/components/CompanyInfo/CompanyInfo.jsx";
import { IoLockClosed, IoDocument } from "react-icons/io5";
import { IoMdPerson, IoIosBusiness, IoIosSettings } from "react-icons/io";
export default function Account() {
    const tabs = [
        { icon: IoLockClosed, key: "password", label: "Đổi mật khẩu", path: "/employer/account/settings/password" },
        { icon: IoMdPerson, key: "personal", label: "Thông tin cá nhân", path: "/employer/account/settings/personal" },
        { icon: IoDocument, key: "license", label: "Giấy đăng ký doanh nghiệp", path: "/employer/account/settings/license" },
        { icon: IoIosBusiness, key: "companyinfo", label: "Thông tin công ty", path: "/employer/account/settings/company-info" },
        { icon: IoIosSettings, key: "settings", label: "Cài đặt", path: "/employer/account/settings/cv-applied" },
    ];
    return (
        <div className={styles.accountWrapper}>
            <div className={styles.accountContainer}>
                <div className={styles.sidebar}>
                    <AccountTabs tabs={tabs} />
                </div>
                <div className={styles.content}>
                    <Routes>
                        <Route path="password" element={<ChangePassword />} />
                        <Route path="personal" element={<PersonalInfo />} />
                        <Route path="license" element={<BusinessLicense />} />
                        <Route path="company-info" element={<Company />} />
                        <Route path="cv-applied" element={<Settings />} />
                        {/* Nếu không có gì thì mặc định chuyển sang "password" */}
                        <Route index element={<Navigate to="password" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
