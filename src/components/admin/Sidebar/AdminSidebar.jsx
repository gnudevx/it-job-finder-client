import styles from "./AdminSidebar.module.scss";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileCheck,
  Users,
  Bell,
} from "lucide-react";

export default function AdminSidebar({ isCollapsed }) {
  const menu = [
    { to: "/admin/dashboard", label: "Trang Chủ", icon: <LayoutDashboard /> },
    { to: "/admin/manage/recruiment", label: "Quản lý tin tuyển dụng", icon: <Briefcase /> },
    { to: "/admin/notification/candidate", label: "Thông Báo Candidate", icon: <Bell /> },
    { to: "/admin/notification/employer", label: "Thông Báo Employer", icon: <Bell /> },
    { to: "/admin/manage/business-license", label: "Quản lý Giấy Đăng Ký Doanh Nghiệp", icon: <FileCheck /> },
    { to: "/admin/manage/candidates", label: "Quản Lý Candidate", icon: <Users /> },
    { to: "/admin/manage/employers", label: "Quản Lý Employer", icon: <Users /> },
  ];

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <h2 className={styles.title}>{!isCollapsed && "Admin"}</h2>

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
  );
}

AdminSidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
};
