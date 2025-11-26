import React from 'react';
import styles from './CampaignRow.module.scss';
import ToggleSwitch from '@/views/employers/components/CampaignsEmployer/ToggleSwitch/ToggleSwitch';
import PropTypes from 'prop-types';


const CampaignRow = ({ campaign }) => {
    return (
        <>
            <div className={styles.campaignCell}>
                <div className={styles.leftCol}>
                    <ToggleSwitch defaultOn />
                    <div className={styles.info}>
                        <div className={styles.id}>{campaign.id}</div>
                        <div className={styles.title}>{campaign.title}</div>
                        <div className={styles.subtitle}>Chưa có CV nào</div>
                    </div>
                </div>
            </div>


            <div className={styles.optimizeCell}>{campaign.percent}%</div>


            <div className={styles.postCell}>
                <div className={styles.postTag}>Đăng tin</div>
            </div>


            <div className={styles.cvCell}>
                <div className={styles.cvTitle}>CV đề xuất</div>
                <div className={styles.cvActions}>
                    <span className={styles.badge}>Chưa kích hoạt</span>
                    <button className={styles.linkBtn} aria-label="Xem CV đề xuất">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className={styles.linkText}>Xem CV đề xuất</span>
                    </button>
                </div>
            </div>


            <div className={styles.filterCell}><button className={styles.ghostBtn}>Tìm CV</button></div>


            <div className={styles.serviceCell}><button className={styles.ghostBtn}>Thêm</button></div>
        </>
    );
};


CampaignRow.propTypes = {
    campaign: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        percent: PropTypes.number.isRequired,
    }).isRequired,
};


export default CampaignRow;