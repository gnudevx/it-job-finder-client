import React, { useRef, useState } from "react";
import styles from "./MyCVs.module.scss";
import { PlusCircle, Upload } from "lucide-react";

import useCVs from "@/hooks/useCVs";
import CVList from "@/views/candidates/components/CVList/CVList.jsx";
import CVModal from "@/components/candidates/CVModal/CVModal.jsx";
import CVBuilder from "@/views/candidates/components/CVBuilder/CVBuilder.jsx";
import useUploadedCVs from "@/hooks/useUploadedCVs";

import UploadedCVItem from "@/components/candidates/UploadedCVItem/UploadedCVItem.jsx";

export default function MyCVs() {
  const fileInputRef = useRef(null);
  const [showCVBuilder, setShowCVBuilder] = useState(false);

  const { uploadedCVs, addUploadedCV, removeUploadedCV } = useUploadedCVs();
  const { cvs, addCV, removeCV } = useCVs();

  const handleUploadClick = () => fileInputRef.current.click();

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Vui lòng chọn file PDF hợp lệ!");
      return;
    }

    const base64 = await fileToBase64(file);

    addUploadedCV({
      id: Date.now(),
      name: file.name,
      size: file.size,
      data: base64,
    });

    fileInputRef.current.value = null;
  };

  const handleViewPDF = (dataUrl) => {
    const win = window.open("");
    win.document.write(
      `<iframe width="100%" height="100%" src="${dataUrl}"></iframe>`
    );
  };

  return (
    <div className={styles.container}>
      {/* CV đã tạo */}
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

      {/* CV Upload */}
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
                onView={handleViewPDF}
                onDelete={removeUploadedCV}
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
