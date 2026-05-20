import React from 'react';
import styles from './CVCard.module.scss';
import PropTypes from 'prop-types';
import axiosClient from '@/services/axiosClient.js';

const CVCard = ({ cv, isRecommended, jobTitle }) => {
  const resumeId = cv.resumeId || cv.id || cv._id;
  const candidateId =
    typeof cv.candidateId === 'string'
      ? cv.candidateId
      : cv.candidateId?._id || cv.candidateId?.id || '';
  const displayName = cv.candidateName || cv.fullName || cv.fileName || 'Ứng viên';
  const subtitle = cv.jobTitle || jobTitle || cv.title || 'Công việc CV ứng tuyển';
  const downloadName = cv.fileName || displayName || 'CV';
  const matchScorePercent = cv.matchScore
    ? (cv.matchScore > 1 ? cv.matchScore : cv.matchScore * 100).toFixed(1)
    : null;

  const handleViewPDF = () => {
    if (resumeId) {
      const baseUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/?$/, '');
      window.open(`${baseUrl}/api/resumes/${resumeId}/view`, '_blank');
    } else {
      alert('Ứng viên chưa tải CV lên. Vui lòng xem lại');
    }
  };
  const handleDownload = async () => {
    if (!resumeId) {
      alert('Ứng viên chưa tải CV');
      return;
    }

    const blobData = await axiosClient.get(`/api/resumes/downloads/${resumeId}`, {
      responseType: 'blob',
    });

    const blob = new Blob([blobData], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${downloadName}`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  };
  return (
    <div className={styles.card}>
      {isRecommended && matchScorePercent && (
        <div className={styles.matchBadge}>
          <svg className={styles.matchIcon} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M2.166 4.9L9.03 9.12a2 2 0 001.938 0l6.865-4.22A2 2 0 0016 1.45H4a2 2 0 00-1.834 3.45zM11.25 11.673l6.584-4.053a2 2 0 01.166 3.37l-6.865 4.22a2 2 0 01-1.938 0l-6.865-4.22a2 2 0 01.166-3.37l6.584 4.053a2 2 0 001.167 0z"
              clipRule="evenodd"
            />
          </svg>
          Độ phù hợp với CV: {matchScorePercent}%
        </div>
      )}

      <div className={styles.avatarSection}>
        <img
          src={cv.avatar || 'https://picsum.photos/seed/avatar/200/200'}
          alt={cv.fullName}
          className={styles.avatar}
        />
        <div
          className={`${styles.fileType} ${
            cv.fileType === 'pdf' ? styles.filePdf : styles.fileDoc
          }`}
        >
          {cv.fileType || 'CV'}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>
            {displayName}
            <span className={styles.id}>ID: {candidateId || resumeId || 'Chưa có'}</span>
          </h3>
        </div>

        <p className={styles.title}>Vị trí đã tuyển: {subtitle}</p>

        <div className={styles.meta}>
          <span>{cv.experienceYears} năm KN</span>
          <span>{cv.address ?? ''}</span>
          <span>{cv.education ?? ''}</span>
        </div>

        <div className={styles.summaryWrapper}>
          <p className={styles.summary}>{cv.summary || 'CV đã được phân tích và gợi ý dựa trên kỹ năng phù hợp với vị trí tuyển dụng.'}</p>
        </div>

        {isRecommended && cv.matchReason && (
          <div className={styles.aiBox}>
            <div className={styles.aiHeader}>
              <span className={styles.aiTag}>AI ANALYST</span>
              <p>Lý do đề xuất:</p>
            </div>
            <p className={styles.aiText}>{cv.matchReason}</p>
          </div>
        )}

        <div className={styles.skills}>
          {cv.skills?.map((skill, idx) => (
            <span key={idx} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={handleViewPDF}>
          Xem CV Chi tiết
        </button>

        <button className={styles.secondaryBtn} onClick={handleDownload}>
          Tải file gốc
        </button>
      </div>
    </div>
  );
};
CVCard.propTypes = {
  cv: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resumeId: PropTypes.string,
    candidateId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        _id: PropTypes.string,
        id: PropTypes.string,
      }),
    ]),
    candidateName: PropTypes.string,
    fullName: PropTypes.string,
    avatar: PropTypes.string,
    fileName: PropTypes.string,
    fileUrl: PropTypes.string,
    fileType: PropTypes.oneOf(['pdf', 'doc', 'docx', 'CV']),
    title: PropTypes.string,
    jobTitle: PropTypes.string,
    experienceYears: PropTypes.number,
    address: PropTypes.string,
    education: PropTypes.string,
    summary: PropTypes.string,
    matchScore: PropTypes.number,
    matchReason: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,

  onSave: PropTypes.func,
  isRecommended: PropTypes.bool,
  jobTitle: PropTypes.string,
};
export default CVCard;
