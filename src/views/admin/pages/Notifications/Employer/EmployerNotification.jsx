import React, { useState } from "react";
import styles from "./EmployerNotification.module.scss";

import NotificationForm from "./NotificationForm";
import NotificationHistory from "./NotificationHistory";
import NotificationPreview from "./NotificationPreview";
import PropTypes from "prop-types";
import { UserRole, NotificationType } from "./types.js";

const EmployerNotification = ({ targetAudience }) => {
  /** ---------------------------------------
   * BASIC STATE
   ----------------------------------------*/
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientType, setRecipientType] = useState("ALL");
  const [specificId, setSpecificId] = useState("");
  const [notifType, setNotifType] = useState(NotificationType.SYSTEM);

  /** ---------------------------------------
   * AUDIENCE CONFIG
   ----------------------------------------*/
  const role =
    targetAudience === "CANDIDATE"
      ? UserRole.CANDIDATE
      : UserRole.EMPLOYER;

  const audienceLabel =
    targetAudience === "CANDIDATE" ? "Ứng Viên" : "Nhà Tuyển Dụng";

  /** ---------------------------------------
   * NOTIFICATION HISTORY
   ----------------------------------------*/
  const [history, setHistory] = useState([]);

  const handleSend = () => {
    if (!title.trim() || !message.trim()) {
      alert("Vui lòng nhập tiêu đề và nội dung thông báo!");
      return;
    }

    const newNotif = {
      id: Date.now().toString(),
      recipientRole: role,
      recipientId: recipientType === "ALL" ? "ALL" : specificId || "UNKNOWN",
      type: notifType,
      title,
      message,
      sentAt: new Date().toLocaleString(),
    };

    setHistory([newNotif, ...history]);

    // Reset form
    setTitle("");
    setMessage("");
    setSpecificId("");

    alert(`Đã gửi thông báo đến ${audienceLabel}!`);
  };

  return (
    <div className={styles.wrapper}>
      {/* LEFT SIDE — FORM */}
      <div className={styles.left}>
        <h1 className={styles.header}>
          Quản Lý Thông Báo
          <span className={styles.audience}>{audienceLabel}</span>
        </h1>

        <NotificationForm
          title={title}
          setTitle={setTitle}
          message={message}
          setMessage={setMessage}
          recipientType={recipientType}
          setRecipientType={setRecipientType}
          specificId={specificId}
          setSpecificId={setSpecificId}
          notifType={notifType}
          setNotifType={setNotifType}
          onSend={handleSend}
        />
      </div>
      <NotificationPreview
        title={title}
        message={message}
        notifType={notifType}
      />
      {/* RIGHT SIDE — HISTORY */}
      <div className={styles.right}>
        <NotificationHistory
          role={role}
          history={history}
        />
      </div>
    </div>
  );
};

EmployerNotification.propTypes = {
  targetAudience: PropTypes.oneOf(["CANDIDATE", "EMPLOYER"]).isRequired,
};

export default EmployerNotification;
