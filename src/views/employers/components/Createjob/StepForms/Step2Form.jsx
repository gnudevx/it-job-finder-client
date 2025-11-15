import React from "react";
import PropTypes from "prop-types";
import styles from "./Step2Form.module.scss";
import FieldTextArea from "@components/common/FieldTextArea/FieldTextArea.jsx"
import Select from "react-select";
export default function Step2Form({ form, onChange, onBlur }) {
    const cityOptions = [
        { value: "hcm", label: "TP. Hồ Chí Minh" },
        { value: "hn", label: "Hà Nội" },
        { value: "dn", label: "Đà Nẵng" },
    ];
    return (
        <section className={styles.section}>
            {/* Mô tả công việc */}
            <FieldTextArea
                label="Mô tả công việc *"
                name="jobDescription"
                placeholder="Nhập nội dung"
                value={form.jobDescription}
                onChange={onChange}
                onBlur={onBlur}
            />

            {/* Yêu cầu ứng viên */}
            <FieldTextArea
                label="Yêu cầu ứng viên *"
                name="requirements"
                placeholder="Nhập nội dung"
                value={form.requirements}
                onChange={onChange}
                onBlur={onBlur}
            />

            {/* Quyền lợi ứng viên */}
            <FieldTextArea
                label="Quyền lợi ứng viên *"
                name="benefits"
                placeholder="Nhập nội dung"
                value={form.benefits}
                onChange={onChange}
                onBlur={onBlur}
            />

            {/* Địa điểm làm việc */}
            <div className={styles.group}>
                <label className={styles.label}>Địa điểm làm việc *</label>
                <div className={styles.locationRow}>
                    <Select
                        options={cityOptions}
                        value={cityOptions.find(opt => opt.value === form.city)}
                        onChange={(selected) => onChange("city", selected.value)}
                        onBlur={() => onBlur("city")}
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Nhập địa điểm cụ thể..."
                        value={form.address}
                        onChange={(e) => onChange("address", e.target.value)}
                        onBlur={() => onBlur("address")}
                    />
                </div>
            </div>

            {/* Thời gian làm việc */}
            <div className={styles.group}>
                <label className={styles.label}>Thời gian làm việc *</label>
                <div className={styles.timeRow}>
                    <select
                        name="dayFrom"
                        value={form.dayFrom}
                        onChange={(e) => onChange("dayFrom", e.target.value)}
                    >
                        {renderDays()}
                    </select>

                    <span>–</span>

                    <select
                        name="dayTo"
                        value={form.dayTo}
                        onChange={(e) => onChange("dayTo", e.target.value)}
                    >
                        {renderDays()}
                    </select>

                    <input
                        type="time"
                        name="timeFrom"
                        value={form.timeFrom}
                        onChange={(e) => onChange("timeFrom", e.target.value)}
                    />

                    <input
                        type="time"
                        name="timeTo"
                        value={form.timeTo}
                        onChange={(e) => onChange("timeTo", e.target.value)}
                    />
                </div>
            </div>
        </section>
    );
}

/* ---------------------------------------
   COMPONENT TÁI SỬ DỤNG
--------------------------------------- */
function renderDays() {
    const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
    return days.map((d) => <option key={d} value={d}>{d}</option>);
}

/* ---------------------------------------
   PROP TYPES
--------------------------------------- */

Step2Form.propTypes = {
    form: PropTypes.shape({
        jobDescription: PropTypes.string,
        requirements: PropTypes.string,
        benefits: PropTypes.string,
        city: PropTypes.string,
        address: PropTypes.string,
        dayFrom: PropTypes.string,
        dayTo: PropTypes.string,
        timeFrom: PropTypes.string,
        timeTo: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func, // bạn cần validate từng field
};
