// Step4Form.jsx
import React, { useContext } from 'react';
import styles from './Step4Form.module.scss';
import { CreateJobContext } from '@views/employers/pages/CreateJob/CreateJobContext';

export default function Step4Form() {
    const { form, updateField, handleFieldBlur } = useContext(CreateJobContext);

    // Tăng / giảm số lượng tuyển
    const handleQuantityChange = (delta) => {
        const newQuantity = Math.max(1, (form.quantity || 1) + delta);
        updateField('quantity', newQuantity);
    };

    return (
        <section className={styles.section}>
            <div className={styles.formGrid}>

                {/* Hạn nhận hồ sơ */}
                <div className={styles.field}>
                    <label className={styles.label}>Hạn nhận hồ sơ *</label>
                    <input
                        type="date"
                        value={form.applicationDeadline ? form.applicationDeadline.slice(0, 10) : ""}
                        onChange={(e) => updateField('applicationDeadline', e.target.value)}
                        onBlur={() => handleFieldBlur("applicationDeadline")}
                        className={styles.inputDate}
                    />
                </div>

                {/* Số lượng tuyển */}
                <div className={styles.field}>
                    <label className={styles.label}>Số lượng tuyển *</label>
                    <div className={styles.quantityControl}>
                        <button
                            type="button"
                            onClick={() => handleQuantityChange(-1)}
                            className={styles.quantityButton}
                        >
                            -
                        </button>

                        <input
                            type="number"
                            value={form.quantity || 1}
                            onChange={(e) => updateField('quantity', parseInt(e.target.value) || 1)}
                            className={styles.quantityInput}
                            min="1"
                            onBlur={() => handleFieldBlur("quantity")}
                        />

                        <button
                            type="button"
                            onClick={() => handleQuantityChange(1)}
                            className={styles.quantityButton}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Họ và tên người nhận */}
                <div className={styles.field}>
                    <label className={styles.label}>Họ và tên người nhận *</label>
                    <input
                        type="text"
                        value={form.receiverName || ""}
                        onChange={(e) => updateField('receiverName', e.target.value)}
                        className={styles.inputText}
                        placeholder="Nguyen Duc"
                        onBlur={() => handleFieldBlur("receiverName")}
                    />
                </div>

                {/* Số điện thoại */}
                <div className={styles.field}>
                    <label className={styles.label}>Số điện thoại *</label>
                    <input
                        type="tel"
                        value={form.receiverPhone || ""}
                        onChange={(e) => updateField('receiverPhone', e.target.value)}
                        className={styles.inputText}
                        placeholder="0389355133"
                        onBlur={() => handleFieldBlur("receiverPhone")}
                    />
                </div>

                {/* Email nhận hồ sơ */}
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label className={styles.label}>Email nhận hồ sơ (Tối đa 5 email) *</label>
                    <input
                        type="email"
                        value={form.receiverEmail || ""}
                        onChange={(e) => updateField('receiverEmail', e.target.value)}
                        className={styles.inputEmail}
                        placeholder="a01689355133@gmail.com"
                        onBlur={() => handleFieldBlur("receiverEmail")}
                    />

                    <small className={styles.emailHint}>
                        * {form.receiverEmail || "Ví dụ: example@gmail.com"}
                    </small>
                </div>

            </div>
        </section>
    );
}
