import { useState } from "react";
import { changePasswordAPI } from "@/api/changePasswordService";

export default function useChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const updateField = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const changePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword)
      return { ok: false, message: "Mật khẩu mới và xác nhận không khớp!" };

    if (newPassword.length < 6)
      return { ok: false, message: "Mật khẩu mới phải ít nhất 6 ký tự!" };

    setLoading(true);
    try {
      await changePasswordAPI({ currentPassword, newPassword });
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err?.message || "Đổi mật khẩu thất bại!" };
    } finally {
      setLoading(false);
    }
  };

  return { formData, updateField, changePassword, loading };
}
