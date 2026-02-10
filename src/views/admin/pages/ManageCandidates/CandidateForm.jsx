import { useState, useEffect } from "react";
import adminService from "@/api/adminService";
import styles from "./CandidateForm.module.scss";
import PropTypes from "prop-types";

export default function CandidateForm({ mode = "create", initialData = {}, onSuccess }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    gender: "",
    avatar: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData && Object.keys(initialData).length > 0) {
      setForm(prev => ({ ...prev, ...initialData }));
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        await adminService.CreateCandidate(form);
      } else {
        await adminService.UpdateCandidate(form._id, form);
      }

      alert(mode === "create" ? "Thêm ứng viên thành công!" : "Cập nhật thành công!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);

      // Lấy message lỗi từ axios
      let msg = "Không rõ lỗi";
      if (err.response?.data?.error) {
        msg = err.response.data.error;
      } else if (err.message) {
        msg = err.message;
      }

      alert("Lỗi khi lưu ứng viên: " + msg);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {mode === "create" ? "Thêm Mới Ứng Viên" : "Chỉnh Sửa Ứng Viên"}
      </h2>

      <div className={styles.row}>
        <label>Họ tên:</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} required />
      </div>

      <div className={styles.row}>
        <label>Email:</label>
        <input name="email" value={form.email} onChange={handleChange} required />
      </div>

      <div className={styles.row}>
        <label>SĐT:</label>
        <input name="phone" value={form.phone} onChange={handleChange} />
      </div>

      <div className={styles.row}>
        <label>Địa chỉ:</label>
        <input name="address" value={form.address} onChange={handleChange} />
      </div>

      <div className={styles.row}>
        <label>Ngày sinh:</label>
        <input type="date" name="birthday" value={form.birthday?.split("T")[0] || ""} onChange={handleChange} />
      </div>

      <div className={styles.row}>
        <label>Giới tính:</label>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">— Chọn —</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      <div className={styles.row}>
        <label>Avatar URL:</label>
        <input name="avatar" value={form.avatar} onChange={handleChange} />
      </div>

      <button className={styles.btn} type="submit">
        {mode === "create" ? "Thêm mới" : "Cập nhật"}
      </button>
    </form>
  );
}

CandidateForm.propTypes = {
  mode: PropTypes.oneOf(["create", "edit"]),
  initialData: PropTypes.object,
  onSuccess: PropTypes.func,
};

CandidateForm.defaultProps = {
  mode: "create",
  initialData: {},
  onSuccess: null,
};