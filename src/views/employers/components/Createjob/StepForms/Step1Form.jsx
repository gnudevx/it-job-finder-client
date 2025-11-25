import React, { useContext, useEffect, useState } from 'react';
import styles from './Step1Form.module.scss';
import CreatableSelect from 'react-select/creatable';
import { CreateJobContext } from '@views/employers/pages/CreateJob/CreateJobContext';
import axios from 'axios';
export default function Step1Form() {
    const {
        form,
        updateField,
        handleFieldBlur,
        validatedFields
    } = useContext(CreateJobContext);

    // 1. State để lưu dữ liệu gốc từ API
    const [metaData, setMetaData] = useState([]);

    // 2. State cho danh sách options của Domain (Kiến thức ngành)
    const [domainOptions, setDomainOptions] = useState([]);

    const titleLength = form.title?.length || 0;
    const isNegotiable = form.salaryNegotiable || false;

    // 3. Gọi API khi component load lần đầu
    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                // Thay URL này bằng đường dẫn API thực tế của bạn
                const res = await axios.get('/employer/api/specialization');
                console.log("sadsadsads", res)
                // Giả sử API trả về { data: [...] } hoặc mảng trực tiếp
                const rawData = res.data.data || res.data;
                setMetaData(rawData);

                // cần load lại domainOptions ngay lập tức
                if (form.specialization) {
                    const selectedSpec = rawData.find(item => item.code === form.specialization);
                    if (selectedSpec) {
                        const formattedDomains = selectedSpec.domains.map(d => ({
                            value: d.code,
                            label: d.name
                        }));
                        setDomainOptions(formattedDomains);
                    }
                }
            } catch (error) {
                console.error("Lỗi lấy dữ liệu chuyên môn:", error);
            }
        };

        fetchSpecializations();
    }, [form.specialization]); // Thêm form.specialization vào dependency để reload khi edit

    // 4. Hàm xử lý khi thay đổi Vị trí chuyên môn
    const handleSpecializationChange = (e) => {
        const selectedCode = e.target.value;

        // Cập nhật giá trị vào Form Context
        updateField('specialization', selectedCode);

        // Reset lại kiến thức ngành (vì đổi chuyên môn thì kiến thức cũ k còn đúng)
        updateField('domainKnowledge', []);

        // Tìm và cập nhật danh sách gợi ý cho Domain
        const selectedSpecData = metaData.find(item => item.code === selectedCode);

        if (selectedSpecData && selectedSpecData.domains) {
            // Map dữ liệu từ API sang format {value, label} của react-select
            const nextOptions = selectedSpecData.domains.map(d => ({
                value: d.code,
                label: d.name
            }));
            setDomainOptions(nextOptions);
        } else {
            setDomainOptions([]);
        }
    };
    const formatCurrency = (value) => {
        if (!value) return "";
        return Number(value).toLocaleString('en-US'); // 1,000,000
    };
    const handleMoneyChange = (e, field) => {
        let raw = e.target.value.replace(/,/g, ''); // xoá dấu phẩy
        if (!/^\d*$/.test(raw)) return; // chỉ cho nhập số
        if (raw.length > 10) return;    // tối đa 10 chữ số (999 triệu)

        updateField(field, raw); // lưu raw (không format)
    };
    return (
        <div className={styles.formContent}>
            {/* Tiêu đề tin */}
            <label className={styles.field}>
                <div className={styles.labelHeader}>
                    <span>Tiêu đề tin *</span>
                    <span className={styles.charCount}>{titleLength}/50</span>
                </div>
                <input
                    type="text"
                    value={form.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    onBlur={() => handleFieldBlur('title')}
                    placeholder="VD: Nhân Viên Kinh Doanh Bất Động Sản"
                    maxLength={50}
                    className={!validatedFields.title ? styles.inputError : ''}
                />
                {!validatedFields.title && <div className={styles.errorText}> *Tiêu đề không được để trống</div>}
            </label>

            {/* Vị trí chuyên môn */}
            <label className={styles.field}>
                <div className={styles.labelHeader}><span>Vị trí chuyên môn *</span></div>
                <select
                    value={form.specialization}
                    onChange={handleSpecializationChange} // Dùng hàm xử lý mới
                    onBlur={() => handleFieldBlur('specialization')}
                    className={!validatedFields.specialization ? styles.inputError : ''}
                >
                    <option value="">Chọn vị trí chuyên môn</option>
                    {/* Render danh sách từ API metaData */}
                    {metaData.map((spec) => (
                        <option key={spec.code} value={spec.code}>
                            {spec.name}
                        </option>
                    ))}
                </select>
                {!validatedFields.specialization && <div className={styles.errorText}>Vui lòng chọn vị trí chuyên môn</div>}
            </label>

            {/* Kiến thức ngành */}
            <div className={styles.field}>
                <div className={styles.labelHeader}><span>Kiến thức ngành</span></div>
                <CreatableSelect
                    isMulti
                    options={domainOptions} // Sử dụng state domainOptions đã lọc

                    // Logic hiển thị value: Phải map từ string code sang object {value, label}
                    value={domainOptions.filter(opt => form.domainKnowledge?.includes(opt.value))}

                    onChange={(selected) => updateField("domainKnowledge", selected.map(opt => opt.value))}

                    placeholder={form.specialization ? "Chọn hoặc nhập kiến thức ngành..." : "Vui lòng chọn Vị trí chuyên môn trước"}
                    isDisabled={!form.specialization} // Disable nếu chưa chọn chuyên môn

                    className={styles.select}
                    formatCreateLabel={(inputValue) => `Tạo mới: "${inputValue}"`}
                />
            </div>
            {/* Cấp bậc */}
            <label className={styles.field}>
                <div className={styles.labelHeader}><span>Cấp bậc *</span></div>
                <select
                    value={form.level}
                    onChange={(e) => updateField('level', e.target.value)}
                    onBlur={() => handleFieldBlur('level')}
                    className={!validatedFields.level ? styles.inputError : ''}
                >
                    <option value="">Chọn cấp bậc</option>
                    <option value="intern">Thực tập sinh</option>
                    <option value="fresher">Fresher</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="manager">Trưởng nhóm / Quản lý</option>
                </select>
                {!validatedFields.level && <div className={styles.errorText}>Vui lòng chọn cấp bậc</div>}
            </label>

            {/* Loại công việc + Lương */}
            <div className={styles.row}>
                <label className={`${styles.field} ${styles.fieldHalf}`}>
                    <div className={styles.labelHeader}><span>Loại công việc *</span></div>
                    <select
                        value={form.jobType}
                        onChange={(e) => updateField('jobType', e.target.value)}
                        onBlur={() => handleFieldBlur('jobType')}
                        className={!validatedFields.jobType ? styles.inputError : ''}
                    >
                        <option value="">Chọn</option>
                        <option value="fulltime">Toàn thời gian</option>
                        <option value="parttime">Bán thời gian</option>
                        <option value="internship">Thực tập</option>
                        <option value="remote">Remote</option>
                    </select>
                    {!validatedFields.jobType && <div className={styles.errorText}>Vui lòng chọn loại công việc</div>}
                </label>

                <div className={`${styles.field} ${styles.fieldHalf}`}>
                    <div className={styles.labelHeader}>
                        <span>Mức lương *</span>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={isNegotiable}
                                onChange={(e) => updateField('salaryNegotiable', e.target.checked)}
                                onBlur={() => handleFieldBlur('salary')}
                            />
                            Thỏa thuận
                        </label>
                    </div>

                    <div className={`${styles.salaryRow} ${isNegotiable ? styles.disabled : ''}`}>
                        <input
                            type="text"
                            value={formatCurrency(form.salaryFrom)}
                            onChange={(e) => handleMoneyChange(e, 'salaryFrom')}
                            onBlur={() => handleFieldBlur('salary')}
                            disabled={isNegotiable}
                        />
                        <input
                            type="text"
                            value={formatCurrency(form.salaryTo)}
                            onChange={(e) => handleMoneyChange(e, 'salaryTo')}
                            onBlur={() => handleFieldBlur('salary')}
                            disabled={isNegotiable}
                        />
                        <select
                            className={styles.salaryCurrency}
                            value={form.salaryCurrency || 'VND'}
                            onChange={(e) => updateField('salaryCurrency', e.target.value)}
                            disabled={isNegotiable}
                        >
                            <option>VND</option>
                            <option>USD</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
