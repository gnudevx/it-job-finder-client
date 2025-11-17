import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./CVModal.module.scss";

export default function CVModal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

CVModal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
