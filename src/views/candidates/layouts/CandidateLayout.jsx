import React from "react";
import Header from "@components/candidates/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import styles from "@view/candidates/layouts/CandidateLayout.module.scss";

export default function CandidateLayout() {
    return (
        <div className={styles["layout-container"]}>
            <Header />

            <div className={styles["content-wrapper"]}>
                <div className={styles["main-content"]}>
                    <div className={styles["page-container"]}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
