import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './NavButton.module.scss';

export const NavButton = ({ icon: Icon, label, to, newTab, isTransparent }) => {
  const baseClass = `${styles['nav-btn']} ${isTransparent ? styles.transparent : ''}`;
  if (newTab) {
    return (
      <button className={baseClass} onClick={() => window.open(to, '_blank')}>
        <Icon className={styles['nav-icon']} />
        <span className={styles.label}>{label}</span>
      </button>
    );
  }
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${styles['nav-btn']} ${isActive ? styles['active'] : ''}`}
    >
      <Icon className={styles['nav-icon']} />
      <span className={styles.label}>{label}</span>
    </NavLink>
  );
};

NavButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  newTab: PropTypes.bool,
  isTransparent: PropTypes.bool,
};
