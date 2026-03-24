import React, { useState, useEffect, useRef } from "react";
import styles from "./EmployerSidebar.module.scss";
import { Search, Settings, Bell, Volume2 } from "lucide-react";
import PropTypes from "prop-types";
import logo from "@assets/Logo_HireIT_Header.png";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
export default function ChatSidebar({ employers, selectedId, onSelect }) {
  const navigate = useNavigate();
  // States cho Popup Cài đặt
  const [showSettings, setShowSettings] = useState(false);
  const [notifyEnabled, setNotifyEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchText, setSearchText] = useState("");
  const filteredEmployers = employers
  .filter((c) =>
    c.name.toLowerCase().includes(searchText.toLowerCase())
  );
  // Ref để xử lý click ra ngoài thì đóng popup
  const settingsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logoWrap}>
          <img src={logo} alt="logo" className={styles.logo} />
          <span className={styles.title}>Connect</span>
        </div>

        <div className={styles.headerRight}>
          <button 
            type="button" 
            className={styles.homeBtn}
            onClick={() => navigate("/")}
          >
            Về trang chủ
          </button>
          
          {/* Cụm Settings */}
          <div className={styles.settingsWrap} ref={settingsRef}>
            <button
              type="button"
              className={`${styles.iconBtn} ${showSettings ? styles.activeIcon : ""}`}
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings size={18} />
            </button>

            {/* Popup Dropdown */}
            {showSettings && (
              <div className={styles.settingsDropdown}>
                <div 
                  className={styles.settingItem} 
                  onClick={() => setNotifyEnabled(!notifyEnabled)}
                >
                  <div className={styles.settingLabel}>
                    <Bell size={18} />
                    <span>Nhận thông báo</span>
                  </div>
                  <div className={`${styles.toggle} ${notifyEnabled ? styles.toggleActive : ""}`}>
                    <div className={styles.toggleCircle}></div>
                  </div>
                </div>

                <div 
                  className={styles.settingItem}
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  <div className={styles.settingLabel}>
                    <Volume2 size={18} />
                    <span>Âm thanh thông báo</span>
                  </div>
                  <div className={`${styles.toggle} ${soundEnabled ? styles.toggleActive : ""}`}>
                    <div className={styles.toggleCircle}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchBox}>
        <Search className={styles.searchIcon} size={16} />
        <input
          placeholder="Tên công ty, nhà tuyển dụng..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>


      {/* List */}
      <div className={styles.list}>
        {filteredEmployers.map((c) => (
          <button
            type="button"
            key={c.id}
            onClick={() => onSelect(c.id, c.conversationId, c.jobId)}
            className={`${styles.item} ${
              selectedId === c.id ? styles.active : ""
            }`}
          >
            <div className={styles.avatarWrap}>
              <img src={c.avatar} alt="" />
              {c.status === "online" && <span className={styles.online}></span>}
            </div>

            <div className={styles.info}>
              <div className={styles.top}>
                <h4>{c.name}</h4>
                <span>
                  {c.lastMessageTime
                    ? formatDistanceToNow(new Date(c.lastMessageTime), { addSuffix: true })
                    : ''}
                </span>
              </div>

              <p>{c.lastMessage || "Chưa có tin nhắn"}</p>

              <div className={styles.meta}>
                <span>{c.position}</span>

                {c.unreadCount != 0 && (
                  <span className={styles.badge}>{c.unreadCount}</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

ChatSidebar.propTypes = {
  employers: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};