import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyCVs.module.scss";
import { PlusCircle, Upload } from "lucide-react";

import useCVs from "@/hooks/useCVs";
import CVList from "@/views/candidates/components/CVList/CVList.jsx";
import CVModal from "@/views/candidates/components/CVModal/CVModal.jsx";
import CVBuilder from "@/views/candidates/components/CVBuilder/CVBuilder.jsx";
import useUploadedCVs from "@/hooks/useUploadedCVs";
import { uploadResume } from "@/api/resumeService";

import UploadedCVItem from "@/views/candidates/components/UploadedCVItem/UploadedCVItem.jsx";

export default function MyCVs() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [showCVBuilder, setShowCVBuilder] = useState(false);

  const { uploadedCVs, addUploadedCV, removeUploadedCV } = useUploadedCVs();
  const { cvs, addCV, removeCV } = useCVs();

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Vui lòng chọn file PDF hợp lệ!");
      return;
    }

    try {
      const response = await uploadResume(file); // gửi lên backend

      addUploadedCV({
        id: response.data.resume._id, // dùng ID từ DB
        name: response.data.resume.fileName,
        size: file.size,
        url: response.data.resume.fileUrl,
      });

      alert("Upload CV thành công!");
    } catch (err) {
      console.error(err);
      alert("Upload thất bại, thử lại sau.");
    } finally {
      fileInputRef.current.value = null;
    }
  };

  const handleViewPDF = (id) => {
    window.open(`http://localhost:5000/api/resumes/${id}/view`, "_blank");
  };

  const handleSelectCV = (cv) => {
    // Khi user chọn CV để recommend
    navigate("/candidate/account/recommendjobs", { state: { cv } });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.manageCV}>Quản lý CV của bạn</h2>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>CV đã tạo trên hệ thống</h3>

          <button className={styles.createBtn} onClick={() => setShowCVBuilder(true)}>
            <PlusCircle size={18} />
            <span>Tạo CV</span>
          </button>
        </div>

        <CVList data={cvs} onDelete={removeCV} />
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>CV đã tải lên (PDF)</h3>

          <button className={styles.uploadBtn} onClick={handleUploadClick}>
            <Upload size={18} /> Tải CV lên
          </button>

          <input
            type="file"
            ref={fileInputRef}
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className={styles.cardBody}>
          {uploadedCVs.length === 0 ? (
            <div className={styles.imagePlaceholder}>
              <img
                src="https://static.topcv.vn/v4/image/cv-manager/no-cv-upload.svg"
                alt="placeholder"
              />
              <p>Chưa có CV nào được tải lên.</p>
            </div>
          ) : (
            uploadedCVs.map((cv) => (
              <UploadedCVItem
                key={cv.id}
                cv={cv}
                onView={() => handleViewPDF(cv.id)}
                onDelete={() => removeUploadedCV(cv.id)}
                onSelect={() => {
                  handleSelectCV(cv);
                  alert("Đã chọn CV: " + cv.name);
                }}
              />
            ))
          )}
        </div>
      </div>

      {showCVBuilder && (
        <CVModal onClose={() => setShowCVBuilder(false)}>
          <CVBuilder onSave={(data) => { addCV(data); setShowCVBuilder(false); }} />
        </CVModal>
      )}
    </div>
  );
}
