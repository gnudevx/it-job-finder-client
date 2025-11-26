import React from "react";
import styles from "./Recruitment.module.scss";
import avt from "@assets/logo.jpg"
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
export default function Recruitment() {
    return (
        <div className={styles.container}>
            <h3>Tư vấn tuyển dụng</h3>
            <p>Nhân viên tư vấn đang trực tuyến sẵn sàng hỗ trợ</p>
            <div className={`${styles.field} ${styles.avatarField}`}>
                <div className={styles.avatarSection}>
                    <div className={styles.avatarPreview}>
                        <img
                            src={avt}
                            alt="avatar"
                        />
                    </div>
                </div>
                <label>Nguyen Duc Dung</label>
            </div>
            <div className={styles.contactInfo}>
                <div className={styles.infoItem}>
                    <div className={styles.iconWrapper}>
                        <FaPhoneAlt className={styles.icon} />
                    </div>
                    <span className={styles.value}>0987654321</span>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.iconWrapper}>
                        <IoMdMail className={styles.icon} />
                    </div>
                    <span className={styles.value}>gnudevx@gmail.com</span>
                </div>
            </div>
        </div>
    );
}
