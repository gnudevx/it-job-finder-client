import { useState, useEffect, useRef } from 'react';
import styles from './ChatWindow.module.scss';
import { Send } from 'lucide-react';
import PropTypes from 'prop-types';
import axiosClient from '@/services/axiosClient.js';
import { useAuth } from '@/contexts/AuthContext';
import VideoCallOverlay from './videoCall/VideoCallOverlay';
import { socket } from '@/services/socket.js';
import { API_BASE } from '@/config/config.js';
export default function ChatWindow({ chatUser, conversationId }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [cursor, setCursor] = useState(null);
  const scrollRef = useRef(null);
  const { user: currentUser } = useAuth();
  const [loadingMore, setLoadingMore] = useState(false);
  const isFirstLoad = useRef(true);
  const [sending, setSending] = useState(false);
  const shouldAutoScrollRef = useRef(true);
  const [incomingCall, setIncomingCall] = useState(false);
  const [callerIdRef, setCallerIdRef] = useState(null); // lưu callerId
  const [showOverlay, setShowOverlay] = useState(false); // mở overlay
  const [incomingCallConvoId, setIncomingCallConvoId] = useState(null);
  const [myRole, setMyRole] = useState(null);
  const [callerUser, setCallerUser] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
  };

  
  useEffect(() => {
    const handleRing = ({ conversationId: cid, callerId, callerName, callerAvatar }) => {
      if (callerId === currentUser?._id) return;
      setCallerIdRef(callerId);
      setIncomingCallConvoId(cid);
      setIncomingCall(true);
      setCallerUser({ name: callerName, avatar: callerAvatar }); // ✅
    };
    socket.on('call:ring', handleRing);
    return () => socket.off('call:ring', handleRing);
  }, [currentUser]);

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
  const handleStartCall = () => {
    if (!conversationId) return;
    socket.emit('join-conversation', conversationId);
    console.log('🚀 START CALL with', chatUser, currentUser);
    socket.emit('call:ring', {
      conversationId,
      callerId: currentUser?._id,
    });
    setMyRole('caller');
    setShowOverlay(true); // 👈 mở overlay thay vì window.open
  };
  const handleAcceptCall = () => {
    socket.emit('call:accepted', { conversationId: incomingCallConvoId }); // ✅ SỬA
    socket.emit('join-conversation', incomingCallConvoId);
    setMyRole('callee');
    setIncomingCall(false);
    setShowOverlay(true);
  };

  const handleDeclineCall = () => {
    socket.emit('call:decline', { conversationId: incomingCallConvoId });
    setIncomingCall(false);
  };

  // ── Nhận call message realtime → thêm vào chat ─────────────
  useEffect(() => {
    const addCallMessage = ({ message, conversationId: cid }) => {
      if (cid !== conversationId) return;
      setMessages((prev) => [...prev, message]);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
      }, 50);
    };
    return () => {
      socket.off('call:ended', addCallMessage);
      socket.off('call:declined', addCallMessage);
      socket.off('call:missed', addCallMessage);
    };
  }, [conversationId]);
  // 🔹 Load messages khi conversationId thay đổi
  useEffect(() => {
    setMessages([]);
    setCursor(null);
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
    if ((!inputText.trim() && !selectedFile) || !conversationId || sending) return;
    setSending(true);
    console.log('🚀 SEND MESSAGE...', chatUser);
    const base = currentUser.role === 'employer' ? '/employer/connect' : '/candidate/connect';

    try {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('conversationId', conversationId);
          formData.append('senderId', currentUser?._id);
          console.log('currentUser file:', currentUser?._id);
          const res = await axiosClient.post('/messages/send-file', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

          socket.emit('send-message', {
            conversationId,
            message: res,
          });

          setMessages((prev) => [...prev, res]);
          setSelectedFile(null);
        }

        if (inputText.trim()) {
          const res = await axiosClient.post(`${base}/messages`, {
            conversationId,
            senderId: currentUser?._id,
            senderRole: currentUser?.role,
            text: inputText,
          });

          socket.emit('send-message', {
            conversationId,
            message: res,
          });

          setMessages((prev) => [...prev, res]);
        }

        setInputText('');
      } catch (err) {
        console.error(err);
      } finally {
      setSending(false); // 🔥 QUAN TRỌNG NHẤT
    }
  };
  return (
    <>
      {incomingCall && (
        <div className={styles.incomingCall}>
          {/* 👇 dùng callerUser thay vì chatUser */}
          <span>📲 Có cuộc gọi đến từ {callerUser?.name || 'Ai đó'}</span>
          <button onClick={handleAcceptCall}>✅ Nghe</button>
          <button onClick={handleDeclineCall}>❌ Từ chối</button>
        </div>
      )}
      {showOverlay && (
        <VideoCallOverlay
          conversationId={incomingCallConvoId || conversationId}
          chatUser={myRole === 'callee' ? callerUser : chatUser}
          callerId={callerIdRef || currentUser?._id}
          currentUser={currentUser}
          onClose={() => {
            setShowOverlay(false);
            setMyRole(null);     // reset khi đóng
          }}
          role={myRole}

        />
      )}
      {!chatUser ? (
        // Early return logic nằm ở đây thay vì return sớm
        <div className={styles.empty}>
          <p>Chọn cuộc trò chuyện để bắt đầu</p>
        </div>
      ) : (
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
              if (m.type === 'call') {
                const icons = {
                  completed: '📞',
                  missed: '📵',
                  declined: '🚫',
                };
                const labels = {
                  completed: `Cuộc gọi video · ${Math.floor(m.callDuration / 60)}:${String(m.callDuration % 60).padStart(2, '0')}`,
                  missed: 'Cuộc gọi nhỡ',
                  declined: 'Cuộc gọi bị từ chối',
                };
                return (
                  <div key={m._id || index} className={styles.callRecord}>
                    <span className={styles.callIcon}>{icons[m.callStatus]}</span>
                    <span className={styles.callLabel}>{labels[m.callStatus]}</span>
                    <span className={styles.callTime}>
                      {new Date(m.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                );
              }
              if (m.type === 'file') {
                const isImage = m.file?.mimeType?.startsWith('image/');

                return (
                    <div
                      key={m._id || index}
                      className={`${styles.msg} ${isMe ? styles.me : ''}`}
                    >
                      {/* 🟢 IMAGE */}
                      {m.type === 'file' && isImage && (
                        <img
                          src={m.file.url}
                          alt={m.file.name}
                          className={styles.imageMsg}
                          onClick={() =>
                            window.open(`${API_BASE}${m.file.url}`, '_blank', 'noopener,noreferrer')
                          }
                        />
                      )}

                      {/* 🟢 FILE (PDF, DOC, etc) */}
                      {m.type === 'file' && !isImage && (
                        <div
                          className={styles.fileCard}
                          onClick={() =>
                            window.open(`${API_BASE}${m.file.url}`, '_blank', 'noopener,noreferrer')
                          }
                        >
                          <span>📄</span>
                          <div>
                            <p>{m.file.name}</p>
                          </div>
                        </div>
                      )}

                      {/* 🟢 TEXT */}
                      {m.type === 'text' && (
                        <div className={`${styles.bubble} ${isMe ? styles.myBubble : ''}`}>
                          {m.text}
                        </div>
                      )}

                      {/* 🕒 TIME */}
                      <span>
                        {m.createdAt
                          ? new Date(m.createdAt).toLocaleTimeString()
                          : ''}
                      </span>
                    </div>
                );
              }
              return (
                <div key={m._id || index} className={`${styles.msg} ${isMe ? styles.me : ''}`}>
                  {/* Truyền thẳng class myBubble vào đây nếu là tin nhắn của mình */}
                  <div className={`${styles.bubble} ${isMe ? styles.myBubble : ''}`}>{m.text}</div>

                  <span>{m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ''}</span>
                </div>
              );
            })}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleSelectFile}
          />

          {/* icon file */}
         
          <div className={styles.inputBox}>
              {selectedFile && (
                <div className={styles.filePreview}>
                  {selectedFile.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(selectedFile)} />
                  ) : (
                    <div className={styles.fileItem}>
                      📄 {selectedFile.name}
                    </div>
                  )}
                  <button onClick={() => setSelectedFile(null)}>✖</button>
                </div>
              )}

              <div className={styles.inputInner}>
                <button
                  className={styles.attachBtn}
                  onClick={() => fileInputRef.current.click()}
                >
                  📎
                </button>

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
        </div>
        
      )}
    </>
  );
}
ChatWindow.propTypes = {
  chatUser: PropTypes.object,
  conversationId: PropTypes.string,
};
