import React, { useState } from "react";
import styles from "./ChangePasswordModal.module.scss";
import employerService from "@api/adminEmployer.js";
import PropTypes from "prop-types";
export default function ChangePasswordModal({ recruiter, onClose }) {
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!newPassword || !reNewPassword) return alert("Vui lòng nhập đủ password để thay đổi");
        if (newPassword !== reNewPassword) return alert("Mật khẩu không khớp với mật khẩu cũ");

        try {
            setLoading(true);
            await employerService.adminChangePassword(recruiter.id, { newPassword, reNewPassword });
            alert("Đổi mật khẩu thành công!");
            onClose();
        } catch (err) {
            alert("Lỗi: " + err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h3>Đổi mật khẩu cho {recruiter.companyName}</h3>

                <input
                    type="password"
                    placeholder="Mật khẩu mới"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                    value={reNewPassword}
                    onChange={e => setReNewPassword(e.target.value)}
                    className={styles.input}
                />

                <div className={styles.modalButtons}>
                    <button className={styles.btnPrimary} onClick={handleChangePassword} disabled={loading}>
                        {loading ? "Đang xử lý..." : "Xác nhận"}
                    </button>
                    <button className={styles.btnSecondary} onClick={onClose} disabled={loading}>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}
ChangePasswordModal.propTypes = {
    recruiter: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};