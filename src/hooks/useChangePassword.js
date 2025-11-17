import { useState, useEffect } from "react";
import { getCurrentPassword, saveNewPassword } from "@/api/changePasswordService";

export default function useChangePassword() {
    const [formData, setFormData] = useState({
        email: "22110434@student.hcmute.edu.vn",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [storedPassword, setStoredPassword] = useState("");

    // Load mật khẩu mock từ localStorage
    useEffect(() => {
        setStoredPassword(getCurrentPassword());
    }, []);

    const updateField = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const changePassword = () => {
        if (formData.currentPassword !== storedPassword) {
            return { ok: false, message: "Mật khẩu hiện tại không chính xác!" };
        }

        if (formData.newPassword !== formData.confirmPassword) {
            return { ok: false, message: "Mật khẩu mới và xác nhận không khớp!" };
        }

        if (formData.newPassword.length < 6) {
            return { ok: false, message: "Mật khẩu mới phải ít nhất 6 ký tự!" };
        }

        saveNewPassword(formData.newPassword);

        return { ok: true };
    };

    return {
        formData,
        updateField,
        changePassword,
    };
}
