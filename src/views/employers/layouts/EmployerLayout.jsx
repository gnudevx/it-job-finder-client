import React, { useState } from "react";
import Header from "@components/employers/Header/Header.jsx";
import Sidebar from "@/components/employers/Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import styles from "./EmployerLayout.module.scss";
export default function EmployerLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className={styles["layout-container"]}>
            {/* Header nằm trên cùng */}
            <Header onToggleSidebar={() => setIsCollapsed((prev) => !prev)} />

            <div className={styles["content-wrapper"]}>
                {/* Sidebar bên trái */}
                <div
                    className={`${styles["sidebar"]} ${isCollapsed ? styles["collapsed"] : ""
                        }`}
                >
                    <Sidebar isCollapsed={isCollapsed} />
                </div>

                {/* Khu vực nội dung chính */}
                <div className={styles["main-content"]}>
                    <div className={styles["page-container"]}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>

    );
}
