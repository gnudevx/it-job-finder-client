import React from "react";
import styles from "./PersonalInfo.module.scss";
import usePersonalInfo from "@/hooks/usePersonalInfo";

export default function PersonalInfo() {
    const { formData, updateField, save } = usePersonalInfo();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        save();
        alert("Lưu thông tin thành công!");
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>Cài đặt thông tin cá nhân</h2>
                <p className={styles.note}>
                    <span className={styles.required}>*</span> Các thông tin bắt buộc
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Họ và tên */}
                    <label htmlFor="fullName">
                        Họ và tên <span className={styles.required}>*</span>
                    </label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Nhập họ và tên"
                    />

                    {/* Số điện thoại */}
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại"
                    />

                    {/* Email - cố định */}
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        disabled
                    />

                    <button type="submit" className={styles.saveBtn}>
                        Lưu
                    </button>
                </form>
            </div>
        </div>
    );
}
