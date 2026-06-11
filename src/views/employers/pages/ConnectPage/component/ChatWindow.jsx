import { useState, useEffect, useRef } from 'react';
import styles from './ChatWindow.module.scss';
import { Send, Image, Calendar, FileText, CheckCheck } from 'lucide-react';
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
  const imageInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState({ isOnline: false, lastActive: null });
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [activeAssignmentForSubmit, setActiveAssignmentForSubmit] = useState(null);

  const quickReplies = [
    'Bạn có thể tham gia phỏng vấn lúc nào?',
    'Vui lòng bổ sung CV mới nhất.',
    'Chúng tôi sẽ phản hồi trong 3 ngày làm việc.',
  ];

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
  };

  useEffect(() => {
    if (!chatUser?.userId) {
      setOnlineStatus({ isOnline: false, lastActive: null });
      return;
    }

    const fetchStatus = async () => {
      try {
        const res = await axiosClient.get(`/messages/user-status/${chatUser.userId}`);
        setOnlineStatus({
          isOnline: res.isOnline,
          lastActive: res.lastActive,
        });
      } catch (err) {
        console.error('Error fetching user status:', err);
      }
    };

    fetchStatus();

    const handleUserStatusChange = ({ userId, status, lastActive }) => {
      if (userId === String(chatUser.userId)) {
        setOnlineStatus({
          isOnline: status === 'online',
          lastActive: lastActive || null,
        });
      }
    };

    socket.on('user:status', handleUserStatusChange);
    return () => {
      socket.off('user:status', handleUserStatusChange);
    };
  }, [chatUser?.userId]);

  const formatLastSeen = (status) => {
    if (status.isOnline) return 'Online';
    if (!status.lastActive) return 'Offline';

    const diffMs = new Date() - new Date(status.lastActive);
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Vừa mới hoạt động';
    if (diffMin < 60) return `Hoạt động ${diffMin} phút trước`;
    if (diffHour < 24) return `Hoạt động ${diffHour} giờ trước`;
    if (diffDay === 1) return 'Hoạt động hôm qua';
    return `Hoạt động ${diffDay} ngày trước`;
  };

  const renderReadStatus = (index, isMe) => {
    if (!isMe) return null;
    const otherRole = currentUser.role === 'employer' ? 'candidate' : 'employer';

    // Find the index of the last message sent by current user
    const lastMeIndex = messages
      .map((msg, idx) => ({ msg, idx }))
      .filter((item) => {
        const isMsgMe =
          item.msg.senderId === currentUser.userId ||
          item.msg.senderId === currentUser._id ||
          item.msg.senderId === currentUser.id;
        return isMsgMe;
      })
      .pop()?.idx;

    if (index !== lastMeIndex) return null;

    const unread = chatUser?.unreadCount?.[otherRole] ?? 0;
    if (unread === 0) {
      return (
        <div className={styles.statusLine}>
          <span className={styles.seenStatus}>✓✓ Đã xem</span>
        </div>
      );
    } else {
      return (
        <div className={styles.statusLine}>
          <span className={styles.sentStatus}>✓ Đã gửi</span>
        </div>
      );
    }
  };

  const handleSendQuickReply = async (text) => {
    if (!conversationId || sending) return;
    setSending(true);
    const base = currentUser.role === 'employer' ? '/employer/connect' : '/candidate/connect';
    try {
      const res = await axiosClient.post(`${base}/messages`, {
        conversationId,
        senderId: currentUser?._id,
        senderRole: currentUser?.role,
        text,
        type: 'text',
      });
      socket.emit('send-message', {
        conversationId,
        message: res,
      });
      setMessages((prev) => [...prev, res]);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleScheduleInterviewSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const dateVal = fd.get('date');
    const timeVal = fd.get('time');
    const linkVal = fd.get('link');
    if (!dateVal || !timeVal || !linkVal) return;

    setSending(true);
    const base = '/employer/connect';
    try {
      const dateObj = new Date(dateVal);
      const formattedDate = dateObj.toLocaleDateString('vi-VN');
      const text = `📅 Lịch phỏng vấn: ${formattedDate} lúc ${timeVal}`;
      const res = await axiosClient.post(`${base}/messages`, {
        conversationId,
        senderId: currentUser?._id,
        senderRole: currentUser?.role,
        text,
        type: 'interview',
        interviewDate: dateVal,
        interviewTime: timeVal,
        interviewLink: linkVal,
      });

      socket.emit('send-message', {
        conversationId,
        message: res,
      });
      setMessages((prev) => [...prev, res]);
      setShowInterviewModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleSendAssignmentSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const titleVal = fd.get('title');
    const descVal = fd.get('desc');
    const deadlineVal = fd.get('deadline');
    if (!titleVal || !descVal || !deadlineVal) return;

    setSending(true);
    const base = '/employer/connect';
    try {
      const text = `📝 Test Assignment: ${titleVal}`;
      const res = await axiosClient.post(`${base}/messages`, {
        conversationId,
        senderId: currentUser?._id,
        senderRole: currentUser?.role,
        text,
        type: 'assignment',
        assignmentTitle: titleVal,
        assignmentDescription: descVal,
        assignmentDeadline: deadlineVal,
      });

      socket.emit('send-message', {
        conversationId,
        message: res,
      });
      setMessages((prev) => [...prev, res]);
      setShowAssignmentModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleSubmissionSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const linkVal = fd.get('link');
    const noteVal = fd.get('note');
    if (!linkVal) return;

    setSending(true);
    const base = '/candidate/connect';
    try {
      const text = `✅ Đã nộp bài Assignment: ${activeAssignmentForSubmit.assignmentTitle}`;
      const res = await axiosClient.post(`${base}/messages`, {
        conversationId,
        senderId: currentUser?._id,
        senderRole: currentUser?.role,
        text,
        type: 'assignment_submit',
        submissionLink: linkVal,
        submissionNote: noteVal,
        assignmentRefId: activeAssignmentForSubmit._id,
      });

      socket.emit('send-message', {
        conversationId,
        message: res,
      });
      setMessages((prev) => [...prev, res]);
      setActiveAssignmentForSubmit(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
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

      setLoadingMore(true); // THIẾU CÁI NÀY
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

      setCursor(normalized[0]._id); // sửa lại luôn

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

      // chỉ scroll nếu gần bottom
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
    setShowOverlay(true); // mở overlay thay vì window.open
  };
  const handleAcceptCall = () => {
    socket.emit('call:accepted', { conversationId: incomingCallConvoId });
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
  // Load messages khi conversationId thay đổi
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

  // Gửi tin nhắn
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
      setSending(false); // QUAN TRỌNG NHẤT
    }
  };
  return (
    <>
      {incomingCall && (
        <div className={styles.incomingCall}>
          {/* dùng callerUser thay vì chatUser */}
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
            setMyRole(null); // reset khi đóng
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
              <div className={styles.onlineStatus}>
                <span
                  className={`${styles.statusDot} ${onlineStatus.isOnline ? styles.online : ''}`}
                ></span>
                <span>{formatLastSeen(onlineStatus)}</span>
              </div>
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
              // Đặt biến này để check cho chắc (thay user.userId bằng user._id hoặc user.id tùy backend của bác)
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
                  <div key={m._id || index} className={`${styles.msg} ${isMe ? styles.me : ''}`}>
                    {/* 🟢 IMAGE */}
                    {isImage ? (
                      <img
                        src={`${API_BASE}${m.file.url}`}
                        alt={m.file.name}
                        className={styles.imageMsg}
                        onClick={() =>
                          window.open(`${API_BASE}${m.file.url}`, '_blank', 'noopener,noreferrer')
                        }
                      />
                    ) : (
                      /* 🟢 FILE (PDF, DOC, etc) */
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

                    {/* 🕒 TIME */}
                    <span>{m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ''}</span>
                    {renderReadStatus(index, isMe)}
                  </div>
                );
              }

              if (m.type === 'interview') {
                const dateObj = new Date(m.interviewDate);
                const formattedDate = dateObj.toLocaleDateString('vi-VN');
                return (
                  <div key={m._id || index} className={`${styles.msg} ${isMe ? styles.me : ''}`}>
                    <div className={styles.interviewCard}>
                      <div className={styles.interviewHeader}>
                        <Calendar className={styles.interviewIcon} size={24} />
                        <h4>Lịch Hẹn Phỏng Vấn</h4>
                      </div>
                      <div className={styles.interviewBody}>
                        <p>
                          📅 Ngày: <strong>{formattedDate}</strong>
                        </p>
                        <p>
                          ⏰ Giờ: <strong>{m.interviewTime}</strong>
                        </p>
                      </div>
                      <a
                        href={m.interviewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.meetBtn}
                      >
                        Tham gia Meeting
                      </a>
                    </div>
                    <span>{m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ''}</span>
                    {renderReadStatus(index, isMe)}
                  </div>
                );
              }

              if (m.type === 'assignment') {
                const deadlineObj = new Date(m.assignmentDeadline);
                const formattedDeadline = deadlineObj.toLocaleString('vi-VN');
                const isSubmitted = messages.some(
                  (msg) => msg.type === 'assignment_submit' && msg.assignmentRefId === m._id
                );
                return (
                  <div key={m._id || index} className={`${styles.msg} ${isMe ? styles.me : ''}`}>
                    <div className={styles.assignmentCard}>
                      <div className={styles.assignmentHeader}>
                        <FileText className={styles.assignmentIcon} size={24} />
                        <h4>Yêu Cầu Test Assignment</h4>
                      </div>
                      <div className={styles.assignmentBody}>
                        <h5>💡 Đề bài: {m.assignmentTitle}</h5>
                        <p className={styles.assignmentDesc}>{m.assignmentDescription}</p>
                        <p className={styles.assignmentDeadline}>
                          ⏰ Hạn chót: <strong>{formattedDeadline}</strong>
                        </p>
                      </div>
                      {currentUser.role === 'candidate' ? (
                        isSubmitted ? (
                          <button className={styles.submittedBtn} disabled>
                            Đã nộp bài làm
                          </button>
                        ) : (
                          <button
                            className={styles.submitBtn}
                            onClick={() => setActiveAssignmentForSubmit(m)}
                          >
                            Nộp bài làm
                          </button>
                        )
                      ) : (
                        <div className={styles.employerStatus}>
                          {isSubmitted ? (
                            <span className={styles.statusSuccess}>● Ứng viên đã nộp bài</span>
                          ) : (
                            <span className={styles.statusPending}>● Chờ ứng viên nộp bài</span>
                          )}
                        </div>
                      )}
                    </div>
                    <span>{m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ''}</span>
                    {renderReadStatus(index, isMe)}
                  </div>
                );
              }

              if (m.type === 'assignment_submit') {
                return (
                  <div key={m._id || index} className={`${styles.msg} ${isMe ? styles.me : ''}`}>
                    <div className={styles.submissionCard}>
                      <div className={styles.submissionHeader}>
                        <CheckCheck className={styles.submissionIcon} size={24} />
                        <h4>Bài Làm Đã Nộp</h4>
                      </div>
                      <div className={styles.submissionBody}>
                        <p>🔗 Link bài làm:</p>
                        <a
                          href={m.submissionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.submissionLink}
                        >
                          {m.submissionLink}
                        </a>
                        {m.submissionNote && (
                          <div className={styles.submissionNote}>
                            <p>
                              Ghi chú: <i>{m.submissionNote}</i>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <span>{m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ''}</span>
                    {renderReadStatus(index, isMe)}
                  </div>
                );
              }

              return (
                <div key={m._id || index} className={`${styles.msg} ${isMe ? styles.me : ''}`}>
                  {/* Truyền thẳng class myBubble vào đây nếu là tin nhắn của mình */}
                  <div className={`${styles.bubble} ${isMe ? styles.myBubble : ''}`}>{m.text}</div>

                  <span>{m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ''}</span>
                  {renderReadStatus(index, isMe)}
                </div>
              );
            })}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleSelectFile}
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          <input
            type="file"
            ref={imageInputRef}
            style={{ display: 'none' }}
            onChange={handleSelectFile}
            accept="image/*"
          />

          {/* Quick replies & Actions Bar */}
          {currentUser.role === 'employer' && (
            <>
              <div className={styles.actionBar}>
                <button className={styles.actionBtn} onClick={() => setShowInterviewModal(true)}>
                  📅 Lên lịch phỏng vấn
                </button>
                <button className={styles.actionBtn} onClick={() => setShowAssignmentModal(true)}>
                  📝 Gửi Test Assignment
                </button>
              </div>
              <div className={styles.quickReplies}>
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    className={styles.quickReplyChip}
                    onClick={() => handleSendQuickReply(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className={styles.inputBox}>
            {selectedFile && (
              <div className={styles.filePreview}>
                {selectedFile.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(selectedFile)} />
                ) : (
                  <div className={styles.fileItem}>📄 {selectedFile.name}</div>
                )}
                <button onClick={() => setSelectedFile(null)}>✖</button>
              </div>
            )}

            <div className={styles.inputInner}>
              <button
                className={styles.attachBtn}
                onClick={() => imageInputRef.current.click()}
                title="Gửi ảnh"
              >
                <Image size={18} />
              </button>
              <button
                className={styles.attachBtn}
                onClick={() => fileInputRef.current.click()}
                title="Gửi tài liệu"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>

              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập tin nhắn..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />

              <button onClick={handleSend} disabled={sending}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showInterviewModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>📅 Lên lịch phỏng vấn</h3>
            <form onSubmit={handleScheduleInterviewSubmit}>
              <div className={styles.formGroup}>
                <label>Ngày phỏng vấn</label>
                <input type="date" name="date" required />
              </div>
              <div className={styles.formGroup}>
                <label>Thời gian</label>
                <input type="time" name="time" required />
              </div>
              <div className={styles.formGroup}>
                <label>Google Meet Link</label>
                <input type="url" name="link" placeholder="https://meet.google.com/..." required />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelModalBtn}
                  onClick={() => setShowInterviewModal(false)}
                >
                  Hủy
                </button>
                <button type="submit" className={styles.submitModalBtn} disabled={sending}>
                  Gửi lời mời
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Assignment Modal */}
      {showAssignmentModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>📝 Gửi Test Assignment</h3>
            <form onSubmit={handleSendAssignmentSubmit}>
              <div className={styles.formGroup}>
                <label>Tiêu đề bài test</label>
                <input type="text" name="title" placeholder="VD: ReactJS Entry Test" required />
              </div>
              <div className={styles.formGroup}>
                <label>Yêu cầu / Đề bài</label>
                <textarea name="desc" placeholder="Nhập đề bài hoặc yêu cầu chi tiết..." required />
              </div>
              <div className={styles.formGroup}>
                <label>Hạn chót nộp bài</label>
                <input type="datetime-local" name="deadline" required />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelModalBtn}
                  onClick={() => setShowAssignmentModal(false)}
                >
                  Hủy
                </button>
                <button type="submit" className={styles.submitModalBtn} disabled={sending}>
                  Gửi bài test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Candidate Submit Assignment Modal */}
      {activeAssignmentForSubmit && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>✅ Nộp bài Assignment</h3>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
              Nộp cho bài test: <strong>{activeAssignmentForSubmit.assignmentTitle}</strong>
            </p>
            <form onSubmit={handleSubmissionSubmit}>
              <div className={styles.formGroup}>
                <label>Link bài làm (Github, Drive, v.v...)</label>
                <input type="url" name="link" placeholder="https://github.com/..." required />
              </div>
              <div className={styles.formGroup}>
                <label>Ghi chú (Không bắt buộc)</label>
                <textarea name="note" placeholder="Lời nhắn hoặc ghi chú kèm theo..." />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelModalBtn}
                  onClick={() => setActiveAssignmentForSubmit(null)}
                >
                  Hủy
                </button>
                <button type="submit" className={styles.submitModalBtn} disabled={sending}>
                  Nộp bài
                </button>
              </div>
            </form>
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
