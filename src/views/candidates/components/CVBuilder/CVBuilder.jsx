import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./CVBuilder.module.scss";

export default function CVBuilder({ onSave }) {
  const [form, setForm] = useState({
    fullName: "",
    position: "",
    summary: "",
    skills: "",
    experience: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateCV = () => {
    const previewHtml = `
      <html>
      <body>
        <h1>${form.fullName}</h1>
        <h2>${form.position}</h2>
        <p>${form.summary}</p>
        <h3>Kỹ năng</h3>
        <p>${form.skills}</p>
        <h3>Kinh nghiệm</h3>
        <p>${form.experience}</p>
      </body>
      </html>
    `;

    const blob = new Blob([previewHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    onSave({
      id: Date.now(),
      title: `${form.fullName} - ${form.position}`,
      previewUrl: url,
    });
  };

  return (
    <div className={styles.container}>
      <h2>Tạo CV mới</h2>

      <div className={styles.group}>
        <label>Họ và tên</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} />
      </div>

      <div className={styles.group}>
        <label>Vị trí ứng tuyển</label>
        <input name="position" value={form.position} onChange={handleChange} />
      </div>

      <div className={styles.group}>
        <label>Tóm tắt</label>
        <textarea name="summary" value={form.summary} onChange={handleChange} />
      </div>

      <div className={styles.group}>
        <label>Kỹ năng</label>
        <textarea name="skills" value={form.skills} onChange={handleChange} />
      </div>

      <div className={styles.group}>
        <label>Kinh nghiệm</label>
        <textarea
          name="experience"
          value={form.experience}
          onChange={handleChange}
        />
      </div>

      <button className={styles.saveBtn} onClick={handleCreateCV}>
        Lưu CV
      </button>
    </div>
  );
}

CVBuilder.propTypes = {
  onSave: PropTypes.func.isRequired,
};
