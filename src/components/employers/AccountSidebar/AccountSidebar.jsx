import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AccountSidebar.module.scss";
import PropTypes from "prop-types";
export default function AccountTabs({ tabs }) {
    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => {
                const Icon = tab.icon; // <-- khai báo bên trong block map

                return (
                    <NavLink
                        key={tab.key}
                        to={tab.path}
                        end
                        className={({ isActive }) =>
                            `${styles.tab} ${isActive ? styles.active : ""}`
                        }
                    >
                        <Icon className={styles.icon} /> {/* icon hiển thị trước label */}
                        <span className={styles.label}>{tab.label}</span>
                    </NavLink>
                );
            })}
        </div>
    );
}
AccountTabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.elementType.isRequired,
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        })
    ).isRequired,
};