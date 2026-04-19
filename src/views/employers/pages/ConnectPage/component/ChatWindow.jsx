import { useState, useEffect, useRef } from 'react';
import styles from './ChatWindow.module.scss';
import { Send } from 'lucide-react';
import PropTypes from 'prop-types';
import axiosClient from '@/services/axiosClient.js';
import { useAuth } from '@/contexts/AuthContext';
import { socket } from '@/services/socket';
export default function ChatWindow({ chatUser, conversationId, onMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [cursor, setCursor] = useState(null);
  const scrollRef = useRef(null);
  const { user: currentUser } = useAuth();
  const [loadingMore, setLoadingMore] = useState(false);
  const isFirstLoad = useRef(true);
  const [sending, setSending] = useState(false);
  const shouldAutoScrollRef = useRef(true);
  const handleStartCall = () => {
    if (!conversationId) return;

    // cách đơn giản: mở 1 trang call riêng
    window.open(`/video-call/${conversationId}`, '_blank');
  };
  // 🔹 Load messages khi conversationId thay đổi
  useEffect(() => {
    setMessages([]);
    setCursor(null);
  }, [conversationId]);

  useEffect(() => {
    const fetchFirstMessages = async () => {
      if (!conversationId) return;
      isFirstLoad.current = true;
      const base = currentUser.role === 'employer' ? '/employer/connect' : '/candidate/connect';

      const res = await axiosClient.get(`${base}/messages`, {
        params: {
          conversationId,
          limit: 20,
        },
      });
      const normalized = res.reverse();
      setMessages(normalized);

      if (normalized.length > 0) {
        setCursor(normalized[0]._id);
      }
    };

    setCursor(null); // reset trước
    fetchFirstMessages();
  }, [conversationId]);
  const handleScroll = async () => {
    if (scrollRef.current.scrollTop === 0 && cursor && !loadingMore) {
      const el = scrollRef.current;

      const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;

      shouldAutoScrollRef.current = isNearBottom;

      setLoadingMore(true); // 👈 THIẾU CÁI NÀY
      await new Promise((resolve) => setTimeout(resolve, 500));
      const base = currentUser.role === 'employer' ? '/employer/connect' : '/candidate/connect';

      const res = await axiosClient.get(`${base}/messages`, {
        params: {
          conversationId,
          limit: 20,
          cursor,
        },
      });

      if (res.length === 0) {
        setLoadingMore(false);
        return;
      }

      const prevHeight = scrollRef.current.scrollHeight;
      const normalized = res.reverse();

      setMessages((prev) => [...normalized, ...prev]);

      setCursor(normalized[0]._id); // 🔥 sửa lại luôn

      setTimeout(() => {
        const newHeight = scrollRef.current.scrollHeight;
        scrollRef.current.scrollTop = newHeight - prevHeight;
        setLoadingMore(false);
      }, 0);
    }
  };
  useEffect(() => {
    const handleReceive = (message) => {
      if (message.conversationId !== conversationId) return;

      const el = scrollRef.current;
      const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;

      setMessages((prev) => {
        const exists = prev.some((m) => m._id === message._id);
        if (exists) return prev;
        return [...prev, message];
      });

      // 👇 chỉ scroll nếu gần bottom
      if (isNearBottom) {
        setTimeout(() => {
          el.scrollTop = el.scrollHeight;
        }, 0);
      }
    };
    socket.on('receive-message', handleReceive);

    return () => {
      socket.off('receive-message', handleReceive);
    };
  }, [conversationId]);
  useEffect(() => {
    if (!conversationId) return;

    socket.emit('join-conversation', conversationId);

    console.log('JOIN CONVERSATION:', conversationId);
  }, [conversationId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (shouldAutoScrollRef.current) {
      el.scrollTop = el.scrollHeight;
    }
    if (isFirstLoad.current && messages.length > 0) {
      setTimeout(() => {
        const el = scrollRef.current;
        if (el) {
          el.scrollTop = el.scrollHeight;
          isFirstLoad.current = false;
        }
      }, 0);
    }
  }, [messages]);

  // 🔹 Gửi tin nhắn
  const handleSend = async () => {
    if (!inputText.trim() || !conversationId || sending) return;
    setSending(true);
    console.log('🚀 SEND MESSAGE...', chatUser);
    const base = currentUser.role === 'employer' ? '/employer/connect' : '/candidate/connect';

    try {
      const res = await axiosClient.post(`${base}/messages`, {
        conversationId,
        senderId: currentUser?.userId,
        senderRole: currentUser?.role,
        text: inputText,
      });
      console.log('🚀 MESSAGE SENT:', res);
      // 🔥 emit realtime
      socket.emit('send-message', {
        conversationId,
        message: res,
      });

      // optimistic UI
      setMessages((prev) => [...prev, res]);
      setTimeout(() => {
        const el = scrollRef.current;
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      }, 0);
      onMessageSent &&
        onMessageSent({
          conversationId,
          candidateId: chatUser.id,
          text: inputText,
          createdAt: new Date().toISOString(),
        });

      setInputText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false); // 🔥 QUAN TRỌNG NHẤT
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
        <button className={styles.callBtn} onClick={handleStartCall} aria-label="Video Call">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} className={styles.messages} onScroll={handleScroll}>
        {loadingMore && <div className={styles.loading}>Loading...</div>}
        {messages.map((m, index) => {
          // 🔥 Đặt biến này để check cho chắc (thay user.userId bằng user._id hoặc user.id tùy backend của bác)
          const isMe =
            m.senderId === currentUser.userId ||
            m.senderId === currentUser._id ||
            m.senderId === currentUser.id;

          return (
            <div key={m._id || index} className={`${styles.msg} ${isMe ? styles.me : ''}`}>
              {/* Truyền thẳng class myBubble vào đây nếu là tin nhắn của mình */}
              <div className={`${styles.bubble} ${isMe ? styles.myBubble : ''}`}>{m.text}</div>

              <span>{m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ''}</span>
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
        <button onClick={handleSend} disabled={sending}>
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
