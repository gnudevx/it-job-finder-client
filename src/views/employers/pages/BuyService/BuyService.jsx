import React from "react";
import styles from "./BuyService.module.scss";
import PackagesSection from "./PackagesSection";
export default function Account() {
    return (
        <div className={styles.pageWrap}>
            <div className={styles.headerSpacer} />
            <div className={styles.container}>
                <PackagesSection />
            </div>
        </div>
    );
}
