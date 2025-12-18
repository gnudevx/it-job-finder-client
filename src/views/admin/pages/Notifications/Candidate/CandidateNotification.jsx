import React, { useEffect, useState } from "react";
import styles from "./CandidateNotification.module.scss";

import NotificationForm from "./NotificationForm";
import NotificationHistory from "./NotificationHistory";
import NotificationPreview from "./NotificationPreview";

import PropTypes from "prop-types";
import { UserRole, NotificationType } from "./types.js";

import notificationApiService from "@/api/notificationApiService.js";

const CandidateNotification = ({ targetAudience }) => {

  /** ---------------------------------------
   * BASIC STATE
   ----------------------------------------*/
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientType, setRecipientType] = useState("ALL");
  const [specificId, setSpecificId] = useState("");
  const [notifType, setNotifType] = useState(NotificationType.SYSTEM);

  /** ---------------------------------------
   * ROLE CONFIG
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

  /** ---------------------------------------
   * REALTIME RECEIVE
   ----------------------------------------*/
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await notificationApiService.adminList(role, 1, 50);
        console.log("History load:", res);
        setHistory(res.items);
      } catch (err) {
        console.error("Load history error:", err);
      }
    };

    fetchHistory();
  }, [role]);

  /** ---------------------------------------
   * SEND NOTIFICATION
   ----------------------------------------*/
  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      alert("Vui lòng nhập tiêu đề và nội dung!");
      return;
    }

    const payload = {
      title,
      message,
      type: notifType,
      recipientRole: role,
      recipientId: recipientType === "ALL" ? "ALL" : specificId || "UNKNOWN",
    };

    try {
      const res = await notificationApiService.create(payload);
      console.log("Sent:", res.data);

      // reset
      setTitle("");
      setMessage("");
      setSpecificId("");

    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <div className={styles.wrapper}>

      {/* LEFT */}
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
          handleSend={handleSend}
        />
      </div>

      {/* PREVIEW */}
      <NotificationPreview
        title={title}
        message={message}
        notifType={notifType}
      />

      {/* RIGHT — HISTORY */}
      <div className={styles.right}>
        <NotificationHistory role={role} history={history} />
      </div>
    </div>
  );
};

CandidateNotification.propTypes = {
  targetAudience: PropTypes.oneOf(["CANDIDATE", "EMPLOYER"]).isRequired,
};

export default CandidateNotification;
