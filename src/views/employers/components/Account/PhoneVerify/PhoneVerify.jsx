// src/views/employers/pages/PhoneVerify/PhoneVerify.jsx
import React, { useState, useEffect } from "react";
import styles from "./PhoneVerify.module.scss";
import { updateEmployerStep, getEmployerSteps } from "@/utils/stepProgress.js";

export default function PhoneVerify() {
    const [phone, setPhone] = useState("");
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // nếu đã verify trước đó thì hiển thị
        const steps = getEmployerSteps();
        if (steps.phoneVerified) {
            setVerified(true);
        }
    }, []);

    const fakeCheckPhoneUsed = (phoneValue) => {
        // mô phỏng: nếu bằng số này => đã có nhà tuyển dụng khác dùng
        const usedNumbers = ["0389355133", "0389351111"];
        return usedNumbers.includes(phoneValue);
    };

    const handleVerify = async () => {
        setErrorMessage("");
        // simple validation
        const normalized = phone.replace(/\D/g, "");
        if (normalized.length < 9 || normalized.length > 12) {
            setErrorMessage("Số điện thoại không hợp lệ.");
            return;
        }

        setLoading(true);
        // simulate API delay
        setTimeout(() => {
            setLoading(false);
            if (fakeCheckPhoneUsed(normalized)) {
                // số đã được dùng -> show message (như ảnh bạn gửi)
                setErrorMessage("Số điện thoại đã được xác thực bởi nhà tuyển dụng khác. Vui lòng dùng số khác.");
                setVerified(false);
                return;
            }

            // simulate otp send & verify success instantly for demo
            setVerified(true);
            updateEmployerStep("phoneVerified", true);

            // Hiệu ứng success trên page (giữ ở trang hiện tại)
            // nếu bạn muốn điều hướng về Dashboard thì uncomment navigate
            // navigate("/employer/dashboard");

        }, 800);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.banner}>
                <h1>Xác thực số điện thoại nhà tuyển dụng</h1>
            </div>

            <div className={styles.card}>
                <h3>Cập nhật và xác thực số điện thoại</h3>

                <div className={styles.formRow}>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nhập số điện thoại"
                        className={styles.input}
                    />
                    <button className={styles.btn} onClick={handleVerify} disabled={loading || verified}>
                        {verified ? "Đã xác thực" : loading ? "Đang gửi..." : "Gửi mã xác thực"}
                    </button>
                </div>

                {errorMessage && <div className={styles.error}>{errorMessage}</div>}

                {verified && <div className={styles.success}>✅ Số điện thoại đã xác thực thành công.</div>}

                <div className={styles.info}>
                    <h4>Lợi ích khi xác thực số điện thoại:</h4>
                    <ul>
                        <li>Tăng cường bảo mật tài khoản nhà tuyển dụng.</li>
                        <li>Tăng khả năng hiển thị tin tuyển dụng.</li>
                        <li>Được hỗ trợ nhanh khi có vấn đề phát sinh.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
