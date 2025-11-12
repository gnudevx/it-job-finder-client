import React from "react";
import styles from "./FormLabel.module.scss";
import PropTypes from "prop-types";

export default function FormLabel({ text, required }) {
    return (
        <label className={styles.label}>
            {text} {required && <span className={styles.required}>*</span>}
        </label>
    );
}

FormLabel.propTypes = {
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
};