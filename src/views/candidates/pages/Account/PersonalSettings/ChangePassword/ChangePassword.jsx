import React, { useState } from "react";
import styles from "./ChangePassword.module.scss";

export default function ChangePassword() {
    const [formData, setFormData] = useState({
        email: "22110434@student.hcmute.edu.vn",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert("Mật khẩu mới và xác nhận không khớp!");
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
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                        />
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

                    {/* Nhập lại mật khẩu mới */}
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
