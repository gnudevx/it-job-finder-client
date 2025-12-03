import React, { useState } from 'react';
import { LicenseStatus } from './LicenseStatus.jsx';
import { CheckCircle, XCircle, FileText, ExternalLink } from 'lucide-react';
import styles from './ManageBusinessLicense.module.scss';

const mockEmployers = [
  { id: '101', name: 'Nguyen Van A', email: 'hr@techcorp.com', companyName: 'Tech Corp', postLimit: 10, postsUsed: 2, licenseStatus: LicenseStatus.PENDING, licenseDocUrl: '#' },
  { id: '102', name: 'Tran Thi B', email: 'b@realestate.vn', companyName: 'Real Estate VN', postLimit: 5, postsUsed: 5, licenseStatus: LicenseStatus.VERIFIED },
];

const ManageBusinessLicense = () => {
  const [employers, setEmployers] = useState(mockEmployers);

  const updateStatus = (id, status) => {
    setEmployers(prev => prev.map(e => e.id === id ? { ...e, licenseStatus: status } : e));
  };

  const pendingLicenses = employers.filter(e => e.licenseStatus === LicenseStatus.PENDING);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Xác Thực Giấy Phép Kinh Doanh</h1>
      <p className={styles.subTitle}>Kiểm tra và xác nhận giấy tờ pháp lý của nhà tuyển dụng.</p>

      <div className={styles.cardList}>
        {pendingLicenses.length > 0 ? (
          pendingLicenses.map(emp => (
            <div key={emp.id} className={styles.card}>
              <div className={styles.cardLeft}>
                <div className={styles.iconWrapper}>
                  <FileText size={32} />
                </div>

                <div>
                  <h3 className={styles.companyName}>{emp.companyName}</h3>
                  <p className={styles.text}>Người đại diện: {emp.name}</p>
                  <p className={styles.text}>Email: {emp.email}</p>
                  <a href={emp.licenseDocUrl} className={styles.link}>
                    Xem giấy phép <ExternalLink size={14} className={styles.inlineIcon} />
                  </a>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  onClick={() => updateStatus(emp.id, LicenseStatus.REJECTED)}
                  className={styles.rejectBtn}
                >
                  <XCircle size={18} />
                  Từ chối
                </button>

                <button
                  onClick={() => updateStatus(emp.id, LicenseStatus.VERIFIED)}
                  className={styles.verifyBtn}
                >
                  <CheckCircle size={18} />
                  Xác nhận hợp lệ
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyBox}>
            <div className={styles.emptyIcon}>
              <CheckCircle size={48} />
            </div>
            <h3 className={styles.emptyTitle}>Tuyệt vời!</h3>
            <p className={styles.emptyText}>Không có giấy phép nào đang chờ xử lý.</p>
          </div>
        )}
      </div>

      {/* Lịch sử */}
      <div className={styles.history}>
        <h2 className={styles.historyTitle}>Lịch sử xác thực gần đây</h2>
        <div className={styles.historyTableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Doanh Nghiệp</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {employers.filter(e => e.licenseStatus !== LicenseStatus.PENDING).map(e => (
                <tr key={e.id}>
                  <td>{e.companyName}</td>
                  <td>
                    <span
                      className={
                        e.licenseStatus === LicenseStatus.VERIFIED
                          ? styles.statusVerified
                          : styles.statusRejected
                      }
                    >
                      {e.licenseStatus === LicenseStatus.VERIFIED ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      {e.licenseStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBusinessLicense;
