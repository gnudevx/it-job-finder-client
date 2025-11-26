import React, { useState } from "react";
import styles from "./Support_Report.module.scss";
import FileUpload from "@components/common/FileUpload/FileUpload.jsx";

export default function Support_Report() {
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        description: "",
        files: [],
    });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // ✅ Nhận file mới từ component con
    const handleFilesChange = (newFiles) => {
        setFormData({ ...formData, files: newFiles });
    };

    const removeFile = (index) => {
        const newFiles = [...formData.files];
        newFiles.splice(index, 1);
        setFormData({ ...formData, files: newFiles });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.type || !formData.description) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        setStatus("loading");
        await new Promise((res) => setTimeout(res, 1000));
        console.log("Dữ liệu gửi đi:", formData);
        setStatus("success");
        alert("Gửi báo cáo thành công!");
    };

    return (
        <div className={styles.reportForm} onSubmit={handleSubmit}>
            <h3>Yêu cầu hỗ trợ & Báo cáo vi phạm</h3>
            <p className={styles.desc}>
                Với mong muốn tiếp nhận và xử lý các phản hồi từ phía nhà tuyển dụng một cách nhanh chóng, HireIT cho ra mắt Hộp thư hỗ trợ để lắng nghe tất cả các phản hồi từ phía Nhà tuyển dụng
                Doanh nghiệp về trải nghiệm khi sử dụng hệ thống. Những phản hồi chính xác của anh
                chị là cơ sở để HireIT cải tiến và nâng cao chất lượng sản phẩm.
            </p>

            <div className={styles.field}>
                <label>Tiêu đề <span>*</span></label>
                <input
                    type="text"
                    name="title"
                    placeholder="Nhập tiêu đề"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label>Loại báo cáo <span>*</span></label>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="">Chọn loại báo cáo</option>
                    <option value="spam">Báo cáo spam / lừa đảo</option>
                    <option value="bug">Lỗi kỹ thuật</option>
                    <option value="other">Khác</option>
                </select>
            </div>

            <div className={styles.field}>
                <label>Mô tả <span>*</span></label>
                <textarea
                    name="description"
                    placeholder="Nhập mô tả"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className={styles.uploadBox}>
                <label>Tài liệu chứng minh</label>
                <FileUpload
                    files={formData.files}
                    onChange={handleFilesChange}
                    accept=".jpeg,.jpg,.png,.pdf"
                    note="Dung lượng tối đa 5MB, định dạng: jpeg, jpg, png, pdf"
                />

                {formData.files.length > 0 && (
                    <ul className={styles.fileList}>
                        {formData.files.map((f, i) => (
                            <li key={i}>
                                {f.name}{" "}
                                <button type="button" onClick={() => removeFile(i)}>
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === "loading"}
            >
                {status === "loading" ? "Đang gửi..." : "Gửi báo cáo"}
            </button>
        </div>
    );
}
