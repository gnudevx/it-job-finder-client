import React, { useState } from "react";
import { UserRole } from "./types.js";
import { Send, Clock, User, Users } from "lucide-react";
import styles from "./EmployerNotification.module.scss";
import PropTypes from "prop-types";
export default function NotificationManager({ targetAudience }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientType, setRecipientType] = useState("ALL");

  const role = targetAudience === "CANDIDATE"
    ? UserRole.CANDIDATE
    : UserRole.EMPLOYER;

  const audienceLabel = targetAudience === "CANDIDATE"
    ? "Ứng Viên"
    : "Nhà Tuyển Dụng";

  const [history, setHistory] = useState([
    {
      id: "1",
      recipientRole: UserRole.EMPLOYER,
      recipientId: "ALL",
      title: "Bảo trì hệ thống",
      message: "Hệ thống sẽ bảo trì vào 12h đêm nay.",
      sentAt: "2023-10-20 10:00",
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();

    const notif = {
      id: Date.now().toString(),
      recipientRole: role,
      recipientId: recipientType === "ALL" ? "ALL" : "Specific User",
      title,
      message,
      sentAt: new Date().toLocaleString(),
    };

    setHistory([notif, ...history]);
    setMessage("");
    setTitle("");
    alert(`Đã gửi thông báo đến ${audienceLabel}`);
  };

  const filtered = history.filter((h) => h.recipientRole === role);

  return (
    <div className={styles.container}>

      {/* FORM */}
      <div>
        <h1 className={styles.title}>
          Gửi Thông Báo: <span style={{ color: "#2563eb" }}>{audienceLabel}</span>
        </h1>

        <form onSubmit={handleSend} className={styles.form}>
          <label className={styles.label}>Đối tượng nhận</label>

          <div className={styles.toggleGroup}>
            <button
              type="button"
              onClick={() => setRecipientType("ALL")}
              className={`${styles.toggleBtn} ${recipientType === "ALL" ? styles.toggleActive : ""
                }`}
            >
              <Users size={18} /> Tất cả {audienceLabel}
            </button>

            <button
              type="button"
              onClick={() => setRecipientType("SPECIFIC")}
              className={`${styles.toggleBtn} ${recipientType === "SPECIFIC" ? styles.toggleActive : ""
                }`}
            >
              <User size={18} /> Cá nhân cụ thể
            </button>
          </div>

          {recipientType === "SPECIFIC" && (
            <input
              type="text"
              placeholder="Nhập ID người nhận..."
              className={styles.input}
            />
          )}

          <label className={styles.label}>Tiêu đề</label>
          <input
            required
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className={styles.label}>Nội dung</label>
          <textarea
            required
            rows={5}
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className={styles.btnSubmit}>
            <Send size={18} /> Gửi Thông Báo
          </button>
        </form>
      </div>

      {/* HISTORY */}
      <div>
        <h2 className={styles.historyTitle}>
          <Clock size={20} /> Lịch sử gửi
        </h2>

        <div className={styles.historyBox}>
          {filtered.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: "#6b7280" }}>
              Chưa có thông báo
            </div>
          ) : (
            filtered.map((item) => (
              <div key={item.id} className={styles.historyItem}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{item.title}</strong>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>
                    {item.sentAt.split(" ")[0]}
                  </span>
                </div>

                <p style={{ fontSize: 14, color: "#4b5563", marginTop: 4 }}>
                  {item.message}
                </p>

                <div className={styles.badge}>
                  {item.recipientId === "ALL" ? <Users size={12} /> : <User size={12} />}
                  {item.recipientId === "ALL" ? "Tất cả" : item.recipientId}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

NotificationManager.propTypes = {
  targetAudience: PropTypes.oneOf(["CANDIDATE", "EMPLOYER"]).isRequired,
};