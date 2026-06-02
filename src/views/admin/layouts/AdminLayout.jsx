import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import AdminSidebar from '@/components/admin/Sidebar/AdminSidebar.jsx';
import AdminHeader from '@/components/admin/Header/AdminHeader.jsx';

import styles from './AdminLayout.module.scss';

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation();

  const pageTitles = {
    '/admin/dashboard': 'Dashboard',
    '/admin/manage/recruiment': 'Quản lý tuyển dụng',
    '/admin/notification/candidate': 'Thông báo Candidate',
    '/admin/notification/employer': 'Thông báo Employer',
    '/admin/manage/business-license': 'Giấy phép doanh nghiệp',
    '/admin/manage/candidates': 'Quản lý Candidate',
    '/admin/manage/employers': 'Quản lý Employer',
    '/admin/manage/SupportTickets': 'Yêu cầu hỗ trợ',
  };

  const currentTitle = pageTitles[location.pathname] || 'Admin';

  return (
    <div className={styles.layout}>
      <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''}`}>
        <AdminSidebar isCollapsed={isCollapsed} />
      </aside>

      <div className={`${styles.contentWrapper} ${isCollapsed ? styles.contentExpanded : ''}`}>
        <header className={styles.header}>
          <AdminHeader
            title={currentTitle}
            onToggleSidebar={() => setIsCollapsed((prev) => !prev)}
          />
        </header>

        <main className={styles.main}>
          <div className={styles.pageContainer}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
