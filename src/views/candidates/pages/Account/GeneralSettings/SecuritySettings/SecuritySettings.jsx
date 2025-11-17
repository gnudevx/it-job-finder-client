import React, { useState } from "react";
import styles from "./SecuritySettings.module.scss";

export default function SecuritySettings() {
    const [security, setSecurity] = useState({
        newDeviceLogin: true,
        abnormalLogin: true,
        rememberSession: false,
        hideEmail: false,
    });

    const toggle = (field) => {
        setSecurity(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className={styles.settingsContainer}>
            <h2 className={styles.groupTitle}>Cài đặt bảo mật</h2>

            {/* --- New Device Login --- */}
            <div className={styles.settingBox} onClick={() => toggle("newDeviceLogin")}>
                <div className={styles.checkboxRow}>
                    <div
                        className={`${styles.checkboxCustom} ${
                            security.newDeviceLogin ? styles.checked : ""
                        }`}
                    ></div>

                    <div>
                        <div className={styles.settingLabel}>
                            Cho phép đăng nhập từ thiết bị mới
                        </div>
                        <div className={styles.settingDesc}>
                            Nhận cảnh báo khi tài khoản đăng nhập từ thiết bị lạ.
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Abnormal Login --- */}
            <div className={styles.settingBox} onClick={() => toggle("abnormalLogin")}>
                <div className={styles.checkboxRow}>
                    <div
                        className={`${styles.checkboxCustom} ${
                            security.abnormalLogin ? styles.checked : ""
                        }`}
                    ></div>

                    <div>
                        <div className={styles.settingLabel}>Cảnh báo đăng nhập bất thường</div>
                        <div className={styles.settingDesc}>
                            Bật tính năng để nhận thông báo khi phát hiện hành vi bất thường.
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Remember Session --- */}
            <div className={styles.settingBox} onClick={() => toggle("rememberSession")}>
                <div className={styles.checkboxRow}>
                    <div
                        className={`${styles.checkboxCustom} ${
                            security.rememberSession ? styles.checked : ""
                        }`}
                    ></div>

                    <div>
                        <div className={styles.settingLabel}>Cho phép lưu phiên đăng nhập</div>
                        <div className={styles.settingDesc}>
                            Giúp bạn đăng nhập nhanh hơn trong các lần truy cập tiếp theo.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
