import React from 'react';
import styles from './CampaignTable.module.scss';
import CampaignRow from '@/views/employers/components/CampaignsEmployer/CampaignRow/CampaignRow';


const mock = [
    { id: '#2335067', title: 'ádádsadsad', percent: 24 },
    { id: '#2335066', title: 'Ádasdsads', percent: 36 },
    { id: '#2251974', title: '112321321', percent: 24 },
];


const CampaignTable = () => {
    return (
        <section className={styles.card} aria-label="Danh sách chiến dịch">
            <div className={styles.cardHeader}>Tìm thấy <strong>3</strong> chiến dịch tuyển dụng</div>
            <div className={styles.grid}>
                {/* column headers */}
                <div className={styles.colHeader}>Chiến dịch tuyển dụng</div>
                <div className={styles.colHeader}>Tối ưu</div>
                <div className={styles.colHeader}>Tin tuyển dụng</div>
                <div className={styles.colHeader}>CV từ hệ thống</div>
                <div className={styles.colHeader}>Lọc CV</div>
                <div className={styles.colHeader}>Dịch vụ đang chạy</div>


                {/* rows */}
                {mock.map((c) => (
                    <div className={styles.campaignRow} key={c.id}>
                        <CampaignRow campaign={c} />
                    </div>
                ))}
            </div>
        </section>
    );
};


export default CampaignTable;