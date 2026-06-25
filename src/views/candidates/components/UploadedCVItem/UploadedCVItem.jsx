import React from 'react';
import { Eye, Trash2, Sparkles, FileText } from 'lucide-react';
import styles from './UploadedCVItem.module.scss';
import PropTypes from 'prop-types';

export default function UploadedCVItem({ cv, onView, onDelete, onSelect }) {
  const isPDF = cv.name.toLowerCase().includes('.pdf');
  const apiBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  
  // Backend route sẽ set header Content-Disposition: inline
  const previewUrl = isPDF && cv.id
    ? `${apiBase}/api/resumes/${cv.id}/view#toolbar=0&navpanes=0&scrollbar=0`
    : cv.url;

  return (
    <div className={styles.card}>
      <div className={styles.preview}>
        {isPDF ? (
          <div className={styles.pdfWrapper}>
            <object
              data={previewUrl}
              type="application/pdf"
              className={styles.pdfPreview}
            >
              <p>Không thể preview PDF</p>
            </object>
          </div>
        ) : (
          <div className={styles.docPreview}>
            <FileText size={70} />
            <span>DOCX không hỗ trợ preview</span>

            <button onClick={() => onView(cv)}>Mở file</button>
          </div>
        )}

        <div className={styles.overlay}>
          <button onClick={() => onView(cv)}>
            <Eye size={18} />
            Xem CV
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.badge}>{isPDF ? 'PDF' : 'DOCX'}</span>

          <span className={styles.size}>{(cv.size / 1024).toFixed(1)} KB</span>
        </div>

        <h3 title={cv.name}>{cv.name}</h3>

        <div className={styles.actions}>
          <button className={styles.recommendBtn} onClick={() => onSelect(cv)}>
            <Sparkles size={16} />
            Gợi ý việc làm
          </button>

          <button className={styles.deleteBtn} onClick={() => onDelete(cv.id)}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

UploadedCVItem.propTypes = {
  cv: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,

  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
