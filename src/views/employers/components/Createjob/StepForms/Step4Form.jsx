// Step3Form.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Thêm import PropTypes
import styles from './Step4Form.module.scss'; // Giả định bạn có file CSS Modules

const Step4Form = ({ form, onChange, onBlur }) => {
    // Hàm xử lý tăng/giảm số lượng tuyển
    const handleQuantityChange = (delta) => {
        const newQuantity = Math.max(1, (form.quantity || 1) + delta); // Đảm bảo số lượng không âm
        onChange('quantity', newQuantity);
    };

    return (
        <section className={styles.section}>

            <div className={styles.formGrid}>
                {/* Hạn nhận hồ sơ */}
                <div className={styles.field}>
                    <label className={styles.label}>Hạn nhận hồ sơ *</label>
                    <input
                        type="date"
                        value={form.applicationDeadline}
                        onChange={(e) => onChange('applicationDeadline', e.target.value)}
                        className={styles.inputDate}
                        onBlur={() => onBlur("applicationDeadline")}
                    />
                </div>

                {/* Số lượng tuyển */}
                <div className={styles.field}>
                    <label className={styles.label}>Số lượng tuyển *</label>
                    <div className={styles.quantityControl}>
                        <button type="button" onClick={() => handleQuantityChange(-1)} className={styles.quantityButton}>-</button>
                        <input
                            type="number"
                            value={form.quantity}
                            onChange={(e) => onChange('quantity', parseInt(e.target.value) || 1)}
                            className={styles.quantityInput}
                            min="1"
                            onBlur={() => onBlur && onBlur('quantity')}
                        />
                        <button type="button" onClick={() => handleQuantityChange(1)} className={styles.quantityButton}>+</button>
                    </div>
                </div>

                {/* Họ và tên người nhận */}
                <div className={styles.field}>
                    <label className={styles.label}>Họ và tên người nhận *</label>
                    <input
                        type="text"
                        value={form.receiverName}
                        onChange={(e) => onChange('receiverName', e.target.value)}
                        className={styles.inputText}
                        placeholder="Nguyen Duc"
                        onBlur={() => onBlur("receiverName")}
                    />
                </div>

                {/* Số điện thoại */}
                <div className={styles.field}>
                    <label className={styles.label}>Số điện thoại *</label>
                    <input
                        type="tel"
                        value={form.receiverPhone}
                        onChange={(e) => onChange('receiverPhone', e.target.value)}
                        className={styles.inputText}
                        placeholder="0389355133"
                        onBlur={() => onBlur && onBlur('receiverPhone')}
                    />
                </div>

                {/* Email nhận hồ sơ */}
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label className={styles.label}>Email nhận hồ sơ (Tối đa 5 email) *</label>
                    <input
                        type="email"
                        value={form.receiverEmail}
                        onChange={(e) => onChange('receiverEmail', e.target.value)}
                        className={styles.inputEmail}
                        placeholder="a01689355133@gmail.com"
                        onBlur={() => onBlur("receiverEmail")}
                    />
                    <small className={styles.emailHint}>* a01689355133@gmail.com</small>
                </div>
            </div>


        </section>
    );
};

// Thêm PropTypes để validate props
Step4Form.propTypes = {
    form: PropTypes.shape({
        applicationDeadline: PropTypes.string,
        quantity: PropTypes.number,
        receiverName: PropTypes.string,
        receiverPhone: PropTypes.string,
        receiverEmail: PropTypes.string,
        campaign: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
};

export default Step4Form;
