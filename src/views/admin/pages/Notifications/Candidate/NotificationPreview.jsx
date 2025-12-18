import React from 'react';
import PropTypes from 'prop-types';
import styles from './NotificationPreview.module.scss';
import { Info, Zap, Bell, AlertTriangle } from 'lucide-react';
import { NotificationType } from './types';

const NotificationPreview = ({ title, message, notifType }) => {
    // Chọn icon
    const Icon = (() => {
        switch (notifType) {
            case NotificationType.FEATURE: return Zap;
            case NotificationType.PROMOTION: return Bell;
            case NotificationType.ALERT: return AlertTriangle;
            default: return Info;
        }
    })();

    // Class border theo loại thông báo
    const borderColor = (() => {
        switch (notifType) {
            case NotificationType.FEATURE: return styles.borderPurple500;
            case NotificationType.PROMOTION: return styles.borderYellow500;
            case NotificationType.ALERT: return styles.borderRed500;
            default: return styles.borderBlue500;
        }
    })();

    // Class icon màu
    const iconColor = (() => {
        switch (notifType) {
            case NotificationType.FEATURE: return styles.textPurple600;
            case NotificationType.PROMOTION: return styles.textYellow600;
            case NotificationType.ALERT: return styles.textRed600;
            default: return styles.textBlue600;
        }
    })();

    return (
        <div className={styles.previewWrapper}>
            {/* Browser top */}
            <div className={styles.browserTop}>
                <div className={styles.circles}>
                    <span className={styles.red}></span>
                    <span className={styles.yellow}></span>
                    <span className={styles.green}></span>
                </div>
            </div>

            <div className={styles.previewContent}>
                {title || message ? (
                    <div className={`${styles.popup} ${borderColor}`}>
                        <div className={`${styles.icon} ${iconColor}`}>
                            <Icon size={18} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4>{title || 'Tiêu đề thông báo…'}</h4>
                            <p>{message || 'Nội dung thông báo sẽ hiển thị ở đây…'}</p>
                            <div className={styles.time}>Vừa xong</div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.hint}>Nhập nội dung để xem trước…</div>
                )}
            </div>
        </div>
    );
};

NotificationPreview.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    notifType: PropTypes.string.isRequired,
};

export default NotificationPreview;
