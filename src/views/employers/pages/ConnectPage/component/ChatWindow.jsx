import { useState, useEffect, useRef } from "react";
import styles from "./ChatWindow.module.scss";
import { Send } from "lucide-react";
import PropTypes from "prop-types";
import { MOCK_MESSAGES } from "../types";

export default function ChatWindow({ candidate }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (candidate) {
      setMessages(MOCK_MESSAGES[candidate.id] || []);
    }
  }, [candidate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: inputText,
      isMe: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMsg]);
    setInputText("");
  };

  if (!candidate) {
    return (
      <div className={styles.empty}>
        <p>Chọn cuộc trò chuyện để bắt đầu</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <img src={candidate.avatar} alt="" />
        <div>
          <h3>{candidate.name}</h3>
          <span>Đang hoạt động</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className={styles.messages}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`${styles.msg} ${m.isMe ? styles.me : ""}`}
          >
            <div className={styles.bubble}>{m.text}</div>
            <span>{m.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={styles.input}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={handleSend}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

ChatWindow.propTypes = {
  candidate: PropTypes.object,
};