import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/redux/slices/globalSlice';
import styles from './ChangePasswordModal.module.scss';
import employerService from '@api/adminEmployer.js';
import PropTypes from 'prop-types';
export default function ChangePasswordModal({ recruiter, onClose }) {
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChangePassword = async () => {
    if (!newPassword || !reNewPassword) return dispatch(setNotification({ message: 'Vui lòng nhập đủ password để thay đổi', type: 'info' }));
    if (newPassword !== reNewPassword) return dispatch(setNotification({ message: 'Mật khẩu không khớp với mật khẩu cũ', type: 'error' }));

    try {
      setLoading(true);
      await employerService.adminChangePassword(recruiter.id, { newPassword, reNewPassword });
      dispatch(setNotification({ message: 'Đổi mật khẩu thành công!', type: 'success' }));
      onClose();
    } catch (err) {
      dispatch(setNotification({ message: 'Lỗi: ' + err.response?.data?.message, type: 'error' }));
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
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          value={reNewPassword}
          onChange={(e) => setReNewPassword(e.target.value)}
          className={styles.input}
        />

        <div className={styles.modalButtons}>
          <button className={styles.btnPrimary} onClick={handleChangePassword} disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Xác nhận'}
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
