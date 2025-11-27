import React from "react";
import PropTypes from "prop-types";
import styles from "./AdminHeader.module.scss";

export default function AdminHeader({ onToggleSidebar }) {
  return (
    <div className={styles.headerInner}>
      <button className={styles.menuBtn} onClick={onToggleSidebar}>
        ☰
      </button>

      <h1 className={styles.title}>Admin Dashboard</h1>
    </div>
  );
}

AdminHeader.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};
