import React, { useEffect, useState } from "react";
import styles from "./HisUpdateAccount.module.scss";
import { Dot } from "lucide-react";
import { accountActivityService } from "@/api/authLog.service.js";

export const ACTION_LABEL = {
    UPDATE_PROFILE: "Cập nhật thông tin cá nhân",
    UPLOAD_LICENSE: "Tải lên giấy phép kinh doanh",
    VERIFY_PHONE: "Xác thực số điện thoại",
    CHANGE_PASSWORD: "Đổi mật khẩu",
    UPDATE_EMAIL: "Cập nhật email",
    UPDATE_AVATAR: "Cập nhật ảnh đại diện",
    UPGRADE_PACKAGE: "Nâng cấp gói dịch vụ",
    PAYMENT_FAILED: "Thanh toán thất bại",
};

const transformActivities = (rawData) => {
    return rawData.map((item) => {
        let actionText = ACTION_LABEL[item.action] || item.action;

        if (item.action === "UPGRADE_PACKAGE" && item.meta?.tier) {
            actionText = `Nâng cấp gói ${item.meta.tier}`;
        }

        return {
            id: item._id,
            action: actionText,
            timestamp: item.createdAt,
        };
    });
};

export default function HisUpdateAccount() {
    const [history, setHistory] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res =
                    await accountActivityService.getAccountSettingActivities();
                const transformed = transformActivities(res.data);
                setHistory(transformed);
            } catch (err) {
                console.error("Fetch history failed", err);
            }
        };

        fetchHistory();
    }, []);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const filteredHistory = history.filter((item) => {
        const itemDate = new Date(item.timestamp)
            .toISOString()
            .split("T")[0];
        if (startDate && itemDate < startDate) return false;
        if (endDate && itemDate > endDate) return false;
        return true;
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Lịch sử cập nhật tài khoản</h2>
                <div className={styles.dateRange}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span>→</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.list}>
                {filteredHistory.length === 0 ? (
                    <p>Chưa có hoạt động nào</p>
                ) : (
                    filteredHistory.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.dateSection}>
                                <span className={styles.date}>
                                    {new Date(item.timestamp).toLocaleDateString("vi-VN")}
                                </span>
                                <Dot size={16} />
                                <span className={styles.timestamp}>
                                    {formatTime(item.timestamp)}
                                </span>
                            </div>
                            <span className={styles.action}>{item.action}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
