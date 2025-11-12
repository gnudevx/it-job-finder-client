import React, { useState } from "react";
import styles from "./Settings.module.scss";
import { Mail } from "lucide-react";

export default function AccountSettings() {
    const [isActive, setIsActive] = useState(true);

    return (
        <div className={styles.wrapper}>
            <h3>Cài đặt nhận thông báo đến email tài khoản</h3>

            <div className={styles.settingCard}>
                <div className={styles.info}>
                    <div className={styles.icon}><Mail size={20} /></div>
                    <div>
                        <p className={styles.title}>Thông báo CV ứng tuyển</p>
                        <p className={styles.desc}>
                            Tự động gửi email khi ứng viên ứng tuyển vào tin tuyển dụng của bạn
                        </p>
                    </div>
                </div>

                <div className={styles.toggle}>
                    <span className={isActive ? styles.activeStatus : styles.inactiveStatus}>
                        {isActive ? "Đang hoạt động" : "Tắt"}
                    </span>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => setIsActive(!isActive)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>
        </div>
    );
}
