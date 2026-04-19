import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './ConnectPage.module.scss';

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
  const role = user?.role; // 🔥
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
  useEffect(() => {
    if (!user?._id) return;

    // ✅ connect trước
    socket.connect();

    console.log("✅ SOCKET CONNECTED");

    const handleReceive = (message) => {
        setConversations(prev => {
          return prev
            .map(c => {
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
            .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
        });
      };

    socket.on("receive-message", handleReceive);

    return () => {
      socket.off("receive-message", handleReceive);
      socket.disconnect();
    };
  }, [user, role, conversationId]);
useEffect(() => {
  currentConversationRef.current = conversationId;
}, [conversationId]);

  useEffect(() => {
    if (role === 'candidate') {
      const fetchEmployers = async () => {
        try {
          const res = await candidateService.getApplications();
          setEmployers(res.data); // 👈 data bạn đã format ở backend
        } catch (err) {
          console.error(err);
        }
      };

      fetchEmployers();
    }
  }, [role]);
  useEffect(() => {
    if (!user?._id) return;

    socket.connect();
  }, [user]);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res =
          role === 'employer'
            ? await employerService.getConversationsByEmployer()
            : await candidateService.getConversationsByCandidate();

        setConversations(res);

        // 🔥 JOIN ALL ROOM
          res.forEach(c => {
            socket.emit('join-conversation', c.conversationId);
          });
      } catch (err) {
        console.error(err);
      }
    };

    if (role) fetchConversations();
  }, [role]);

  
  const handleSelectEmployer = async (employerId, conversationId, jobId) => {
    try {
      let convoId = conversationId;
      const convo = conversations.find((c) => c.conversationId === convoId);
      if (!convoId) {
        const res = await candidateService.createConversation(employerId, jobId);
        convoId = res._id;
      }
      setConversationId(convoId);
      const employerData = employers.find(
        (e) => e.id === employerId
      );

      setSelectedUser({
        ...employerData,
        ...convo,
      });
      // 🔥 QUAN TRỌNG
      await axiosClient.post('/messages/mark-as-read', {
        conversationId: convoId,
        role: role,
      });
      setConversations(prev =>
        prev.map(c => {
          if (c.conversationId === convoId) {
            return {
              ...c,
              unreadCount: {
                ...c.unreadCount,
                [role]: 0
              }
            };
          }
          return c;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };
  const fetchCandidates = async () => {
    try {
      const res = await employerService.getApplications();
      console.log('data: ', res);
      const mapped = res.data.map((item) => ({
        id: item.candidate.candidateId, // 👈 QUAN TRỌNG
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
    const convo = conversations.find((c) => c.conversationId === convoId);
    const candidate = candidates.find((c) => c.id === candidateId);

    setSelectedUser({
      ...convo,
      ...candidate,
    });

    setConversationId(convoId);

    // 🔥 QUAN TRỌNG
    try {
      await axiosClient.post('/messages/mark-as-read', {
        conversationId: convoId,
        role: role,
      });
      setConversations(prev =>
        prev.map(c => {
          if (c.conversationId === convoId) {
            return {
              ...c,
              unreadCount: {
                ...c.unreadCount,
                [role]: 0
              }
            };
          }
          return c;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (role === 'employer') {
      fetchCandidates();
    }
  }, [role]);
  const handleMessageSent = ({ conversationId, text, createdAt }) => {
      setConversations(prev =>
        prev.map(c => {
          if (c.conversationId === conversationId) { // ✅ FIX ở đây
            return {
              ...c,
              lastMessage: text,               // 👉 nên update luôn
              lastMessageTime: createdAt,      // 👉 nên update luôn
              unreadCount: {
                ...c.unreadCount,
                [role]: 0,
              }
            };
          }
          return c;
        }).sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
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
          role={role} // 👈 truyền xuống
        />
      )}
      {role === 'candidate' && (
        <EmployerSidebar
          employers={conversations}
          selectedId={conversationId} 
          onSelect={handleSelectEmployer}
          role={role} // 👈 truyền xuống
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

      {/* 👉 CHỈ employer mới có CandidateList */}
      {role === 'employer' && (
        <CandidateList candidates={candidates} onSelect={handleSelectCandidate} />
      )}
      {role === 'candidate' && (
        <EmployerList employers={employers} onSelect={handleSelectEmployer} />
      )}
    </div>
  );
}
