import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBotWidget.module.scss';

const SYSTEM_PROMPT = `Bạn là chuyên gia tư vấn CV và phỏng vấn IT. Nhiệm vụ của bạn:
1. Phân tích CV người dùng gửi lên và đưa ra góp ý cụ thể để cải thiện
2. Hỗ trợ luyện tập phỏng vấn kỹ thuật (algorithms, system design, behavioral)
3. Trả lời câu hỏi về công nghệ thông tin, career path trong ngành IT
Hãy trả lời ngắn gọn, thực tế và hữu ích. Nếu người dùng muốn luyện phỏng vấn, hãy đóng vai interviewer.`;

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Xin chào! Tôi có thể giúp bạn:\n• 📄 Phân tích & cải thiện CV\n• 🎯 Luyện phỏng vấn kỹ thuật IT\n• 💡 Tư vấn career path\n\nHãy gửi CV của bạn hoặc bắt đầu chat!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cvText, setCvText] = useState('');
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Hiển thị thông báo đang xử lý
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: `📎 Đã tải lên: ${file.name}` },
    ]);

    // Đọc file PDF as base64 để gửi lên API
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      setIsLoading(true);
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: SYSTEM_PROMPT,
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'document',
                    source: {
                      type: 'base64',
                      media_type: 'application/pdf',
                      data: base64,
                    },
                  },
                  {
                    type: 'text',
                    text: 'Đây là CV của tôi. Hãy phân tích và cho tôi biết:\n1. Điểm mạnh của CV\n2. Những điểm cần cải thiện\n3. Gợi ý cụ thể để CV tốt hơn cho vị trí IT',
                  },
                ],
              },
            ],
          }),
        });

        const data = await response.json();
        const assistantMsg = data.content?.[0]?.text || 'Không thể phân tích CV lúc này.';
        setCvText('CV đã được tải lên');
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: assistantMsg },
        ]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Có lỗi khi phân tích CV. Vui lòng thử lại.' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');

    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    // Xây dựng conversation history
    const apiMessages = newMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT + (cvText ? `\n\nNgười dùng đã upload CV. Hãy dựa vào đó để trả lời.` : ''),
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const assistantMsg = data.content?.[0]?.text || 'Xin lỗi, tôi không thể trả lời lúc này.';
      setMessages((prev) => [...prev, { role: 'assistant', content: assistantMsg }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Có lỗi xảy ra. Vui lòng thử lại.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    '🎯 Bắt đầu luyện phỏng vấn',
    '💼 Hỏi về career path',
    '🔍 Kỹ năng cần học để xin việc',
  ];

  return (
    <div className={styles.wrapper}>
      {/* CHAT PANEL */}
      {isOpen && (
        <div className={styles.panel}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>AI</div>
              <div>
                <div className={styles.headerTitle}>CV & Interview Advisor</div>
                <div className={styles.headerSub}>Trợ lý IT Career</div>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
              aria-label="Đóng chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.bubble} ${
                  msg.role === 'user' ? styles.bubbleUser : styles.bubbleBot
                }`}
              >
                <div className={styles.bubbleContent}>
                  {msg.content.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.bubble} ${styles.bubbleBot}`}>
                <div className={styles.typing}>
                  <span /><span /><span />
                </div>
              </div>
            )}

            {/* Quick actions khi chưa có nhiều tin */}
            {messages.length === 1 && (
              <div className={styles.quickActions}>
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    className={styles.quickBtn}
                    onClick={() => {
                      setInput(action.replace(/^[^\s]+ /, ''));
                      textareaRef.current?.focus();
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Upload CV bar */}
          {cvText && (
            <div className={styles.cvBadge}>
              📄 {cvText} — sẵn sàng để phân tích
            </div>
          )}

          {/* Input */}
          <div className={styles.inputArea}>
            <button
              className={styles.uploadBtn}
              onClick={() => fileInputRef.current?.click()}
              title="Upload CV (PDF)"
            >
              📎
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhắn tin hoặc hỏi về CV, phỏng vấn..."
              rows={1}
            />
            <button
              className={styles.sendBtn}
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="Gửi tin nhắn"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* FAB BUTTON */}
      <button
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Mở chat với AI Advisor"
      >
        {isOpen ? (
          <span className={styles.fabIconClose}>✕</span>
        ) : (
          <>
            <span className={styles.fabIcon}>💬</span>
            {hasUnread && <span className={styles.fabBadge} />}
          </>
        )}
      </button>
    </div>
  );
}