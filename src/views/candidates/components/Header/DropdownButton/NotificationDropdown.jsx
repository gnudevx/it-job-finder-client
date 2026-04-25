import React, { useState, useRef, useEffect } from 'react';
import styles from './NotificationDropdown.module.scss';
import notificationApiService from '@api/notificationApiService';
import { FaBell } from 'react-icons/fa';
import { socket } from '@/services/socket';
import { useAuth } from '@/contexts/AuthContext';

export const NotificationDropdown = () => {
  const { role } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef();

  const fetchNotifications = async () => {
    const res = await notificationApiService.candidateList(1, 20);

    setNotifications(res.items);

    const unread = res.items.filter((n) => !n.isRead).length;
    setUnreadCount(unread);
  };

  const handleMarkRead = async (id) => {
    await notificationApiService.candidateMarkRead(id);

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );

    setUnreadCount((prev) => Math.max(prev - 1, 0));
  };

  const handleMarkAllRead = async () => {
    const unreadNotifications = notifications.filter((n) => !n.isRead);
    if (unreadNotifications.length === 0) return;

    try {
      await Promise.all(
        unreadNotifications.map((n) => notificationApiService.candidateMarkRead(n._id))
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, []);
  
  useEffect(() => {
    socket.connect();

    const userId = localStorage.getItem('userId');

    socket.emit('join', { userId, role: role?.toUpperCase() });

    socket.on('notification:new', (data) => {
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => socket.off('notification:new');
  }, [role]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button className={styles.trigger} onClick={() => setOpen((prev) => !prev)}>
        <div className={styles.circle}>
          <FaBell className={styles.bellIcon} />
        </div>
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.title}>Thông báo</div>
            <button
              className={styles.markAll}
              onClick={handleMarkAllRead}
            >
              Đánh dấu tất cả là đã đọc
            </button>
          </div>

          <div className={styles.list}>
            {notifications.length === 0 ? (
              <div className={styles.empty}>Không có thông báo</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => handleMarkRead(n._id)}
                  className={`${styles.item} ${n.isRead ? styles.read : ''}`}
                >
                  <div className={styles.itemLeft}>
                    <div className={styles.iconDot}>i</div>
                  </div>
                  <div className={styles.itemBody}>
                    <div className={styles.itemTitle}>{n.title}</div>
                    <div className={styles.itemText}>{n.message}</div>
                    <div className={styles.itemDate}>{new Date(n.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.footer}>
            <button className={styles.viewAll}>Xem tất cả</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default NotificationDropdown;
