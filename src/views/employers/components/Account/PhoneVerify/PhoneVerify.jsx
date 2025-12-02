import React, { useState, useEffect } from "react";
import styles from "./PhoneVerify.module.scss";
import employerPhoneApi from "@/services/employerPhoneApiService.js";
import Employer from "@/services/employerSerivce";

export default function PhoneVerify() {
    const [phone, setPhone] = useState("");
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Lấy dữ liệu từ backend khi mount
    useEffect(() => {
        const fetchEmployer = async () => {
            try {
                const res = await Employer.getMe(); // gọi backend
                setPhone(res.user.phone || "");
                setVerified(res.user.phoneVerified || false);
                console.log("Lấy phone thất bại", res, res.phone, res.phoneVerified);
                setErrorMessage("");
            } catch (err) {
                console.error("Lấy phone thất bại", err);
                setErrorMessage("Không thể lấy thông tin nhà tuyển dụng.");
            }
        };
        fetchEmployer();
    }, []);

    const handleVerify = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        const normalized = phone.replace(/\D/g, "");
        if (normalized.length < 9 || normalized.length > 12) {
            setErrorMessage("Số điện thoại không hợp lệ.");
            return;
        }

        try {
            setLoading(true);

            const res = await employerPhoneApi.verifyPhone({ phone: normalized });
            const employer = res.data.employer;

            // Cập nhật mọi thứ từ backend
            setPhone(employer.phone);
            setVerified(employer.phoneVerified);

            setSuccessMessage(res.data.message);
            setErrorMessage(""); // reset error

        } catch (err) {
            // backend trả lỗi (400, 404, 500)
            const msg = err?.response?.data?.message || "Lỗi server, thử lại sau.";
            setErrorMessage(msg);
            setSuccessMessage("");
            setVerified(false);
        } finally {
            setLoading(false);
        }
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
                        disabled={verified}
                    />
                    <button
                        className={styles.btn}
                        onClick={handleVerify}
                        disabled={loading || verified}
                    >
                        {verified ? "Đã xác thực" : loading ? "Đang gửi..." : "Gửi mã xác thực"}
                    </button>
                </div>

                {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                {successMessage && <div className={styles.success}>✅ {successMessage}</div>}

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
