import React, { useContext } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import styles from "./Step3Form.module.scss";
import { CreateJobContext } from '@views/employers/pages/CreateJob/CreateJobContext';
export default function Step3Form() {
    const { form, updateField, handleFieldBlur } = useContext(CreateJobContext);
    // Dữ liệu mẫu
    const skillOptions = [
        { value: "ReactJS", label: "ReactJS" },
        { value: "NodeJS", label: "NodeJS" },
        { value: "Python", label: "Python" },
        { value: "SQL", label: "SQL" },
        { value: "Communication", label: "Giao tiếp" },
        { value: "Teamwork", label: "Làm việc nhóm" },
        { value: "Leadership", label: "Kỹ năng lãnh đạo" },
    ];

    const languageOptionsDefault = [
        { value: "Tiếng Anh", label: "Tiếng Anh" },
        { value: "Tiếng Nhật", label: "Tiếng Nhật" },
        { value: "Tiếng Hàn", label: "Tiếng Hàn" },
        { value: "Tiếng Trung", label: "Tiếng Trung" },
    ];

    const [languageOptions, setLanguageOptions] = React.useState(languageOptionsDefault);

    const addNewLanguage = () => {
        const newLang = prompt("Nhập ngoại ngữ mới:");
        if (newLang && !languageOptions.some((opt) => opt.value === newLang)) {
            const newOption = { value: newLang, label: newLang };
            setLanguageOptions([...languageOptions, newOption]);
            updateField("languages", [...(form.languages || []), newOption]);
        }
    };

    return (
        <section className={styles.section}>
            {/* --- Học vấn & Kinh nghiệm --- */}
            <div className={styles.row}>
                <label className={styles.field}>
                    <div className={styles.label}>Học vấn tối thiểu *</div>
                    <select
                        value={form.education || ""}
                        onChange={(e) => updateField('education', e.target.value)}
                        onBlur={() => handleFieldBlur("education")}
                    >
                        <option value="">-- Chọn học vấn --</option>
                        <option value="Trung cấp">Trung cấp</option>
                        <option value="Cao đẳng">Cao đẳng</option>
                        <option value="Đại học">Đại học</option>
                        <option value="Sau đại học">Sau đại học</option>
                    </select>
                </label>

                <label className={styles.field}>
                    <div className={styles.label}>Số năm kinh nghiệm *</div>
                    <select
                        value={form.experience || ""}
                        onChange={(e) => updateField("experience", e.target.value)}
                        onBlur={() => handleFieldBlur("experience")}
                    >
                        <option value="">-- Chọn kinh nghiệm --</option>
                        <option value="Dưới 1 năm">Dưới 1 năm</option>
                        <option value="1-3 năm">1-3 năm</option>
                        <option value="3-5 năm">3-5 năm</option>
                        <option value="Trên 5 năm">Trên 5 năm</option>
                    </select>
                </label>
            </div>

            {/* --- Giới tính & Độ tuổi --- */}
            <div className={styles.row}>
                <label className={styles.field}>
                    <div className={styles.label}>Giới tính</div>
                    <select
                        value={form.gender || ""}
                        onChange={(e) => updateField('gender', e.target.value)}
                    >
                        <option value="">-- Chọn giới tính --</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Không yêu cầu">Không yêu cầu</option>
                    </select>
                </label>

                <label className={styles.field}>
                    <div className={styles.label}>Độ tuổi</div>
                    <input
                        type="text"
                        placeholder="VD: 22-30"
                        value={form.ageRange || ""}
                        onChange={(e) => updateField('ageRange', e.target.value)}
                        onBlur={() => handleFieldBlur("ageRange")}
                    />
                </label>
            </div>

            {/* --- Kỹ năng cần có --- */}
            <div className={styles.field}>
                <div className={styles.label}>Kỹ năng cần có</div>
                <Select
                    isMulti
                    options={skillOptions}
                    value={form.mustHaveSkills || []}
                    onChange={(selected) => updateField("mustHaveSkills", selected)}
                    onBlur={() => handleFieldBlur("mustHaveSkills")}
                    placeholder="Chọn kỹ năng cần có..."
                    className={styles.select}
                    menuPortalTarget={document.body}
                />
            </div>

            {/* --- Kỹ năng nên có --- */}
            <div className={styles.field}>
                <div className={styles.label}>Kỹ năng nên có</div>
                <Select
                    isMulti
                    options={skillOptions}
                    value={form.optionalSkills || []}
                    onChange={(selected) => updateField("optionalSkills", selected)}
                    placeholder="Chọn kỹ năng nên có..."
                    className={styles.select}
                    menuPortalTarget={document.body}
                />
            </div>

            {/* --- Ngoại ngữ --- */}
            <div className={styles.field}>
                <div className={styles.labelRow}>
                    <span className={styles.label}>Ngoại ngữ</span>
                    <button
                        type="button"
                        onClick={addNewLanguage}
                        className={styles.addBtn}
                    >
                        + Thêm
                    </button>
                </div>
                <Select
                    isMulti
                    options={languageOptions}
                    value={form.languages || []}
                    onChange={(selected) => updateField("languages", selected)}
                    onBlur={() => handleFieldBlur("languages")}
                    placeholder="Chọn ngoại ngữ..."
                    className={styles.select}
                    menuPortalTarget={document.body}
                />
            </div>
        </section>
    );
}

Step3Form.propTypes = {
    form: PropTypes.shape({
        education: PropTypes.string,
        experience: PropTypes.string,
        gender: PropTypes.string,
        ageRange: PropTypes.string,
        mustHaveSkills: PropTypes.array,
        optionalSkills: PropTypes.array,
        languages: PropTypes.array,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
};
