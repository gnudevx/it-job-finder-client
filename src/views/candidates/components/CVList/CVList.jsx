import React from "react";
import PropTypes from "prop-types";
import styles from "./CVList.module.scss";
import { Eye, Trash2 } from "lucide-react";

export default function CVList({ data, onDelete }) {
  if (!data || data.length === 0)
    return (
      <div className={styles.empty}>
        <img src="https://static.topcv.vn/v4/image/cv-manager/no-cv.svg" alt="" />
        <p>Chưa có CV nào được tạo.</p>
      </div>
    );

  return (
    <div className={styles.list}>
      {data.map((cv) => (
        <div className={styles.card} key={cv.id}>
          <h4>{cv.title}</h4>

          <div className={styles.actions}>
            <button onClick={() => window.open(cv.previewUrl, "_blank")}>
              <Eye size={16} /> Xem
            </button>

            <button className={styles.delete} onClick={() => onDelete(cv.id)}>
              <Trash2 size={16} /> Xoá
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

CVList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      previewUrl: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};