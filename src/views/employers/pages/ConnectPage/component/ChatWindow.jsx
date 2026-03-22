import { useState, useEffect, useRef } from "react";
import styles from "./ChatWindow.module.scss";
import { Send } from "lucide-react";
import PropTypes from "prop-types";
import axiosClient from "@/services/axiosClient.js";
import { useAuth } from "@/contexts/AuthContext";
export default function ChatWindow({ chatUser, conversationId, onMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef(null);
  const { user: currentUser } = useAuth();
  // 🔹 Load messages khi conversationId thay đổi
  useEffect(() => {
    const fetchMessages = async () => {
      console.log("chatUser", chatUser)
      if (!conversationId) return;
      try {
        const base = currentUser.role === "employer"
          ? "/employer/connect"
          : "/candidate/connect";

        const res = await axiosClient.get(`${base}/messages/${conversationId}`);
        console.log("du lieu",res, "haha" , conversationId)

        setMessages(res); // backend trả về danh sách message
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 🔹 Gửi tin nhắn
  const handleSend = async () => {
    if (!inputText.trim() || !conversationId) return;
    const base =
      currentUser.role === "employer"
        ? "/employer/connect"
        : "/candidate/connect";
    try {
      const res = await axiosClient.post(`${base}/messages`, {
        conversationId,
        senderId: currentUser?.userId,
        senderRole: currentUser?.role,
        text: inputText,
      });
      console.log("ádsadasđs",res)

      setMessages(prev => [...prev, res]);
      
      // 🔹 Gọi callback để cập nhật sidebar
      onMessageSent && onMessageSent({
        candidateId: chatUser.id,
        text: inputText
      });

      setInputText("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!chatUser) {
    return (
      <div className={styles.empty}>
        <p>Chọn cuộc trò chuyện để bắt đầu</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={chatUser?.avatar} alt="" />
        <div>
          <h3>{chatUser?.name}</h3>
          <span>{chatUser?.position}</span>
        </div>
      </div>

      <div ref={scrollRef} className={styles.messages}>
        {messages.map((m, index) => {
          // 🔥 Đặt biến này để check cho chắc (thay user.userId bằng user._id hoặc user.id tùy backend của bác)
          const isMe = m.senderId === currentUser.userId || m.senderId === currentUser._id || m.senderId === currentUser.id;

          return (
            <div
              key={m._id || index}
              className={`${styles.msg} ${isMe ? styles.me : ''}`}
            >
              {/* Truyền thẳng class myBubble vào đây nếu là tin nhắn của mình */}
              <div className={`${styles.bubble} ${isMe ? styles.myBubble : ''}`}>
                {m.text}
              </div>
              
              <span>
                {m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ""}
              </span>
            </div>
          );
        })}
      </div>

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
  chatUser: PropTypes.object,
  conversationId: PropTypes.string,
  onMessageSent: PropTypes.func,
};