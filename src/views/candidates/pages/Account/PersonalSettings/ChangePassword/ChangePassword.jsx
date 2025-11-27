import React from "react";
import useChangePassword from "@/hooks/useChangePassword";
import { useAuth } from "@/contexts/AuthContext.jsx";
import styles from "./ChangePassword.module.scss";

export default function ChangePassword() {
  const { user, initialized } = useAuth();
  const { formData, updateField, changePassword, loading } = useChangePassword();

  if (!initialized) return "Đang tải...";

  const email = user?.email || "Không xác định";

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await changePassword();
    if (!result.ok) {
      window.alert(result.message);
      return;
    }
    window.alert("Đổi mật khẩu thành công!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Thay đổi mật khẩu đăng nhập</h2>

        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.formGroup}>
            <label>Email đăng nhập</label>
            <input type="email" value={!initialized ? "Đang tải..." : email} disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Mật khẩu hiện tại</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Nhập lại mật khẩu mới</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.saveBtn} disabled={loading}>
            {loading ? "Đang xử lý..." : "Lưu"}
          </button>
        </form>
      </div>
    </div>
  );
}
