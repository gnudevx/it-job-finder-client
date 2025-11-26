import React, { useState } from "react";
import styles from "./BusinessLicense.module.scss";
import FormLabel from "@components/common/FormLabel/FormLabel.jsx";
import FileUpload from "@components/common/FileUpload/FileUpload.jsx";

import { Dot } from "lucide-react";

export default function BusinessLicense() {
    const [files, setFiles] = useState([]);

    // const handleFileChange = (e) => {
    //     const selected = e.target.files[0];
    //     if (selected) setFile(selected);
    // };

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
                    <FormLabel text="Giấy đăng ký doanh nghiệp hoặc Giấy tờ tương đương khác" required />

                    <FileUpload
                        files={files}
                        onChange={setFiles}
                        accept=".jpg,.png"
                        note="Dung lượng tối đa 5MB, định dạng: jpeg, jpg, png, pdf"
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
