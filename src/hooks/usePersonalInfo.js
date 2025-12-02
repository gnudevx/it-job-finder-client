import { useEffect, useState } from "react";
import { loadPersonalInfo, savePersonalInfo } from "@/api/personalInfoService";

export default function usePersonalInfo() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await loadPersonalInfo();

        setFormData({
          fullName: info.fullName || "",
          phone: info.phone || "",
          email: info.email || "", // <- email từ DB vào FE
        });
      } catch (err) {
        console.error("Không thể load thông tin người dùng", err);
      }
    };

    fetchData();
  }, []);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const save = async () => {
    const payload = {
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      // email không gửi — backend lấy qua JWT
    };

    return await savePersonalInfo(payload);
  };

  return {
    formData,
    updateField,
    save,
  };
}
