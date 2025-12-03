import React from 'react';
import PropTypes from 'prop-types';
import styles from './NotificationHistory.module.scss';
import { Users, User, CheckCircle2 } from 'lucide-react';
import { NotificationType } from './types';

const NotificationHistory = ({ history, role }) => {

    const getBadgeStyle = (type) => {
        switch (type) {
            case NotificationType.FEATURE: return styles.purpleBadge;
            case NotificationType.ALERT: return styles.redBadge;
            case NotificationType.PROMOTION: return styles.yellowBadge;
            default: return styles.blueBadge;
        }
    };

    const getLabelByType = (type) => {
        switch (type) {
            case NotificationType.FEATURE: return 'Tính năng mới';
            case NotificationType.ALERT: return 'Cảnh báo';
            case NotificationType.PROMOTION: return 'Khuyến mãi';
            default: return 'Hệ thống';
        }
    };

    return (
        <div className={styles.history}>
            <div className={styles.header}>
                <h2>Lịch Sử Gửi</h2>
                <span>{history.filter(h => h.recipientRole === role).length}</span>
            </div>

            <div className={styles.list}>
                {history.length === 0 ? (
                    <div className={styles.noHistory}>Chưa có thông báo nào</div>
                ) : (
                    history.filter(h => h.recipientRole === role).map(item => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.row}>
                                <span className={`${styles.badge} ${getBadgeStyle(item.type)}`}>
                                    {getLabelByType(item.type)}
                                </span>
                                <small>{item.sentAt.split(' ')[0]}</small>
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.message}</p>
                            <div className={styles.footer}>
                                <div className={styles.receiver}>
                                    {item.recipientId === 'ALL' ? <Users size={12} /> : <User size={12} />}
                                    {item.recipientId === 'ALL' ? 'Tất cả user' : 'User cụ thể'}
                                </div>
                                <div className={styles.status}>
                                    <CheckCircle2 size={12} /> Đã gửi
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

NotificationHistory.propTypes = {
    history: PropTypes.array.isRequired,
    role: PropTypes.string.isRequired,
};

export default NotificationHistory;
