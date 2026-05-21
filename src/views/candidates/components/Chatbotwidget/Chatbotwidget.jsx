import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ChatBotWidget.module.scss';

// ── Helpers ───────────────────────────────────────────────────────────────────
const generateSessionId = () => 'session-' + Math.random().toString(36).slice(2, 11);

const getOrCreateSessionId = () => {
  let id = localStorage.getItem('chat_session_id');
  if (!id) {
    id = generateSessionId();
    localStorage.setItem('chat_session_id', id);
  }
  return id;
};

// Persist CV state vào localStorage để survive reload
const saveCvState = (cvId, cvStatus, cvName = null, cvSize = null) => {
  if (cvId)     localStorage.setItem('chat_cv_id', cvId);
  if (cvStatus) localStorage.setItem('chat_cv_status', cvStatus);
  if (cvName)   localStorage.setItem('chat_cv_name', cvName);
  if (cvSize)   localStorage.setItem('chat_cv_size', cvSize);
};

const loadCvState = () => ({
  cvId:     localStorage.getItem('chat_cv_id')     || null,
  cvStatus: localStorage.getItem('chat_cv_status') || null,
  cvName:   localStorage.getItem('chat_cv_name')   || null,
  cvSize:   localStorage.getItem('chat_cv_size')   || null,
});

const clearCvState = () => {
  ['chat_cv_id','chat_cv_status','chat_cv_name','chat_cv_size']
    .forEach(k => localStorage.removeItem(k));
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function ChatBotWidget() {
  const savedCv = loadCvState();

  const [isOpen, setIsOpen]         = useState(false);
  const [messages, setMessages]     = useState([]);
  const [input, setInput]           = useState('');
  const [isLoading, setIsLoading]   = useState(false);
  const [hasUnread, setHasUnread]   = useState(true);
  const [mode, setMode]             = useState('cv_advisor');
  const [tokenInfo, setTokenInfo]   = useState(null);

  // CV state — khôi phục từ localStorage khi reload
  const cvIdRef = useRef(loadCvState().cvId);
  const [cvStatus, setCvStatus] = useState(() => loadCvState().cvStatus);
  const [cvPreview, setCvPreview] = useState(() => {
    const s = loadCvState();
    return s.cvName ? { name: s.cvName, size: s.cvSize, url: null } : null;
  });
  const [isAnalyzing, setIsAnalyzing] = useState(
    savedCv.cvStatus === 'processing' // nếu đang xử lý thì hiện lại trạng thái
  );

  const sessionId    = useRef(getOrCreateSessionId());
  const messagesEndRef = useRef(null);
  const fileInputRef   = useRef(null);
  const textareaRef    = useRef(null);
  const pollRef        = useRef(null);

  // ── Auto scroll ─────────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  useEffect(() => () => clearInterval(pollRef.current), []);

  // ── Load history + resume polling khi mở widget ────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const init = async () => {
      // 1. Load lịch sử chat từ MongoDB
      try {
        const res = await fetch(`/api/chat/history/${sessionId.current}`, {
          credentials: 'include',
        });
        const data = await res.json();

        if (data.messages?.length > 0) {
          setMessages(data.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })));
        } else {
          // Tin nhắn chào mặc định nếu chưa có history
          setMessages([{
            role: 'assistant',
            content: 'Xin chào! Tôi có thể giúp bạn:\n• 📄 Phân tích & cải thiện CV\n• 🎯 Luyện phỏng vấn IT\n• 💡 Tư vấn career path\n\nHãy upload CV hoặc bắt đầu chat!',
          }]);
        }
      } catch {
        setMessages([{
          role: 'assistant',
          content: 'Xin chào! Upload CV hoặc bắt đầu chat nhé!',
        }]);
      }
      
      // 2. Nếu CV đang processing từ lần trước → resume poll
      const { cvId: savedId, cvStatus: savedStatus, cvName, cvSize } = loadCvState();
      // Restore preview nếu chưa có (sau reload cvPreview = null)
      if (savedId && cvName) {
        setCvPreview({ name: cvName, size: cvSize, url: null });
      }
      if (savedId && savedStatus === 'processing') {
        setIsAnalyzing(true);
        startPolling(savedId);
      }
      if (savedId && savedStatus === 'done') {
        setCvStatus('done');
      }
    };

    init();
  }, [isOpen]);

  // ── Polling CV status ────────────────────────────────────────────────────────
  const startPolling = (id) => {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/cv/status/${id}`, { credentials: 'include' });
        const data = await res.json();

        if (data.status === 'done') {
          clearInterval(pollRef.current);
          setCvStatus('done');
          saveCvState(id, 'done');
          setIsAnalyzing(false);
          addMessage('assistant', `✅ CV đã phân tích xong (${data.chunks_count} sections)!\nBây giờ bạn có thể hỏi tôi về CV của mình.`);
        } else if (data.status === 'failed') {
          clearInterval(pollRef.current);
          setCvStatus('failed');
          clearCvState();
          setIsAnalyzing(false);
          addMessage('assistant', '❌ Xử lý CV thất bại. Vui lòng upload lại.');
        }
      } catch {
        clearInterval(pollRef.current);
        setIsAnalyzing(false);
      }
    }, 3000);
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const addMessage = (role, content) =>
    setMessages((prev) => [...prev, { role, content }]);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // ── Upload CV ────────────────────────────────────────────────────────────────
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    // Validate file
    if (file.type !== 'application/pdf') {
      addMessage('assistant', '❌ Chỉ chấp nhận file PDF.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      addMessage('assistant', '❌ File quá lớn. Tối đa 5MB.');
      return;
    }

    // Preview ngay lập tức
    const previewUrl = URL.createObjectURL(file);
    setCvPreview({ name: file.name, size: formatFileSize(file.size), url: previewUrl });

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/cv/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        addMessage('assistant', `❌ Upload thất bại: ${data.detail || data.message}`);
        setCvPreview(null);
        return;
      }

      // Lưu state vào localStorage để survive reload
      cvIdRef.current = data.cv_id;
      setCvStatus('processing');
      saveCvState(data.cv_id, 'processing', file.name, formatFileSize(file.size));
      setIsAnalyzing(true);

      addMessage('assistant',
        `📎 Đã nhận CV **${data.filename}**.\n⏳ Đang phân tích, quá trình này có thể mất 15-30 giây...\nBạn có thể reload trang — trạng thái sẽ được giữ lại.`
      );

      // Bắt đầu poll
      startPolling(data.cv_id);

    } catch {
      addMessage('assistant', '❌ Có lỗi khi upload. Vui lòng thử lại.');
      setCvPreview(null);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Send message ─────────────────────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading || isAnalyzing) return;
    setInput('');
    addMessage('user', text);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message: text,
          session_id: sessionId.current,
          mode,
          // Không gửi cv_id — FastAPI tự tìm theo user_id
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        addMessage('assistant', `❌ Lỗi: ${data.detail || data.message}`);
        return;
      }

      addMessage('assistant', data.reply);
      setTokenInfo({
        used: data.tokens_used,
        remaining: data.tokens_remaining,
        warning: data.warning,
      });
      if (data.warning) addMessage('assistant', data.warning);

    } catch {
      addMessage('assistant', '❌ Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, isAnalyzing, mode]);

  // ── Reset conversation ───────────────────────────────────────────────────────
  const handleReset = async () => {
    if (!window.confirm('Xóa toàn bộ lịch sử chat?')) return;

    try {
      await fetch(`/api/chat/history/${sessionId.current}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch { /* ignore */ }

    // Clear local state
    clearInterval(pollRef.current);
    clearCvState();
    localStorage.removeItem('chat_session_id');
    sessionId.current = getOrCreateSessionId();
    cvIdRef.current = null;
    setCvStatus(null);
    setCvPreview(null);
    setIsAnalyzing(false);
    setTokenInfo(null);
    setMode('cv_advisor');
    setMessages([{
      role: 'assistant',
      content: 'Cuộc trò chuyện đã được reset. Bắt đầu lại nhé!',
    }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { label: '🎯 Luyện phỏng vấn', action: () => { setMode('mock_interview'); setInput('Bắt đầu phỏng vấn'); } },
    { label: '📄 Phân tích CV',    action: () => { setMode('cv_advisor');    setInput('CV tôi có điểm yếu gì?'); } },
    { label: '💡 Career path',     action: () => setInput('Tôi nên học gì để thành Backend Developer?') },
  ];

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <div className={styles.panel}>

          {/* ── Header ── */}
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>AI</div>
              <div>
                <div className={styles.headerTitle}>CV & Interview Advisor</div>
                <div className={styles.headerSub}>
                  {mode === 'mock_interview' ? '🎯 Mock Interview' : '📄 CV Advisor'}
                  {tokenInfo && (
                    <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.75 }}>
                      · {tokenInfo.remaining.toLocaleString()} tokens còn
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className={styles.closeBtn}
                onClick={handleReset}
                title="Reset cuộc trò chuyện"
                style={{ fontSize: 14 }}
              >🗑</button>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
            </div>
          </div>

          {/* ── CV Preview + Status bar ── */}
          {(cvPreview || cvStatus) && (
            <div className={styles.cvBadge} style={{
              background: cvStatus === 'done'   ? '#e6f4ea'
                        : cvStatus === 'failed' ? '#fce8e6'
                        : '#fff8e1',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 20 }}>📄</span>
              <div style={{ lineHeight: 1.3 }}>
                <div style={{ fontWeight: 600, fontSize: 12 }}>
                  {cvPreview?.name || 'CV của bạn'}
                </div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>
                  {cvPreview?.size || ''}
                </div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600 }}>
                {cvStatus === 'processing' ? '⏳ Đang xử lý...'
                : cvStatus === 'done'      ? '✅ Sẵn sàng'
                : cvStatus === 'failed'    ? '❌ Thất bại' : ''}
              </span>
            </div>
          )}

          {/* ── Analyzing banner (persist qua reload) ── */}
          {isAnalyzing && (
            <div style={{
              padding: '8px 12px',
              background: '#e8f0fe',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              borderBottom: '1px solid #c5d3f5',
            }}>
              <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
              AI đang phân tích CV của bạn, vui lòng chờ...
            </div>
          )}

          {/* ── Messages ── */}
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.bubble} ${
                msg.role === 'user' ? styles.bubbleUser : styles.bubbleBot}`}>
                <div className={styles.bubbleContent}>
                  {msg.content.split('\n').map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && !isAnalyzing && (
              <div className={`${styles.bubble} ${styles.bubbleBot}`}>
                <div className={styles.typing}><span /><span /><span /></div>
              </div>
            )}

            {messages.length <= 1 && !isAnalyzing && (
              <div className={styles.quickActions}>
                {quickActions.map((q, i) => (
                  <button key={i} className={styles.quickBtn}
                    onClick={() => { q.action(); textareaRef.current?.focus(); }}>
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input ── */}
          <div className={styles.inputArea}>
            <button className={styles.uploadBtn}
              onClick={() => fileInputRef.current?.click()}
              title="Upload CV (PDF)"
              disabled={isLoading || isAnalyzing}>
              📎
            </button>
            <input type="file" ref={fileInputRef} accept=".pdf"
              onChange={handleFileUpload} style={{ display: 'none' }} />
            <textarea ref={textareaRef} className={styles.textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isAnalyzing ? 'Đợi CV xử lý xong...'
                : mode === 'mock_interview' ? 'Trả lời câu hỏi phỏng vấn...'
                : 'Hỏi về CV, career path...'
              }
              rows={1}
              disabled={isAnalyzing}
            />
            <button className={styles.sendBtn} onClick={sendMessage}
              disabled={!input.trim() || isLoading || isAnalyzing}>➤</button>
          </div>

        </div>
      )}

      {/* ── FAB ── */}
      <button className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
        onClick={() => setIsOpen((v) => !v)}>
        {isOpen
          ? <span className={styles.fabIconClose}>✕</span>
          : <><span className={styles.fabIcon}>💬</span>
            {hasUnread && <span className={styles.fabBadge} />}</>}
      </button>
    </div>
  );
}
