import React from "react";
import { Outlet } from "react-router-dom";
import HeaderWrapper from "@/views/candidates/components/Header/HeaderWrapper.jsx";
import styles from "./GuestLayout.module.scss";
import Footer from "../../components/Footer/Footer";

export default function GuestLayout() {
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
            <Footer />
        </div>
    );
}
