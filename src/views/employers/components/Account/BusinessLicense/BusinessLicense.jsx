import React, { useState } from "react";
import styles from "./BusinessLicense.module.scss";
import { Dot } from "lucide-react";

export default function BusinessLicense() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) setFile(selected);
    };

    return (
        <div className={styles.wrapper}>
            <h3>Thông tin Giấy đăng ký doanh nghiệp</h3>

            <p className={styles.guide}>
                Vui lòng lựa chọn phương thức đăng tải, xem hướng dẫn đăng tải{" "}
                <a href="#">Tại đây</a>
            </p>

            {/* Cột trái: Upload */}
            <div className={styles.uploadSection}>
                {/* Cột trái */}
                <div className={styles.left}>
                    <label className={styles.label}>
                        Giấy đăng ký doanh nghiệp hoặc Giấy tờ tương đương khác <span>*</span>
                    </label>

                    <div
                        className={`${styles.uploadBox} ${file ? styles.hasFile : ""}`}
                        onClick={() => document.getElementById("uploadFile").click()}
                    >
                        {file ? (
                            <div className={styles.fileInfo}>
                                <p>{file.name}</p>
                                <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                            </div>
                        ) : (
                            <div className={styles.placeholder}>
                                <p>Chọn hoặc kéo file vào đây</p>
                                <small>Dung lượng tối đa 5MB, định dạng: jpeg, jpg, png, pdf</small>
                            </div>
                        )}
                    </div>

                    <input
                        id="uploadFile"
                        type="file"
                        accept=".jpeg,.jpg,.png,.pdf"
                        onChange={handleFileChange}
                        hidden
                    />

                    <div className={styles.warning}>
                        <span className={styles.icon}>⚠️</span>

                        <div className={styles.warningContent}>
                            <div className={styles.warningItem}>
                                <Dot />
                                Các văn bản đăng tải cần đầy đủ các mặt và không có dấu hiệu chỉnh sửa/ che/ cắt thông tin
                            </div>

                            <div className={styles.warningItem}>
                                <Dot />
                                Vui lòng đăng tải Giấy đăng ký doanh nghiệp có thông tin trùng khớp với dữ liệu của doanh nghiệp theo Trang thông tin điện tử của Cục Thuế
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cột phải */}
                <div className={styles.sample}>
                    <h4>Minh họa</h4>
                    <div className={styles.sampleBox}>sample</div>
                </div>

            </div>
            <div className={styles.footer}>
                <button className={styles.cancel}>Hủy</button>
                <button className={styles.save}>Lưu thay đổi</button>
            </div>
        </div>
    );
}
