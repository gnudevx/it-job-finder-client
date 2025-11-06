import React, { useState } from "react";
import Header from "@components/candidates/Header/Header.jsx";
import Sidebar from "@components/candidates/Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import styles from "./CandidateLayout.module.scss";

export default function CandidateLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={styles["layout-container"]}>
            <Header onToggleSidebar={() => setIsCollapsed((prev) => !prev)} />

            <div className={styles["content-wrapper"]}>
                <div
                    className={`${styles["sidebar"]} ${
                        isCollapsed ? styles["collapsed"] : ""
                    }`}
                >
                    <Sidebar isCollapsed={isCollapsed} />
                </div>

                <div className={styles["main-content"]}>
                    <div className={styles["page-container"]}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}