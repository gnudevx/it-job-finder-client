import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./ConnectPage.module.scss";

import EmployerSidebar from "./component/ChatSidebar/EmployerSidebar.jsx";
import CandidateSidebar from './component/ChatSidebar/CandidateSidebar.jsx'
import ChatWindow from "./component/ChatWindow.jsx";
import CandidateList from "./component/RightPanel/CandidateList.jsx";
import EmployerList from "./component/RightPanel/EmployerList.jsx";
import { MOCK_MESSAGES_EPLOYERS } from "./types";
import employerService from "@api/employerSerivce.js"

export default function ConnectPage() {
  const { user } = useAuth();
  const role = user?.role; // 🔥
  const [candidates, setCandidates] = useState([]); 
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    if (role === "employer") {
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
      console.log("data: ",res)
      const mapped = res.data.map((item) => ({
        id: item.candidate.candidateId, // 👈 QUAN TRỌNG
        name: item.candidate.fullName,
        avatar: item.candidate.avatar,
        position: item.jobTitle,
        appliedDate: item.appliedAt,
      }));

      setCandidates(mapped);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSelectCandidate = (candidateId, convoId) => {
    setSelectedCandidate(candidates.find(c => c.id === candidateId));
    setConversationId(convoId);
  };
  useEffect(() => {
    if (role === "employer") {
      fetchCandidates();
    }
  }, [role]);
  const handleMessageSent = ({ candidateId, text }) => {
    setCandidates(prev =>
      prev.map(c =>
        c.id === candidateId
          ? {
              ...c,
              lastMessage: text,
              lastMessageTime: new Date().toISOString(),
              unreadCount: 0 // nếu bạn đang xem tin nhắn này
            }
          : c
      )
    );

    // Nếu candidate đang nhắn là selectedCandidate, update luôn
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate(prev => ({ ...prev, lastMessage: text }));
    }
  };
  return (
    <div className={styles.container}>
      {/* Sidebar */}
       {role === "employer" && (
      <EmployerSidebar
        candidates={conversations}
       onSelect={handleSelectCandidate}
        role={role} // 👈 truyền xuống
      />) 
      }
      {role === "candidate" && (
            <CandidateSidebar
              candidates={candidates}
              onSelect={handleSelectCandidate}
              role={role} // 👈 truyền xuống
            />) 
            }
      {/* Main */}
      <main className={styles.main}>
        <div className={styles.topbar}>
          <p>
            {role === "employer"
              ? "Chat với ứng viên"
              : "Chat với nhà tuyển dụng"}
          </p>
        </div>

        <ChatWindow
          candidate={selectedCandidate}
          conversationId={conversationId}
          onMessageSent={(msg) => handleMessageSent(msg)}
        />
      </main>

      {/* 👉 CHỈ employer mới có CandidateList */}
      {role === "employer" && (
        <CandidateList
          candidates={candidates}
          onSelect={handleSelectCandidate}
        />
      )}
      {role === "candidate" && (
        <EmployerList
          employers={MOCK_MESSAGES_EPLOYERS}
           onSelect={handleSelectCandidate}
        />
      )}
    </div>
  );
}