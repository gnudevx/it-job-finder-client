import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./NavButton.module.scss";

export const NavButton = ({ icon: Icon, label, to }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `${styles["nav-btn"]} ${isActive ? styles["active"] : ""}`
            }
        >
            <Icon className={styles["nav-icon"]} />
            <span className={styles.label}>{label}</span>
        </NavLink>
    );
};

NavButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};
