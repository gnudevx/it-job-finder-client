import React, { useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar/AdminSidebar.jsx";
import AdminHeader from "@/components/admin/Header/AdminHeader.jsx";
import { Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.scss";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.layoutContainer}>

      {/* HEADER — luôn nằm trên cùng */}
      <div
        className={`${styles.header} ${isCollapsed ? styles.headerCollapsed : ""
          }`}
      >
        <AdminHeader onToggleSidebar={() => setIsCollapsed(prev => !prev)} />
      </div>

      {/* SIDEBAR — nằm dưới header */}
      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""
          }`}
      >
        <AdminSidebar isCollapsed={isCollapsed} />
      </aside>

      {/* MAIN */}
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

