import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'lucide-react';
import styles from './AdminHeader.module.scss';

export default function AdminHeader({ onToggleSidebar, title }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onToggleSidebar}>
          <Menu size={20} />
        </button>

        <div>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.adminAvatar}>A</div>
      </div>
    </header>
  );
}

AdminHeader.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
  title: PropTypes.string,
};
