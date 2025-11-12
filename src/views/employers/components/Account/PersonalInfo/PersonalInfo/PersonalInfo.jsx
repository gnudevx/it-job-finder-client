import React from "react";
import VerificationForm from "../Verification/VerificationForm";
import styles from "./PersonalInfo.module.scss";
import avt from "@assets/logo.jpg"
export default function PersonalInfoForm() {
    return (
        <>
            <VerificationForm />
            <div className={styles.card}>
                <h4 className={styles.sectionTitle}>Cập nhật thông tin cá nhân</h4>

                <div className={styles.formGrid}>
                    <div className={`${styles.field} ${styles.avatarField}`}>
                        <label>Avatar</label>
                        <div className={styles.avatarSection}>
                            <div className={styles.avatarPreview}>
                                <img
                                    src={avt}
                                    alt="avatar"
                                />
                            </div>
                            <button className={styles.uploadBtn}>Đổi avatar</button>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <p>Email: gnudevx@gmail.com</p>
                    </div>

                    <div className={styles.field}>
                        <label>Họ và tên</label>
                        <input type="text" value="Dũng Nguyễn Đức" />
                    </div>

                    <div className={styles.field}>
                        <label>Giới tính</label>
                        <select>
                            <option>Nam</option>
                            <option>Nữ</option>
                            <option>Khác</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.rowTop}>
                            <label className={styles.phoneLabel}>Số điện thoại</label>

                            <div className={styles.topActions}>
                                <button className={styles.updateBtn}>Cập nhật</button>
                                <button className={styles.verifyBtn}>Xác thực</button>
                            </div>
                        </div>

                        <input
                            className={styles.phoneInput}
                            type="text"
                            value="0389355132"
                            readOnly
                            aria-readonly="true"
                        />
                    </div>

                </div>

                <div className={styles.actions}>
                    <button className={styles.cancel}>Hủy</button>
                    <button className={styles.save}>Lưu</button>
                </div>
            </div>
        </>
    );
}
