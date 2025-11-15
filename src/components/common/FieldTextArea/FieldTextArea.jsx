import React from "react";
import PropTypes from "prop-types";
import styles from "./FieldTextArea.module.scss"; // hoặc file SCSS riêng nếu bạn tách

export default function FieldTextArea({ label, name, value, placeholder, onChange, onBlur }) {
    return (
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            <textarea
                name={name}
                placeholder={placeholder}
                value={value}
                rows={6}
                onChange={(e) => onChange(name, e.target.value)}
                onBlur={() => onBlur(name)}
            />
        </div>
    );
}

FieldTextArea.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func, // nếu bạn truyền blur
};
