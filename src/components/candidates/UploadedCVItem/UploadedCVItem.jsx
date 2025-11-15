import React from "react";
import { Eye, Trash2 } from "lucide-react";
import styles from "./UploadedCVItem.module.scss";
import PropTypes from "prop-types";

export default function UploadedCVItem({ cv, onView, onDelete }) {
  return (
    <div className={styles.item}>
      <p>📄 <strong>{cv.name}</strong></p>
      <p>Kích thước: {(cv.size / 1024).toFixed(1)} KB</p>

      <div className={styles.actions}>
        <button className={styles.viewBtn} onClick={() => onView(cv.data)}>
          <Eye size={18} /> Xem
        </button>

        <button className={styles.delBtn} onClick={() => onDelete(cv.id)}>
          <Trash2 size={18} /> Xóa
        </button>
      </div>
    </div>
  );
}

UploadedCVItem.propTypes = {
  cv: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
  }).isRequired,

  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};