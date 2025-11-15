import React from 'react';
import PropTypes from 'prop-types';
import styles from './Step1Form.module.scss';
import CreatableSelect from 'react-select/creatable';
export default function Step1Form({ form, onChange, onFieldBlur }) {
    const titleLength = form.title?.length || 0;
    const isNegotiable = form.salaryNegotiable || false;
    const domainOptions = [
        { value: "ecommerce", label: "Thương mại điện tử" },
        { value: "finance", label: "Tài chính (Fintech)" },
        { value: "education", label: "Giáo dục (Edutech)" },
    ];
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
                    onChange={(e) => onChange('title', e.target.value)}
                    onBlur={() => onFieldBlur('title')}
                    placeholder="VD: Nhân Viên Kinh Doanh Bất Động Sản - Dự Án Chung Cư Cao Cấp"
                    maxLength={50}
                />
            </label>

            {/* Vị trí chuyên môn */}
            <label className={styles.field}>
                <div className={styles.labelHeader}><span>Vị trí chuyên môn *</span></div>
                <select
                    value={form.specialization}
                    onChange={(e) => onChange('specialization', e.target.value)}
                    onBlur={() => onFieldBlur('specialization')}
                >
                    <option value="">Chọn vị trí chuyên môn</option>
                    <option value="it-software">IT - Phần mềm</option>
                    <option value="it-hardware">IT - Phần cứng</option>
                    <option value="design">Thiết kế</option>
                    <option value="business-development">Kinh doanh</option>
                </select>
            </label>

            {/* Kiến thức ngành */}
            <div className={styles.field}>
                <div className={styles.labelHeader}><span>Kiến thức ngành</span></div>
                <CreatableSelect
                    isMulti
                    options={domainOptions}
                    value={domainOptions.filter(opt => form.domainKnowledge?.includes(opt.value))}
                    onChange={(selected) => {
                        onChange("domainKnowledge", selected.map(opt => opt.value));
                    }}
                    placeholder="Chọn hoặc nhập kiến thức ngành..."
                    className={styles.select}
                />
            </div>

            {/* Cấp bậc */}
            <label className={styles.field}>
                <div className={styles.labelHeader}><span>Cấp bậc *</span></div>
                <select
                    value={form.level}
                    onChange={(e) => onChange('level', e.target.value)}
                    onBlur={() => onFieldBlur('level')}
                >
                    <option value="">Chọn cấp bậc</option>
                    <option value="intern">Thực tập sinh</option>
                    <option value="fresher">Fresher</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="manager">Trưởng nhóm / Quản lý</option>
                </select>
            </label>

            {/* Loại công việc + Lương */}
            <div className={styles.row}>
                <label className={`${styles.field} ${styles.fieldHalf}`}>
                    <div className={styles.labelHeader}><span>Loại công việc *</span></div>
                    <select
                        value={form.jobType}
                        onChange={(e) => onChange('jobType', e.target.value)}
                        onBlur={() => onFieldBlur('jobType')}
                    >
                        <option value="">Chọn</option>
                        <option value="fulltime">Toàn thời gian</option>
                        <option value="parttime">Bán thời gian</option>
                        <option value="internship">Thực tập</option>
                        <option value="remote">Remote</option>
                    </select>
                </label>

                <div className={`${styles.field} ${styles.fieldHalf}`}>
                    <div className={styles.labelHeader}>
                        <span>Mức lương *</span>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={isNegotiable}
                                onChange={(e) => onChange('salaryNegotiable', e.target.checked)}
                                onBlur={() => onFieldBlur('salary')}
                            />
                            Thỏa thuận
                        </label>
                    </div>

                    <div className={`${styles.salaryRow} ${isNegotiable ? styles.disabled : ''}`}>
                        <input
                            type="number"
                            value={form.salaryFrom}
                            onChange={(e) => onChange('salaryFrom', e.target.value)}
                            onBlur={() => onFieldBlur('salary')}
                            disabled={isNegotiable}
                        />
                        <span className={styles.salaryDash}>–</span>
                        <input
                            type="number"
                            value={form.salaryTo}
                            onChange={(e) => onChange('salaryTo', e.target.value)}
                            onBlur={() => onFieldBlur('salary')}
                            disabled={isNegotiable}
                        />
                        <select
                            className={styles.salaryCurrency}
                            value={form.salaryCurrency || 'VND'}
                            onChange={(e) => onChange('salaryCurrency', e.target.value)}
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

Step1Form.propTypes = {
    form: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onFieldBlur: PropTypes.func.isRequired,
};
