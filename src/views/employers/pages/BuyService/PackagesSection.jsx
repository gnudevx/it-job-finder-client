import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PackageCard from './PackageCard';
import styles from './PackagesSection.module.scss';
import { PACKAGES } from './constants.js';
import employerSerivce from '@/api/employerSerivce';
const PackagesSection = () => {
    const navigate = useNavigate();
    const [selectedPackageId, setSelectedPackageId] = useState(null);// mặc định Free
    const tierToPackage = {
        FREE: 'pkg_basic',
        PRO: 'pkg_pro',
        ENTERPRISE: 'pkg_enterprise'
    };
    useEffect(() => {
        const fetchEmployer = async () => {
            const res = await employerSerivce.getMe();
            const tier = res.user.tier;
            console.log("helooo", tier)

            setSelectedPackageId(tierToPackage[tier]);
        };
        fetchEmployer();
    }, []);

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
