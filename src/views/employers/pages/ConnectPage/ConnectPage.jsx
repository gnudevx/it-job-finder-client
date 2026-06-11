import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './ConnectPage.module.scss';
import { useParams, useNavigate } from 'react-router-dom';

import CandidateSidebar from './component/ChatSidebar/CandidateSidebar.jsx';
import EmployerSidebar from './component/ChatSidebar/EmployerSidebar.jsx';
import ChatWindow from './component/ChatWindow.jsx';
import CandidateList from './component/RightPanel/CandidateList.jsx';
import EmployerList from './component/RightPanel/EmployerList.jsx';
import employerService from '@api/employerSerivce.js';
import candidateService from '@api/candidateService.js';
import axiosClient from '@/services/axiosClient.js';
import { socket } from '@/services/socket.js'; //

export default function ConnectPage() {
  const { user } = useAuth();
  const role = user?.role; //
  const navigate = useNavigate();
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentConversationRef = useRef(null);

  useEffect(() => {
    if (!conversationId) return;

    socket.emit('join-conversation', conversationId);
  }, [conversationId]);
  // Effect 1: Chỉ xử lý connect/disconnect theo user — KHÔNG có conversationId
  useEffect(() => {
    if (!user?._id) return;
    console.log(user);
    const handleConnect = () => {
      socket.emit('user:join', user._id);
      console.log('Joined personal room:', user._id);
    };

    // Đăng ký listener TRƯỚC khi connect
    socket.on('connect', handleConnect);
    socket.connect();

    // Nếu đã connected sẵn → emit luôn, không chờ event
    if (socket.connected) {
      socket.emit('user:join', user._id);
      console.log('Already connected, joined personal room:', user._id);
    }

    return () => {
      socket.off('connect', handleConnect); // cleanup listener
    };
  }, [user]);
  useEffect(() => {
    const handleReceive = (message) => {
      setConversations((prev) =>
        prev
          .map((c) => {
            if (c.conversationId === message.conversationId) {
              return {
                ...c,
                lastMessage: message.text,
                lastMessageTime: message.createdAt,
                unreadCount: message.unreadCount,
              };
            }
            return c;
          })
          .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
      );
    };

    socket.on('receive-message', handleReceive);

    const handleMessageRead = ({ conversationId: cid, role: readerRole }) => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.conversationId === cid) {
            return {
              ...c,
              unreadCount: {
                ...c.unreadCount,
                [readerRole]: 0,
              },
            };
          }
          return c;
        })
      );
    };

    socket.on('message:read', handleMessageRead);

    return () => {
      socket.off('receive-message', handleReceive);
      socket.off('message:read', handleMessageRead);
    };
  }, []);

  useEffect(() => {
    if (!conversationId || !conversations.length) return;
    const currentConvo = conversations.find((c) => c.conversationId === conversationId);
    if (currentConvo) {
      setSelectedUser((prev) => {
        if (!prev) return prev;
        if (JSON.stringify(prev.unreadCount) !== JSON.stringify(currentConvo.unreadCount)) {
          return {
            ...prev,
            unreadCount: currentConvo.unreadCount,
          };
        }
        return prev;
      });
    }
  }, [conversations, conversationId]);

  useEffect(() => {
    currentConversationRef.current = conversationId;
  }, [conversationId]);
  useEffect(() => {
    if (role === 'candidate') {
      const fetchEmployers = async () => {
        try {
          const res = await candidateService.getApplications();
          setEmployers(res.data); // data bạn đã format ở backend
        } catch (err) {
          console.error(err);
        }
      };

      fetchEmployers();
    }
  }, [role]);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res =
          role === 'employer'
            ? await employerService.getConversationsByEmployer()
            : await candidateService.getConversationsByCandidate();
        console.log('🔥 conversations từ API:', res);

        setConversations((prev) => {
          // If we have an active conversation that is not in the fetched list, preserve it
          const activeId = id;
          if (activeId) {
            const activeConvo = prev.find((c) => c.conversationId === activeId);
            if (activeConvo && !res.some((c) => c.conversationId === activeId)) {
              return [activeConvo, ...res];
            }
          }
          return res;
        });

        // JOIN ALL ROOM
        res.forEach((c) => {
          socket.emit('join-conversation', c.conversationId);
        });
        if (id) {
          socket.emit('join-conversation', id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (role) fetchConversations();
  }, [role, id]);
  const handleSelectEmployer = async (employerId, conversationId, jobId) => {
    try {
      let convoId = conversationId;
      if (!convoId) {
        const res = await candidateService.createConversation(employerId, jobId);
        convoId = res._id;
      }
      navigate(`/candidate/connect/${convoId}`);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchCandidates = async () => {
    try {
      const res = await employerService.getApplications();
      console.log('data: ', res);
      const mapped = res.data.map((item) => ({
        id: item.candidate.candidateId, // QUAN TRỌNG
        userId: item.candidate.userId, // THÊM NÀY
        name: item.candidate.fullName,
        avatar: item.candidate.avatar,
        position: item.position,
        appliedDate: item.appliedAt,
        jobId: item.jobId,
      }));

      setCandidates(mapped);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSelectCandidate = async (candidateId, convoId) => {
    navigate(`/employer/connect/${convoId}`);
  };

  // URL id active conversation listener effect
  useEffect(() => {
    if (!id || !role) return;

    const convo = conversations.find((c) => c.conversationId === id);
    if (convo) {
      setConversationId(id);
      setSelectedUser(convo);
      axiosClient
        .post('/messages/mark-as-read', {
          conversationId: id,
          role: role,
        })
        .catch(console.error);
    } else {
      const fetchConvoDetails = async () => {
        try {
          const res = await axiosClient.get(`/${role}/connect/conversations/${id}`);
          if (res) {
            setConversations((prev) => {
              if (!prev.some((c) => c.conversationId === id)) {
                return [res, ...prev];
              }
              return prev;
            });
            setConversationId(id);
            setSelectedUser(res);
            await axiosClient.post('/messages/mark-as-read', {
              conversationId: id,
              role: role,
            });
          }
        } catch (err) {
          console.error('Failed to fetch conversation details:', err);
        }
      };
      fetchConvoDetails();
    }
  }, [id, conversations.length, role]);
  useEffect(() => {
    if (role === 'employer') {
      fetchCandidates();
    }
  }, [role]);
  const handleMessageSent = ({ conversationId, text, createdAt }) => {
    setConversations((prev) =>
      prev
        .map((c) => {
          if (c.conversationId === conversationId) {
            // FIX ở đây
            return {
              ...c,
              lastMessage: text, // nên update luôn
              lastMessageTime: createdAt, // nên update luôn
              unreadCount: {
                ...c.unreadCount,
                [role]: 0,
              },
            };
          }
          return c;
        })
        .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
    );
  };
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      {role === 'employer' && (
        <CandidateSidebar
          candidates={conversations}
          selectedId={conversationId}
          onSelect={handleSelectCandidate}
          role={role} // truyền xuống
          currentUser={user}
        />
      )}
      {role === 'candidate' && (
        <EmployerSidebar
          employers={conversations}
          selectedId={conversationId}
          onSelect={handleSelectEmployer}
          role={role} // truyền xuống
          currentUser={user}
        />
      )}
      {/* Main */}
      <main className={styles.main}>
        <div className={styles.topbar}>
          <p>{role === 'employer' ? 'Chat với ứng viên' : 'Chat với nhà tuyển dụng'}</p>
        </div>

        <ChatWindow
          chatUser={selectedUser}
          conversationId={conversationId}
          onMessageSent={(msg) => handleMessageSent(msg)}
        />
      </main>

      {/* CHỈ employer mới có CandidateList */}
      {role === 'employer' && (
        <CandidateList candidates={candidates} onSelect={handleSelectCandidate} />
      )}
      {role === 'candidate' && (
        <EmployerList employers={employers} onSelect={handleSelectEmployer} />
      )}
    </div>
  );
}
