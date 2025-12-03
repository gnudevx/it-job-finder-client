import styles from "./AdminSidebar.module.scss";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileCheck,
  Users,
  IdCardLanyard,
  Bell,
  LogOut,
} from "lucide-react";

export default function AdminSidebar({ isCollapsed }) {
  const menu = [
    { to: "/admin/dashboard", label: "Trang Chủ", icon: <LayoutDashboard /> },
    { to: "/admin/manage/recruiment", label: "Quản lý tin tuyển dụng", icon: <Briefcase /> },
    { to: "/admin/notification/candidate", label: "Thông Báo Candidate", icon: <Bell /> },
    { to: "/admin/notification/employer", label: "Thông Báo Employer", icon: <Bell /> },
    { to: "/admin/manage/business-license", label: "Giấy Đăng Ký Doanh Nghiệp", icon: <FileCheck /> },
    { to: "/admin/manage/candidates", label: "Quản Lý Candidate", icon: <Users /> },
    { to: "/admin/manage/employers", label: "Quản Lý Employer", icon: <IdCardLanyard /> },
  ];

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>

      {/* KHỐI 1: Wrapper dùng để căn giữa Menu - Chiếm hết khoảng trống còn lại */}
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

      {/* KHỐI 2: Nút Đăng xuất - Luôn nằm đáy */}
      <button
        className={styles.logoutButton}
        onClick={() => console.log("Đăng xuất")}
        title="Đăng xuất"
      >
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