import React from "react";
import styles from "./ChangePassword.module.scss";
import useChangePassword from "@/hooks/useChangePassword";

export default function ChangePassword() {
    const { formData, updateField, changePassword } = useChangePassword();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = changePassword();

        if (!result.ok) {
            alert(result.message);
            return;
        }

        alert("Đổi mật khẩu thành công!");
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>Thay đổi mật khẩu đăng nhập</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    
                    {/* Email */}
                    <div className={styles.formGroup}>
                        <label>Email đăng nhập</label>
                        <input type="email" value={formData.email} disabled />
                    </div>

                    {/* Mật khẩu hiện tại */}
                    <div className={styles.formGroup}>
                        <label>Mật khẩu hiện tại</label>
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Nhập mật khẩu hiện tại"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Mật khẩu mới */}
                    <div className={styles.formGroup}>
                        <label>Mật khẩu mới</label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Nhập mật khẩu mới"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Xác nhận */}
                    <div className={styles.formGroup}>
                        <label>Nhập lại mật khẩu mới</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu mới"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.saveBtn}>
                        Lưu
                    </button>
                </form>
            </div>
        </div>
    );
}
