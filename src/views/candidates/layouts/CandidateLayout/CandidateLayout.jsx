import React from "react";
import HeaderCandidate from "@/views/candidates/components/Header/HeaderCandidate/HeaderCandidate.jsx";
import { Outlet } from "react-router-dom";
import styles from "@/views/candidates/layouts/CandidateLayout/CandidateLayout.module.scss";
import Footer from "../../components/Footer/Footer";

export default function CandidateLayout() {
    return (
        <div className={styles["layout-container"]}>
            <HeaderCandidate />

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
