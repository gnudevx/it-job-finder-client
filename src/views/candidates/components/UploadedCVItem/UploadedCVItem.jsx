import React, { useEffect, useState } from 'react';
import { Eye, Trash2, Sparkles, FileText } from 'lucide-react';
import styles from './UploadedCVItem.module.scss';
import PropTypes from 'prop-types';
import axiosClient from '@/services/axiosClient';

export default function UploadedCVItem({ cv, onView, onDelete, onSelect }) {
  const isPDF = cv.name.toLowerCase().includes('.pdf');
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    let objectUrl;
    const fetchPreview = async () => {
      if (!isPDF) return;
      try {
        const response = await axiosClient.get(`/api/resumes/${cv.id}/view`, {
          responseType: 'blob',
        });
        objectUrl = window.URL.createObjectURL(response);
        setPreviewUrl(objectUrl);
      } catch (error) {
        console.error('Load CV preview failed:', error);
        setPreviewUrl(null);
      }
    };

    fetchPreview();

    return () => {
      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [cv.id, isPDF]);

  return (
    <div className={styles.card}>
      <div className={styles.preview}>
        {isPDF ? (
          <div className={styles.pdfWrapper}>
            {previewUrl ? (
              <iframe
                src={previewUrl}
                title={`Preview ${cv.name}`}
                className={styles.pdfPreview}
              />
            ) : (
              <div className={styles.previewFallback}>
                <p>Đang tải preview CV...</p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.docPreview}>
            <FileText size={70} />
            <span>DOCX không hỗ trợ preview</span>

            <button onClick={() => onView(cv.id)}>Mở file</button>
          </div>
        )}

        <div className={styles.overlay}>
          <button onClick={() => onView(cv.id)}>
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
  }).isRequired,

  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
