import React from 'react';
import styles from './NotificationForm.module.scss';
import { Users, User, Zap, Bell, AlertTriangle, Info, Send } from 'lucide-react';
import { NotificationType } from './types.js';
import PropTypes from 'prop-types';
const NotificationForm = ({
    title,
    message,
    recipientType,
    specificId,
    notifType,
    setTitle,
    setMessage,
    setRecipientType,
    setSpecificId,
    setNotifType,
    handleSend,
}) => {
    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            {/* Type */}
            <div className={styles.section}>
                <label>Loại thông báo</label>
                <div className={styles.typeGrid}>
                    {[
                        { id: NotificationType.SYSTEM, label: 'Hệ thống', icon: Info },
                        { id: NotificationType.FEATURE, label: 'Tính năng', icon: Zap },
                        { id: NotificationType.PROMOTION, label: 'Khuyến mãi', icon: Bell },
                        { id: NotificationType.ALERT, label: 'Cảnh báo', icon: AlertTriangle },
                    ].map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setNotifType(t.id)}
                            className={`${styles.typeBtn} ${notifType === t.id ? styles.active : ''}`}
                        >
                            <t.icon size={16} /> {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Recipient */}
            <div className={styles.section}>
                <label>Người nhận</label>
                <div className={styles.recipientTabs}>
                    <button
                        type="button"
                        className={recipientType === 'ALL' ? styles.activeTab : ''}
                        onClick={() => setRecipientType('ALL')}
                    >
                        <Users size={16} /> Tất cả
                    </button>
                    <button
                        type="button"
                        className={recipientType === 'SPECIFIC' ? styles.activeTab : ''}
                        onClick={() => setRecipientType('SPECIFIC')}
                    >
                        <User size={16} /> Cá nhân
                    </button>
                </div>

                {recipientType === 'SPECIFIC' && (
                    <input
                        type="text"
                        value={specificId}
                        onChange={(e) => setSpecificId(e.target.value)}
                        placeholder="Nhập ID người dùng..."
                        className={styles.input}
                    />
                )}
            </div>

            {/* Content */}
            <div className={styles.section}>
                <label>Tiêu đề</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                />

                <label>Nội dung chi tiết</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className={styles.textarea}
                />
            </div>

            <button type="button" onClick={handleSend} className={styles.sendBtn}>
                <Send size={18} /> Gửi Thông Báo
            </button>
        </form>
    );
};

export default NotificationForm;

NotificationForm.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    recipientType: PropTypes.string.isRequired,
    specificId: PropTypes.string.isRequired,
    notifType: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    setRecipientType: PropTypes.func.isRequired,
    setSpecificId: PropTypes.func.isRequired,
    setNotifType: PropTypes.func.isRequired,
    handleSend: PropTypes.func.isRequired,
};
