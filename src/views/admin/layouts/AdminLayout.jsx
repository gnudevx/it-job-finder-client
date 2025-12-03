import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "@/components/admin/Sidebar/AdminSidebar.jsx";
import AdminHeader from "@/components/admin/Header/AdminHeader.jsx";
import styles from "./AdminLayout.module.scss";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const pageTitles = {
    "/admin/dashboard": "Admin Dashboard",
    "/admin/manage/recruiment": "Quản lý tin tuyển dụng",
    "/admin/notification/candidate": "Thông báo Candidate",
    "/admin/notification/employer": "Thông báo Employer",
    "/admin/manage/business-license": "Giấy Đăng Ký Doanh Nghiệp",
    "/admin/manage/candidates": "Quản Lý Candidate",
    "/admin/manage/employers": "Quản Lý Employer",
  };

  const currentTitle = pageTitles[location.pathname] || "Admin";

  return (
    <div className={styles.layoutContainer}>
      <div
        className={`${styles.header} ${isCollapsed ? styles.headerCollapsed : ""
          }`}
      >
        <AdminHeader
          onToggleSidebar={() => setIsCollapsed(prev => !prev)}
          title={currentTitle}
        />
      </div>

      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""
          }`}
      >
        <AdminSidebar isCollapsed={isCollapsed} />
      </aside>

      <main
        className={`${styles.main} ${isCollapsed ? styles.mainCollapsed : ""
          }`}
      >
        <div className={styles.pageContainer}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
