import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './NavButton.module.scss';

export const NavButton = ({ icon: Icon, label, to, newTab, isTransparent, badge }) => {
  const baseClass = `${styles['nav-btn']} ${isTransparent ? styles.transparent : ''}`;
  const renderBadge = badge > 0 ? <span className={styles.badge}>{badge}</span> : null;

  if (newTab) {
    return (
      <button className={baseClass} onClick={() => window.open(to, '_blank')}>
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <Icon className={styles['nav-icon']} />
          {renderBadge}
        </div>
        <span className={styles.label}>{label}</span>
      </button>
    );
  }
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${styles['nav-btn']} ${isActive ? styles['active'] : ''}`}
    >
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <Icon className={styles['nav-icon']} />
        {renderBadge}
      </div>
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
  badge: PropTypes.number,
};
