import React, { useState, useEffect } from "react";
import VerificationForm from "../Verification/VerificationForm";
import styles from "./PersonalInfo.module.scss";
import avt from "@assets/logo.jpg"
import employerService from "@/services/employerSerivce.js"

export default function PersonalInfoForm() {
    const [form, setForm] = useState({
        fullName: "",
        gender: "",
        phone: "",
        avatar: "",
    });
    const [user, setUser] = useState()
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await employerService.getMe();
                setUser(res.user);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMe();
    }, []);
    useEffect(() => {
        if (user) {
            setForm({
                fullName: user.fullName || "",
                gender: user.gender === "Nam" ? "male" : user.gender === "Nữ" ? "female" : "other",
                phone: user.phone || "",
                avatar: user.avatar || "",
            });
        }
    }, [user]);
    const handleChange = (key) => (e) => {
        setForm((s) => ({ ...s, [key]: e.target.value }));
    };

    const handleSave = async () => {
        try {
            const res = await employerService.update(user.userID, form);

            // cập nhật user trong context luôn
            setUser(res.user);

            alert("Cập nhật thông tin thành công!");
        } catch (err) {
            console.error(err);
            alert("Không thể cập nhật thông tin!");
        }
    };

    if (!user) return <p>Đang tải...</p>;
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
                        <input type="text" value={form.fullName} onChange={handleChange("fullName")} />
                    </div>

                    <div className={styles.field}>
                        <label>Giới tính</label>
                        <select value={form.gender} onChange={handleChange("gender")}>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="Khác">Khác</option>
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
                            value={form.phone}
                            readOnly
                            aria-readonly="true"
                        />
                    </div>

                </div>

                <div className={styles.actions}>
                    <button className={styles.cancel}>Hủy</button>
                    <button className={styles.save} onClick={handleSave}>Lưu</button>
                </div>
            </div>
        </>
    );
}
