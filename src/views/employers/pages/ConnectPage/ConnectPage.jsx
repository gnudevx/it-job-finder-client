import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './ConnectPage.module.scss';

import CandidateSidebar from './component/ChatSidebar/CandidateSidebar.jsx';
import EmployerSidebar from './component/ChatSidebar/EmployerSidebar.jsx';
import ChatWindow from './component/ChatWindow.jsx';
import CandidateList from './component/RightPanel/CandidateList.jsx';
import EmployerList from './component/RightPanel/EmployerList.jsx';
import employerService from '@api/employerSerivce.js';
import candidateService from '@api/candidateService.js';

import { socket } from '@/services/socket.js'; //

export default function ConnectPage() {
  const { user } = useAuth();
  const role = user?.role; // 🔥
  const [candidates, setCandidates] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [candidateConversations, setCandidateConversations] = useState([]); // danh sach chat cuoi cung ben candidate
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
    if (role === 'candidate') {
      const fetchConversations = async () => {
        try {
          const res = await candidateService.getConversationsByCandidate();
          console.log('aaaaa', res);
          setCandidateConversations(res);
        } catch (err) {
          console.error(err);
        }
      };

      fetchConversations();
    }
  }, [role]);

  useEffect(() => {
    console.log('user in connect', user);
    if (!user?._id) {
      console.log('❌ NO USER');
      return;
    }

    console.log('🚀 CONNECT SOCKET...');

    socket.connect();

    socket.emit('join', user._id);

    console.log('✅ JOIN:', user._id);

    return () => {
      socket.disconnect();
    };
  }, [user]);
  const handleSelectEmployer = async (employerId, conversationId, jobId) => {
    try {
      let convoId = conversationId;

      if (!convoId) {
        const res = await candidateService.createConversation(employerId, jobId);
        convoId = res._id;
      }

      setConversationId(convoId);

      const convoData = candidateConversations.find((c) => c.id === employerId);

      const employerData = employers.find((e) => e.id === employerId && e.jobId === jobId);
      setSelectedUser({
        ...employerData,
        ...convoData,
        jobId,
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (role === 'employer') {
      const fetchConversations = async () => {
        try {
          const res = await employerService.getConversationsByEmployer();
          setConversations(res); // res.data = mảng như bạn vừa gửi
        } catch (err) {
          console.error(err);
        }
      };
      fetchConversations();
    }
  }, [role]);
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
  const handleSelectCandidate = (candidateId, convoId) => {
    const convo = conversations.find((c) => c.id === candidateId);
    const candidate = candidates.find((c) => c.id === candidateId);

    setSelectedUser({
      ...convo,
      ...candidate, // 🔥 lấy thêm position
    });

    setConversationId(convoId);
  };
  useEffect(() => {
    if (role === 'employer') {
      fetchCandidates();
    }
  }, [role]);
  const handleMessageSent = ({ candidateId, text }) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? {
              ...c,
              lastMessage: text,
              lastMessageTime: new Date().toISOString(),
              unreadCount: 0, // nếu bạn đang xem tin nhắn này
            }
          : c
      )
    );

    // Nếu candidate đang nhắn là selectedCandidate, update luôn
    if (selectedUser?.id === candidateId) {
      setSelectedUser((prev) => ({ ...prev, lastMessage: text }));
    }
  };
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      {role === 'employer' && (
        <CandidateSidebar
          candidates={conversations}
          onSelect={handleSelectCandidate}
          role={role} // 👈 truyền xuống
        />
      )}
      {role === 'candidate' && (
        <EmployerSidebar
          employers={candidateConversations}
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
