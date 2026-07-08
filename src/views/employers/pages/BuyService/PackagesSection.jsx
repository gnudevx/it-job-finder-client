import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PackageCard from './PackageCard';
import styles from './PackagesSection.module.scss';
import { PACKAGES } from './constants.js';
import employerSerivce from '@/api/employerSerivce';
import { toast } from 'sonner';
const PackagesSection = () => {
  const navigate = useNavigate();
  const [selectedPackageId, setSelectedPackageId] = useState(null); // mặc định Free
  const [notice, setNotice] = useState('');
  const [isUpdatingFree, setIsUpdatingFree] = useState(false);
  const noticeTimerRef = useRef(null);
  const tierToPackage = {
    FREE: 'pkg_basic',
    PRO: 'pkg_pro',
    ENTERPRISE: 'pkg_enterprise',
  };
  useEffect(() => {
    const fetchEmployer = async () => {
      const res = await employerSerivce.getMe();
      const tier = res.user.tier;
      console.log('helooo', tier);

      setSelectedPackageId(tierToPackage[tier]);
    };
    fetchEmployer();
  }, []);

  const handleCheckout = async (pkg) => {
    if (pkg.tier === 'FREE') {
      setIsUpdatingFree(true);
      setNotice('Đang cập nhật gói Khởi Đầu...');

      try {
        await employerSerivce.selectPackage(pkg.tier);
        setSelectedPackageId(pkg.id); // lưu gói đang chọn sau khi DB cập nhật thành công
        setNotice('Đã chọn gói Khởi Đầu');
        toast.success('Đã chọn gói Khởi Đầu');
      } catch (error) {
        console.error('Select free package error:', error);
        setNotice('Cập nhật gói Khởi Đầu thất bại');
        toast.error(error?.response?.data?.message || 'Không thể cập nhật gói Khởi Đầu');
      } finally {
        setIsUpdatingFree(false);
        if (noticeTimerRef.current) {
          window.clearTimeout(noticeTimerRef.current);
        }
        noticeTimerRef.current = window.setTimeout(() => setNotice(''), 1600);
      }

      return;
    }

    setSelectedPackageId(pkg.id); // lưu gói đang chọn

    // Chuyển sang trang thanh toán với react-router
    navigate(`/employer/payment/${pkg.id}`);
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Chính sách giá minh bạch</h2>
        <p>Chọn gói phù hợp nhất với nhu cầu tuyển dụng của doanh nghiệp bạn.</p>
      </div>

      <div className={styles.grid}>
        {PACKAGES.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            isSelected={pkg.id === selectedPackageId} // truyền state
            onCheckout={() => handleCheckout(pkg)}
            isLoading={pkg.tier === 'FREE' && isUpdatingFree}
          />
        ))}
      </div>

      {notice && (
        <div className={styles.noticeOverlay} role="status" aria-live="polite">
          <div className={styles.noticeCard}>{notice}</div>
        </div>
      )}
    </div>
  );
};
export default PackagesSection;
