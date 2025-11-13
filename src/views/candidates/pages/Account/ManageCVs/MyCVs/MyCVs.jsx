import React, { useRef, useState } from "react";
import styles from "./MyCVs.module.scss";
import { PlusCircle, Upload, Eye } from "lucide-react";

export default function MyCVs() {
    const fileInputRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleUploadClick = () => {
        fileInputRef.current.click(); // mở hộp thoại chọn file
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setUploadedFile(file);
        } else {
            alert("Vui lòng chọn file PDF hợp lệ!");
        }
    };

    const handleViewPDF = () => {
        if (uploadedFile) {
            const fileURL = URL.createObjectURL(uploadedFile);
            window.open(fileURL, "_blank");
        }
    };

    return (
        <div className={styles.container}>
            {/* --- CV tạo trên TopCV --- */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3>CV đã tạo trên TopCV</h3>
                    <button className={styles.createBtn}>
                        <PlusCircle size={18} />
                        <span>Tạo CV</span>
                    </button>
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.imagePlaceholder}>
                        <img
                            src="https://static.topcv.vn/v4/image/cv-manager/no-cv.svg"
                            alt="Empty folder"
                        />
                        <p>Chưa có CV nào được tạo.</p>
                    </div>
                </div>
            </div>

            {/* --- CV tải lên TopCV --- */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3>CV đã tải lên TopCV (PDF)</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button className={styles.uploadBtn} onClick={handleUploadClick}>
                            <Upload size={18} />
                            <span>Tải CV lên</span>
                        </button>
                        {uploadedFile && (
                            <button
                                className={styles.createBtn}
                                onClick={handleViewPDF}
                            >
                                <Eye size={18} />
                                <span>Xem CV vừa tải lên</span>
                            </button>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="application/pdf"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </div>

                <div className={styles.cardBody}>
                    {uploadedFile ? (
                        <div className={styles.uploadedFile}>
                            <p>
                                📄 <strong>{uploadedFile.name}</strong>
                            </p>
                            <p>Kích thước: {(uploadedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                    ) : (
                        <div className={styles.imagePlaceholder}>
                            <img
                                src="https://static.topcv.vn/v4/image/cv-manager/no-cv-upload.svg"
                                alt="Upload placeholder"
                            />
                            <p>Chưa có CV nào được tải lên.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
