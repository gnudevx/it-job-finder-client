import React from "react";
import PropTypes from "prop-types";
import styles from "./AdminHeader.module.scss";

export default function AdminHeader({ onToggleSidebar, title }) {
  return (
    <div className={styles.headerInner}>
      <button className={styles.menuBtn} onClick={onToggleSidebar}>
        ☰
      </button>

      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}

AdminHeader.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
  title: PropTypes.string,
};
