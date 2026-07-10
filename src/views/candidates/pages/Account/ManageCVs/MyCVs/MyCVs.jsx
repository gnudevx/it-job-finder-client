import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/redux/slices/globalSlice';
import { useNavigate } from 'react-router-dom';
import styles from './MyCVs.module.scss';
import { Upload } from 'lucide-react';
import useUploadedCVs from '@/hooks/useUploadedCVs';
import { uploadResume } from '@/api/resumeService';

import UploadedCVItem from '@/views/candidates/components/UploadedCVItem/UploadedCVItem.jsx';

export default function MyCVs() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { uploadedCVs, addUploadedCV, removeUploadedCV } = useUploadedCVs();
  const dispatch = useDispatch();

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];
    if (!allowedTypes.includes(file.type)) {
      dispatch(setNotification({ message: 'Vui lòng chọn file PDF hoặc DOCX hợp lệ!', type: 'info' }));
      return;
    }

    try {
      const response = await uploadResume(file);

      addUploadedCV({
        id: response.resume._id,
        name: response.resume.fileName,
        size: response.resume.size,
        url: response.resume.fileUrl,
      });
      dispatch(setNotification({ message: 'Upload CV thành công!', type: 'success' }));
    } catch (err) {
      console.error(err);
      dispatch(setNotification({ message: 'Upload thất bại, thử lại sau.', type: 'error' }));
    } finally {
      fileInputRef.current.value = null;
    }
  };

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL?.replace(/\/\/+$/, '') || window.location.origin;

  const handleViewPDF = async (id) => {
    try {
      const url = `${apiBaseUrl}/api/resumes/${id}/view`;
      window.open(url, '_blank');
    } catch (err) {
      console.error('Preview CV failed', err);
      dispatch(setNotification({ message: 'Không thể xem CV. Vui lòng đăng nhập lại hoặc thử lại sau.', type: 'error' }));
    }
  };

  const handleSelectCV = (cv) => {
    // Khi user chọn CV để recommend
    navigate('/candidate/account/recommendjobs', { state: { cv } });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.manageCV}>Quản lý CV của bạn</h2>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>CV đã tải lên (PDF/DOCX)</h3>

          <button className={styles.uploadBtn} onClick={handleUploadClick}>
            <Upload size={18} /> Tải CV lên
          </button>

          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.docx,.doc"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        <div className={styles.cardBody}>
          {uploadedCVs.length === 0 ? (
            <div className={styles.emptyState}>
              <img
                src="https://static.topcv.vn/v4/image/cv-manager/no-cv-upload.svg"
                alt="placeholder"
              />
              <h4>Chưa có CV nào</h4>
              <p>Tải CV PDF hoặc DOCX để bắt đầu ứng tuyển nhanh hơn</p>

              <button className={styles.emptyUploadBtn} onClick={handleUploadClick}>
                <Upload size={18} />
                Tải CV đầu tiên
              </button>
            </div>
          ) : (
            <div className={styles.cvGrid}>
              {uploadedCVs.map((cv) => (
                <UploadedCVItem
                  key={cv.id}
                  cv={cv}
                  onView={() => handleViewPDF(cv.id)}
                  onDelete={() => removeUploadedCV(cv.id)}
                  onSelect={() => handleSelectCV(cv)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
