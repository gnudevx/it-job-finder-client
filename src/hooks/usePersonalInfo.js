import { useEffect, useState } from "react";
import { loadPersonalInfo, savePersonalInfo } from "../services/personalInfoService";

export default function usePersonalInfo() {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
    });

    // Load from localStorage
    useEffect(() => {
        const data = loadPersonalInfo();
        setFormData(data);
    }, []);

    // Update input
    const updateField = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Save to localStorage (mock)
    const save = () => {
        const dataToSave = {
            fullName: formData.fullName.trim(),
            phone: formData.phone.trim(),
            email: formData.email, // email không cho sửa
        };
        savePersonalInfo(dataToSave);
    };

    return {
        formData,
        updateField,
        save,
    };
}
