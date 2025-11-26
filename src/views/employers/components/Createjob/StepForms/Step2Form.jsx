import React, { useState, useEffect, useContext } from "react";
import styles from "./Step2Form.module.scss";
import FieldTextArea from "@components/common/FieldTextArea/FieldTextArea.jsx";
import Select from "react-select";
import axios from "axios";
import { CreateJobContext } from '@views/employers/pages/CreateJob/CreateJobContext';

export default function Step2Form() {
    const { form, updateField, handleFieldBlur } = useContext(CreateJobContext);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // --- Load provinces khi mount ---
    useEffect(() => {
        axios.get('/employer/api/locations/provinces')
            .then(res => setProvinces(res.data))
            .catch(err => console.error(err));
    }, []);

    // --- Load districts khi chọn province ---
    useEffect(() => {
        if (!form.province) {
            setDistricts([]);
            setWards([]);
            updateField('district', '');
            updateField('ward', '');
            return;
        }
        axios.get(`/employer/api/locations/districts/${form.province}`)
            .then(res => setDistricts(res.data))
            .catch(err => console.error(err));
    }, [form.province]);

    // --- Load wards khi chọn district ---
    useEffect(() => {
        if (!form.district) {
            setWards([]);
            updateField('ward', '');
            return;
        }
        axios.get(`/employer/api/locations/wards/${form.district}`)
            .then(res => setWards(res.data))
            .catch(err => console.error(err));
    }, [form.district]);

    return (
        <section className={styles.section}>
            {/* Mô tả công việc */}
            <FieldTextArea
                label="Mô tả công việc *"
                name="jobDescription"
                placeholder="Nhập nội dung"
                value={form.jobDescription}
                onChange={updateField}
                onBlur={() => handleFieldBlur('jobDescription')}
            />

            {/* Yêu cầu ứng viên */}
            <FieldTextArea
                label="Yêu cầu ứng viên *"
                name="requirements"
                placeholder="Nhập nội dung"
                value={form.requirements}
                onChange={updateField}
                onBlur={() => handleFieldBlur('requirements')}
            />

            {/* Quyền lợi ứng viên */}
            <FieldTextArea
                label="Quyền lợi ứng viên *"
                name="benefits"
                placeholder="Nhập nội dung"
                value={form.benefits}
                onChange={updateField}
                onBlur={() => handleFieldBlur('benefits')}
            />

            {/* Địa điểm làm việc */}
            <div className={styles.group}>
                <label className={styles.label}>Địa điểm làm việc *</label>
                <div className={styles.locationRow}>
                    {/* Province */}
                    <Select
                        options={provinces.map(p => ({ value: p.code, label: p.name }))}
                        value={provinces.map(p => ({ value: p.code, label: p.name }))
                            .find(opt => opt.value === form.province)}
                        onChange={(selected) => {
                            updateField('province', selected.value);
                        }}
                        onBlur={() => handleFieldBlur('province')}
                        placeholder="Chọn tỉnh/thành phố"
                        menuPortalTarget={document.body}
                    />

                    {/* District */}
                    <Select
                        options={districts.map(d => ({ value: d.code, label: d.name }))}
                        value={districts.map(d => ({ value: d.code, label: d.name }))
                            .find(opt => opt.value === form.district)}
                        onChange={selected => updateField('district', selected.value)}
                        onBlur={() => handleFieldBlur('district')}
                        placeholder="Chọn quận/huyện"
                        isDisabled={!form.province}
                        menuPortalTarget={document.body}
                    />

                    {/* Ward */}
                    <Select
                        options={wards.map(w => ({ value: w.code, label: w.name }))}
                        value={wards.map(w => ({ value: w.code, label: w.name }))
                            .find(opt => opt.value === form.ward)}
                        onChange={selected => updateField('ward', selected.value)}
                        onBlur={() => handleFieldBlur('ward')}
                        placeholder="Chọn phường/xã"
                        isDisabled={!form.district}
                        menuPortalTarget={document.body}
                    />

                    {/* Address chi tiết */}
                    <input
                        type="text"
                        name="address"
                        placeholder="Nhập địa điểm cụ thể..."
                        value={form.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        onBlur={() => handleFieldBlur('address')}
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
                        onChange={(e) =>
                            updateField("workingTime", {
                                ...form.workingTime,
                                dayFrom: e.target.value,
                            })
                        }
                        onBlur={() => handleFieldBlur("dayFrom")}
                    >
                        {renderDays()}
                    </select>

                    <span>–</span>

                    <select
                        name="dayTo"
                        value={form.dayTo}
                        onChange={(e) =>
                            updateField("workingTime", {
                                ...form.workingTime,
                                dayTo: e.target.value,
                            })
                        }
                        onBlur={() => handleFieldBlur("dayTo")}
                    >
                        {renderDays()}
                    </select>

                    <input
                        type="time"
                        name="timeFrom"
                        value={form.timeFrom}
                        onChange={(e) =>
                            updateField("workingTime", {
                                ...form.workingTime,
                                timeFrom: e.target.value,
                            })
                        }
                        onBlur={() => handleFieldBlur("timeFrom")}
                    />

                    <input
                        type="time"
                        name="timeTo"
                        value={form.timeTo}
                        onChange={(e) =>
                            updateField("workingTime", {
                                ...form.workingTime,
                                timeTo: e.target.value,
                            })
                        }

                        onBlur={() => handleFieldBlur("timeTo")}
                    />
                </div>
            </div>
        </section>
    );
}

// Render days
function renderDays() {
    const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
    return days.map(d => <option key={d} value={d}>{d}</option>);
}
