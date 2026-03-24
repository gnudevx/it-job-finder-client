import styles from "./CandidateList.module.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/services/axiosClient.js"
export default function CandidateList({ candidates, onSelect }) {
  const navigate = useNavigate();
  const startChat = async (candidateId, jobId) => {
    try {
      const res = await axiosClient.post("/employer/connect/conversations", {
        candidateId,
        jobId, // 👈 BẮT BUỘC
      });

      const convoId = res._id; // 👈 FIX

      // 👉 sau khi có conversationId mới select
      onSelect(candidateId, convoId);

    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Ứng viên khác</h3>
        <p>Ứng tuyển vào tin tuyển dụng của bạn trong 7 ngày qua</p>
      </div>

      <div className={styles.list}>
        {candidates.map((candidate) => (
          <div key={candidate.id} className={styles.item}>
            <div className={styles.info}>
              <img src={candidate.avatar} alt="" />

              {/* Group nội dung chữ để dễ style */}
              <div className={styles.textContent}>
                <h4>{candidate.name}</h4>
                
                {/* Gộp Position và Meta vào cùng 1 dòng */}
                <div className={styles.jobMeta}>
                  <span>{candidate.position}</span>
                  <span className={styles.dot}>•</span> {/* Dấu chấm nhỏ để ngăn cách cho đẹp */}
                  <span>Ứng tuyển {candidate.appliedDate}</span>
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => startChat(candidate.id, candidate.jobId)}
              >
                Nhắn tin
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button onClick={() => navigate("/employer/cvs-management")}>
          Quản lý hồ sơ ứng tuyển
        </button>
      </div>
    </div>
  );
}

CandidateList.propTypes = {
  candidates: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};