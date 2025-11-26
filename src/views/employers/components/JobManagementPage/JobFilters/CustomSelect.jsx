import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./CustomSelect.module.scss";

export default function CustomSelect({ label, options, value, onChange, icon }) {
    const [open, setOpen] = useState(false);

    const selectedLabel = options.find(o => o.value === value)?.label || "Tất cả";

    return (
        <div className={styles.selectGroup} onClick={() => setOpen(!open)}>
            <div className={styles.selectButton}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <span>{label}: {selectedLabel}</span>
                <span className={styles.caret}>▾</span>
            </div>
            {open && (
                <ul className={styles.options}>
                    {options.map(opt => (
                        <li key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }}>
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// ---------------- PropTypes ----------------
CustomSelect.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    icon: PropTypes.func.isRequired,
};
