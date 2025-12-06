import React, { useState, useEffect } from 'react';
import styles from './ManageEmployers.module.scss';

import RecruiterList from './RecruiterList/RecruiterList.jsx';
import RecruiterDetail from './RecruiterDetail/RecruiterDetail.jsx';

import employerService from "@/api/adminEmployer.js";

export default function ManageEmployers() {
  const [recruiters, setRecruiters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await employerService.getAllEmployers();
        console.log("Recruiter data:", data, "haha", recruiters);

        setRecruiters(data);
      } catch (err) {
        console.error("Lỗi load employers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className={styles.loading}>Đang tải...</div>;

  return (
    <div className={styles.container}>
      {!selected ? (
        <RecruiterList
          recruiters={recruiters}
          onViewDetail={async (r) => {
            const full = await employerService.getEmployerById(r.id);
            setSelected(full);

          }}
        />
      ) : (
        <RecruiterDetail
          recruiter={selected}
          onBack={() => setSelected(null)}
          onStatusChange={(id, newStatus) => {
            setRecruiters(prev =>
              prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
            );
            setSelected(null); // quay về list
          }}
        />
      )}
    </div>
  );
}
