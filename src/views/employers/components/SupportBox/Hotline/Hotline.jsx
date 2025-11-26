import React from "react";
import styles from "./Hotline.module.scss";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
export default function Hotline() {
    return (
        <div>
            <h3>Hotline CSKH & Hỗ trợ dịch vụ</h3>
            <p>Chúng tôi rất sẵn lòng được hỗ trợ bạn. Vui lòng liên hệ theo thông tin bên dưới để nhận trợ giúp.</p>
            <div className={styles.contactInfo}>
                <div className={styles.infoItem}>
                    <div className={styles.iconWrapper}>
                        <FaPhoneAlt className={styles.icon} />
                    </div>
                    <span className={styles.value}>(024)72072798</span>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.iconWrapper}>
                        <FaPhoneAlt className={styles.icon} />
                    </div>
                    <span className={styles.value}>0862621939</span>
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