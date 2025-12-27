import React from 'react';
import styles from './CVCard.module.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
const CVCard = ({ cv, isRecommended }) => {
    const handleViewPDF = () => {

        if (cv.resumeId) {
            console.log("cvis: ", cv)
            window.open(`http://localhost:5000/api/resumes/${cv.resumeId}/view`, "_blank");
        } else {
            alert("Ứng viên chưa tải CV lên.");
        }
    };
    const handleDownload = async () => {
        if (!cv.resumeId) {
            alert("Ứng viên chưa tải CV");
            return;
        }

        const token = localStorage.getItem("authToken");

        const res = await axios.get(
            `http://localhost:5000/api/resumes/downloads/${cv.resumeId}`,
            {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ JWT VẪN Ở ĐÂY
                },
                withCredentials: true,
            }
        );

        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${cv.fullName}-CV.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
    };
    return (
        <div className={styles.card}>
            {isRecommended && cv.matchScore && (
                <div className={styles.matchBadge}>
                    <svg className={styles.matchIcon} fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M2.166 4.9L9.03 9.12a2 2 0 001.938 0l6.865-4.22A2 2 0 0016 1.45H4a2 2 0 00-1.834 3.45zM11.25 11.673l6.584-4.053a2 2 0 01.166 3.37l-6.865 4.22a2 2 0 01-1.938 0l-6.865-4.22a2 2 0 01.166-3.37l6.584 4.053a2 2 0 001.167 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Độ phù hợp: {cv.matchScore}%
                </div>
            )}

            <div className={styles.avatarSection}>
                <img
                    src={cv.avatar || 'https://picsum.photos/seed/avatar/200/200'}
                    alt={cv.fullName}
                    className={styles.avatar}
                />
                <div
                    className={`${styles.fileType} ${cv.fileType === 'pdf' ? styles.filePdf : styles.fileDoc
                        }`}
                >
                    {cv.fileType || 'CV'}
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.name}>
                        {cv.fullName}
                        <span className={styles.id}>ID: {cv.id}</span>
                    </h3>
                </div>

                <p className={styles.title}>{cv.title}</p>

                <div className={styles.meta}>
                    <span>{cv.experienceYears} năm KN</span>
                    <span>{cv.address ?? ""}</span>
                    <span>{cv.education ?? ""}</span>
                </div>

                <div className={styles.summaryWrapper}>
                    <p className={styles.summary}>{cv.summary}</p>
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
                    {cv.skills.map((skill, idx) => (
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
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        fullName: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        resumeId: PropTypes.string,
        fileUrl: PropTypes.string,
        fileType: PropTypes.oneOf(['pdf', 'doc', 'docx', 'CV']),
        title: PropTypes.string,
        experienceYears: PropTypes.number,
        address: PropTypes.string,
        education: PropTypes.string,
        summary: PropTypes.string,
        matchScore: PropTypes.number,
        matchReason: PropTypes.string,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,

    onSave: PropTypes.func,
    isRecommended: PropTypes.bool,
};
export default CVCard;
