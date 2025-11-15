const STORAGE_KEY = "personal_info";

export const loadPersonalInfo = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        return {
            fullName: "Nguyễn Tín",
            phone: "",
            email: "22110434@student.hcmute.edu.vn",
        };
    }
    return JSON.parse(saved);
};

export const savePersonalInfo = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
