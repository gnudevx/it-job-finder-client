import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./ConnectPage.module.scss";

import EmployerSidebar from "./component/ChatSidebar/EmployerSidebar.jsx";
import CandidateSidebar from './component/ChatSidebar/CandidateSidebar.jsx'
import ChatWindow from "./component/ChatWindow.jsx";
import CandidateList from "./component/RightPanel/CandidateList.jsx";
import EmployerList from "./component/RightPanel/EmployerList.jsx";
import { MOCK_CANDIDATES } from "./types";
import { MOCK_EPLOYERS } from "./types";
import { MOCK_MESSAGES_EPLOYERS } from "./types";
export default function ConnectPage() {
  const { user } = useAuth();
  const role = user?.role; // 🔥
  const [selectedId, setSelectedId] = useState();
  const activeChatUser = role === "employer"
    ? MOCK_CANDIDATES.find((c) => c.id === selectedId)
    : MOCK_MESSAGES_EPLOYERS.find((e) => e.id === selectedId);
 

  return (
    <div className={styles.container}>
      {/* Sidebar */}
       {role === "employer" && (
      <EmployerSidebar
        candidates={MOCK_CANDIDATES}
        onSelect={setSelectedId}
        role={role} // 👈 truyền xuống
      />) 
      }
{role === "candidate" && (
      <CandidateSidebar
        candidates={MOCK_EPLOYERS}
        onSelect={setSelectedId}
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

        <ChatWindow candidate={activeChatUser} />
      </main>

      {/* 👉 CHỈ employer mới có CandidateList */}
      {role === "employer" && (
        <CandidateList
          candidates={MOCK_CANDIDATES}
          onSelect={setSelectedId}
        />
      )}
      {role === "candidate" && (
        <EmployerList
          employers={MOCK_MESSAGES_EPLOYERS}
          onSelect={setSelectedId}
        />
      )}
    </div>
  );
}