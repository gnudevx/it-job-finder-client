import React, { useState } from "react";
import FileUpload from "@components/common/FileUpload/FileUpload.jsx";
import FormLabel from "@components/common/FormLabel/FormLabel.jsx";
import styles from "./FeedbackProduction.module.scss";

export default function FeedbackProduction() {
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category) {
      alert("Vui lòng chọn loại báo cáo!");
      return;
    }

    if (!content.trim()) {
      alert("Vui lòng nhập nội dung góp ý!");
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("content", content);
    files.forEach((file) => formData.append("files", file));

    console.log("Gửi form:", { category, content, files });
    alert("Gửi góp ý thành công!");
  };

  return (
    <form className={styles.feedbackForm} onSubmit={handleSubmit}>
      <h3>Góp ý sản phẩm</h3>

      <span className={styles.span}>
        <strong>HireIT</strong> rất mong muốn lắng nghe các phản hồi, góp ý từ
        phía Nhà tuyển dụng / Doanh nghiệp để liên tục cải tiến, bổ sung tính
        năng, giúp sản phẩm Smart Recruitment Platform ngày càng hữu ích và
        thân thiện hơn với người dùng.
      </span>

      <div className={styles.field}>
        <FormLabel text="Đối tượng góp ý" required />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Chọn loại báo cáo --</option>
          <option value="UI">Giao diện & trải nghiệm người dùng</option>
          <option value="FeatureEmail">Tính năng kích hoạt tài khoản qua Email</option>
          <option value="FeatureEmployer">Tin tuyển dụng</option>
          <option value="FillCV">Lọc CV</option>
          <option value="ManageCV">Quản lý CV</option>
          <option value="ReportEmployer">Báo cáo tuyển dụng</option>
          <option value="AttachBrand">Gán nhãn</option>
        </select>
      </div>

      <div className={styles.field}>
        <FormLabel text="Nội dung góp ý" required />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập nội dung góp ý của bạn..."
        />
      </div>

      <div className={styles.field}>
        <label>Minh họa (tùy chọn)</label>
        <FileUpload
          files={files}
          onChange={setFiles}
          accept=".png,.jpg,.jpeg,.gif,.bmp,.pdf"
          note="Cho phép tải tối đa 2 file, dung lượng mỗi file không quá 5MB."
        />

        {files.length > 0 && (
          <ul className={styles.fileList}>
            {files.map((f, i) => (
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

      <button type="submit" className={styles.submitBtn}>
        Gửi báo cáo
      </button>
    </form>
  );
}
