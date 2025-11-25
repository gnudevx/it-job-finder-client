import React from "react";
import styles from "./ConfirmPublishModal.module.scss";
import PropTypes from 'prop-types';
export default function ConfirmPublishModal({ open, onClose, onConfirm }) {
    if (!open) return null;
    console.log("onPublish:", onConfirm);
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>Bạn có chắc chắn muốn hiển thị tin?</h3>

                <div className={styles.actions}>
                    <button className={styles.noBtn} onClick={onClose}>
                        Không
                    </button>

                    <button className={styles.yesBtn} onClick={onConfirm}>
                        Có, hiển thị
                    </button>
                </div>
            </div>
        </div>
    );
}
ConfirmPublishModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
};