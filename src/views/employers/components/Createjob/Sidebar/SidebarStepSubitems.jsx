// SidebarStep1Subitems.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "./SidebarStepSubitems.module.scss";
import SmallCheckIcon from "./SmallCheckIcon"; // Import SmallCheckIcon
import CircleIcon from "./CircleIcon";         // Import CircleIcon

export default function SidebarStep1Subitems({ fields }) {
    return (
        <ul className={styles.subList}>
            {fields.map((f) => (
                <li key={f.key} className={styles.subItem}>
                    <span className={styles.label}>{f.label}</span>
                    {f.valid ? (
                        <SmallCheckIcon size="16px" color="#16a34a" /> // Sử dụng icon SVG
                    ) : (
                        <CircleIcon size="16px" color="#9ca3af" />      // Sử dụng icon SVG
                    )}
                </li>
            ))}
        </ul>
    );
}

// ✅ Khai báo PropTypes đúng cú pháp:
SidebarStep1Subitems.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            valid: PropTypes.bool.isRequired,
        })
    ).isRequired,
};