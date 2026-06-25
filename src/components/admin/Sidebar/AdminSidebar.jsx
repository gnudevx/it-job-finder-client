import styles from './AdminSidebar.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FileCheck,
  Users,
  IdCardLanyard,
  Bell,
  LogOut,
  FolderKanban,
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';
import logo from '@/assets/Logo_HireIT_Header.png';

export default function AdminSidebar({ isCollapsed }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await authService.logoutRequest(); // gọi API logout
    } catch (error) {
      console.error('Logout error:', error);
    }

    // Xóa token, điều hướng về login
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    navigate('/login'); // chuyển trang
  };
  const menu = [
    { to: '/admin/dashboard', label: 'Trang Chủ', icon: <LayoutDashboard /> },
    { to: '/admin/manage/recruiment', label: 'Quản lý tin tuyển dụng', icon: <Briefcase /> },
    { to: '/admin/notification/candidate', label: 'Thông Báo Ứng viên', icon: <Bell /> },
    { to: '/admin/notification/employer', label: 'Thông Báo Nhà tuyển dụng', icon: <Bell /> },
    {
      to: '/admin/manage/business-license',
      label: 'Giấy Đăng Ký Doanh Nghiệp',
      icon: <FileCheck />,
    },
    { to: '/admin/manage/candidates', label: 'Quản Lý Ứng viên', icon: <Users /> },
    { to: '/admin/manage/employers', label: 'Quản Lý Nhà tuyển dụng', icon: <IdCardLanyard /> },
    { to: '/admin/manage/SupportTickets', label: 'Quản Lý Yêu Cầu Hỗ Trợ', icon: <FolderKanban /> },
  ];

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="HireIT" className={styles.logo} />

        {!isCollapsed && (
          <div className={styles.logoContent}>
            <h2 className={styles.logoTitle}>HireIT</h2>
            <p className={styles.logoSub}>Quản trị viên</p>
          </div>
        )}
      </div>

      <div className={styles.menuCenterer}>
        <nav className={styles.nav}>
          {menu.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <div className={styles.icon}>{item.icon}</div>

              {!isCollapsed && <span className={styles.label}>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <button className={styles.logoutButton} onClick={handleLogout} title="Đăng xuất">
        <div className={styles.icon}>
          <LogOut />
        </div>

        {!isCollapsed && <span className={styles.label}>Đăng xuất</span>}
      </button>
    </div>
  );
}

AdminSidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
};
