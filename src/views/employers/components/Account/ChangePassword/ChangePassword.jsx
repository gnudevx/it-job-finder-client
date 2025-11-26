import React from "react";
import styles from "./ChangePassword.module.scss";

export default function ChangePassword() {
    return (
        <div className={styles.formWrapper}>
            <h3>Thay đổi mật khẩu</h3>
            <div className={styles.form}>
                <label>Mật khẩu mới</label>
                <input type="password" placeholder="Nhập mật khẩu mới" />
                <label>Nhập lại mật khẩu</label>
                <input type="password" placeholder="Nhập lại mật khẩu" />
                <div className={styles.actions}>
                    <label>
                        <input type="checkbox" /> Thoát tất cả phiên đăng nhập hiện tại
                    </label>
                    <div className={styles.buttons}>
                        <button className={styles.cancel}>Hủy</button>
                        <button className={styles.save}>Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    );
}