import React from 'react';
import styles from './CampaignsPage.module.scss';
import FilterBar from '@/views/employers/components/CampaignsEmployer/FilterBar/FilterBar';
import CampaignTable from '@/views/employers/components/CampaignsEmployer/CampaignTable/CampaignTable';


const CampaignsPage = () => {
    return (
        <div className={styles.pageWrap}>
            <div className={styles.headerSpacer} />
            <div className={styles.container}>
                <div className={styles.headerRow}>
                    <h1 className={styles.title}>Quản lý chiến dịch tuyển dụng</h1>
                    <button className={styles.addBtn}>+ Thêm chiến dịch mới</button>
                </div>
                <FilterBar />
                <CampaignTable />
            </div>
        </div>
    );
};

export default CampaignsPage;