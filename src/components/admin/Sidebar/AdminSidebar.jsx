import styles from "./AdminSidebar.module.scss";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function AdminSidebar({ isCollapsed }) {
  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <h2 className={styles.title}>{!isCollapsed && "Admin"}</h2>

      <nav className={styles.nav}>
        <NavLink to="/admin/dashboard" className={styles.link}>
          {!isCollapsed && "Trang Chủ"}
        </NavLink>

        <NavLink to="/admin/notification/candidate" className={styles.link}>
          {!isCollapsed && "Thông Báo Candidate"}
        </NavLink>

        <NavLink to="/admin/notification/employer" className={styles.link}>
          {!isCollapsed && "Thông Báo Employer"}
        </NavLink>

        <NavLink to="/admin/manage/business-license" className={styles.link}>
          {!isCollapsed && "Quản lý Giấy Đăng Ký Doanh Nghiệp"}
        </NavLink>

        <NavLink to="/admin/manage/candidates" className={styles.link}>
          {!isCollapsed && "Quản Lý Candidate"}
        </NavLink>

        <NavLink to="/admin/manage/employers" className={styles.link}>
          {!isCollapsed && "Quản Lý Employer"}
        </NavLink>
      </nav>
    </div>
  );
}

AdminSidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
};
