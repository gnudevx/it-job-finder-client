import React, { useState } from "react";
import styles from "./ChangePassword.module.scss";
import accountService from "@/api/accountService.js"
import { toast } from "sonner";
export default function ChangePassword() {
    const [form, setForm] = useState({
        newPassword: "",
        reNewPassword: "",
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        try {
            await accountService.changePassword(form);
            toast.success("Đổi mật khẩu thành công!");
            setForm({ newPassword: "", reNewPassword: "" });
        } catch (err) {
            console.log(err.response?.data?.message)
            toast.error(err.response?.data?.message || "Lỗi đổi mật khẩu!");
        }
    };
    return (
        <div className={styles.formWrapper}>
            <h3>Thay đổi mật khẩu</h3>
            <div className={styles.form}>
                <label>Mật khẩu mới</label>
                <input type="password" name="newPassword" placeholder="Nhập mật khẩu mới" value={form.newPassword} onChange={handleChange} />
                <label>Nhập lại mật khẩu</label>
                <input type="password" name="reNewPassword" placeholder="Nhập lại mật khẩu" value={form.reNewPassword}
                    onChange={handleChange} />
                <div className={styles.actions}>
                    <label>
                        <input type="checkbox" /> Thoát tất cả phiên đăng nhập hiện tại
                    </label>
                    <div className={styles.buttons}>
                        <button className={styles.cancel}>Hủy</button>
                        <button className={styles.save} onClick={handleSubmit} >Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    );
}