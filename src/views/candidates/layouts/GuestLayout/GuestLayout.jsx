import React from "react";
import { Outlet } from "react-router-dom";
import HeaderGuest from "@/views/candidates/components/Header/HeaderGuest/HeaderGuest.jsx";
import styles from "./GuestLayout.module.scss";

export default function GuestLayout() {
    return (
        <div className={styles["layout-container"]}>
            <HeaderGuest />

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
