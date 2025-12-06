import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, FileText } from 'lucide-react';
import styles from './ManageBusinessLicense.module.scss';
import adminLicenseApi from '@/api/jobApiAdminService.js';

export const LicenseStatus = {
  PENDING: 'pending',
  VERIFIED: 'approved',
  REJECTED: 'rejected',
};

const ManageBusinessLicense = () => {
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy data từ backend
  const fetchData = async () => {
    try {
      const resPending = await adminLicenseApi.getPendingLicenses();
      setPending(resPending.employers || []);

      const resHistory = await adminLicenseApi.getHistory();
      setHistory(resHistory.history || []);
    } catch (err) {
      console.error(err);
      alert('Lỗi khi tải dữ liệu');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReview = async (id, status) => {
    try {
      setLoading(true);
      const res = await adminLicenseApi.updateLicenseStatus(id, status);
      // axios trả về res.data
      console.log('Kết quả đánh giá:', res);
      setPending(prev => prev.filter(e => e.id !== id));
      setHistory(prev => [res.employer, ...prev]);
    } catch (err) {
      console.error(err);
      alert('Đánh giá thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Xác Thực Giấy Phép Kinh Doanh</h1>
      <p className={styles.subTitle}>Kiểm tra và xác nhận giấy tờ pháp lý của nhà tuyển dụng.</p>

      {/* Danh sách pending */}
      <div className={styles.cardList}>
        {pending.length > 0 ? (
          pending.map(emp => (
            console.log(emp),
            <div key={emp.id} className={styles.card}>
              <div className={styles.cardLeft}>
                <div className={styles.iconWrapper}>
                  <FileText size={32} />
                </div>
                <div>
                  <h3 className={styles.companyName}>{emp.companyName}</h3>
                  <p className={styles.text}>Người đại diện: {emp.fullName}</p>
                  <p className={styles.text}>Email: {emp.email}</p>
                  {emp.licenseDocUrl && (
                    <a href={`http://localhost:5000${emp.licenseDocUrl}`} target="_blank" rel="noreferrer">
                      Xem giấy phép
                    </a>
                  )}
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.rejectBtn}
                  disabled={loading}
                  onClick={() => handleReview(emp.id, LicenseStatus.REJECTED.toLowerCase())}
                >
                  <XCircle size={18} /> Từ chối
                </button>
                <button
                  className={styles.verifyBtn}
                  disabled={loading}
                  onClick={() => handleReview(emp.id, LicenseStatus.VERIFIED.toLowerCase())}
                >
                  <CheckCircle size={18} /> Xác nhận hợp lệ
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyBox}>
            <CheckCircle size={48} />
            <h3 className={styles.emptyTitle}>Tuyệt vời!</h3>
            <p className={styles.emptyText}>Không có giấy phép nào đang chờ xử lý.</p>
          </div>
        )}
      </div>

      {/* Lịch sử */}
      <div className={styles.history}>
        <h2 className={styles.historyTitle}>Lịch sử xác thực gần đây</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Doanh nghiệp</th>
              <th>Trạng thái</th>
              <th>Ngày duyệt</th>
            </tr>
          </thead>
          <tbody>
            {history.map(e => (
              <tr key={e.id}>
                <td>{e.companyName}</td>
                <td>
                  <span className={e.licenseStatus === LicenseStatus.VERIFIED ? styles.statusVerified : styles.statusRejected}>
                    {e.licenseStatus === LicenseStatus.VERIFIED ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {e.licenseStatus}
                  </span>
                </td>
                <td>{e.reviewedAt ? new Date(e.reviewedAt).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBusinessLicense;
