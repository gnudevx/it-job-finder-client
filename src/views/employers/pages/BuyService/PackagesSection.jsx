import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PackageCard from './PackageCard';
import styles from './PackagesSection.module.scss';
import { PACKAGES } from './constants.js';

const PackagesSection = () => {
    const navigate = useNavigate();
    const [selectedPackageId, setSelectedPackageId] = useState('pkg_basic'); // mặc định Free

    useEffect(() => {
        console.log('Gói đang chọn:', selectedPackageId);
    }, [selectedPackageId]);

    const handleCheckout = (pkg) => {
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
                    />
                ))}
            </div>
        </div>
    );
};

export default PackagesSection;
