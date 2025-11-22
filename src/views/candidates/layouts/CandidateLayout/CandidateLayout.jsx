import React from "react";
import HeaderWrapper from "@views/candidates/components/Header/HeaderWrapper.jsx";
import { Outlet } from "react-router-dom";
import styles from "@views/candidates/layouts/CandidateLayout/CandidateLayout.module.scss";

export default function CandidateLayout() {
    return (
        <div className={styles["layout-container"]}>
            <HeaderWrapper />

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
