import React from "react";
import VerificationForm from "./VerificationForm";
import styles from "./VerificationModal.module.scss";
import PropTypes from "prop-types";
export default function VerificationModal({ onClose }) {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <VerificationForm />
            </div>
        </div>
    );
}
VerificationModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};