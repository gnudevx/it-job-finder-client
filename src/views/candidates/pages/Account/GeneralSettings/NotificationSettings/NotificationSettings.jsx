import React, { useState } from "react";
import styles from "./NotificationSettings.module.scss";

export default function NotificationSettings() {
    const [settings, setSettings] = useState({
        systemUpdates: true,
        cvViewed: true,
        otherSystem: true,
        interviewInvite: true,
    });

    const toggle = (field) => {
        setSettings(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className={styles.settingsContainer}>
            <h2 className={styles.groupTitle}>Cài đặt thông báo</h2>

            {/* --- Nhà tuyển dụng xem CV --- */}
            <div className={styles.settingBox} onClick={() => toggle("cvViewed")}>
                <div className={styles.checkboxRow}>
                    <div
                        className={`${styles.checkboxCustom} ${
                            settings.cvViewed ? styles.checked : ""
                        }`}
                    ></div>

                    <div>
                        <div className={styles.settingLabel}>Nhà tuyển dụng đã xem CV</div>
                        <div className={styles.settingDesc}>
                            Bạn sẽ nhận thông báo khi CV được nhà tuyển dụng xem.
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Thông báo khác từ hệ thống --- */}
            <div className={styles.settingBox} onClick={() => toggle("otherSystem")}>
                <div className={styles.checkboxRow}>
                    <div
                        className={`${styles.checkboxCustom} ${
                            settings.otherSystem ? styles.checked : ""
                        }`}
                    ></div>

                    <div>
                        <div className={styles.settingLabel}>Thông báo khác từ hệ thống</div>
                        <div className={styles.settingDesc}>
                            Bao gồm các thông báo dịch vụ, cập nhật nhỏ, nhắc nhở...
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Mời phỏng vấn --- */}
            <div className={styles.settingBox} onClick={() => toggle("interviewInvite")}>
                <div className={styles.checkboxRow}>
                    <div
                        className={`${styles.checkboxCustom} ${
                            settings.interviewInvite ? styles.checked : ""
                        }`}
                    ></div>

                    <div>
                        <div className={styles.settingLabel}>
                            Nhà tuyển dụng gửi mời phỏng vấn / ứng tuyển
                        </div>
                        <div className={styles.settingDesc}>
                            Nhận thông báo ngay khi có lời mời ứng tuyển hoặc phỏng vấn.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
