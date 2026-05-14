import React, { useState, useEffect } from 'react';
import styles from './ModuleBased_Recommend.module.scss';
import CVCard from './CVCard.jsx';
import axiosClient from '@/services/axiosClient.js';
import recommendService from '@/api/recommendService.js';
export default function ModuleBased_Recommend() {
  const [selectedJobId, setSelectedJobId] = useState('');
  const [jobs, setJobs] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [recommendedCvs, setRecommendedCvs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);

  // Load employer's jobs on component mount
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await axiosClient.get('/employer/jobs/getHistoryEmployer');
        if (response.success) {
          setJobs(response.data);
        }
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setIsLoadingJobs(false);
      }
    };

    loadJobs();
  }, []);

  const handleGetRecommendations = async () => {
    if (!selectedJobId) {
      alert('Vui lòng chọn công việc trước khi tìm CV phù hợp');
      return;
    }

    setIsAiLoading(true);
    setRecommendedCvs([]);

    try {
      const response = await recommendService.getRecommendedCvs(selectedJobId);
      if (response.data.success) {
        setRecommendedCvs(response.data.data);
      } else {
        alert('Không thể tải danh sách CV được gợi ý');
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      alert('Có lỗi xảy ra khi tải danh sách CV được gợi ý');
    } finally {
      setIsAiLoading(false);
    }
  };
  const selectedJob = jobs.find((job) => job._id === selectedJobId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.iconBox}>
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            Gợi ý CV thông minh
          </h2>

          <p className={styles.subtitle}>
            Hãy chọn mô tả công việc mà bạn đã tạo. Hệ thống sẽ phân tích và gợi ý những CV phù hợp nhất.
          </p>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div>
            <div className={styles.labelRow}>
              <label className={styles.label}>Chọn công việc cần tuyển dụng</label>
              <span className={styles.hint}>Chọn job để hệ thống tìm CV phù hợp nhất</span>
            </div>

            {isLoadingJobs ? (
              <div className={styles.loading}>Đang tải danh sách công việc...</div>
            ) : (
              <select
                className={styles.select}
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
              >
                <option value="">-- Chọn công việc --</option>
                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>
                    {job.title} - {job.location?.name || 'Chưa xác định'}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className={styles.buttonWrapper}>
            <button
              onClick={handleGetRecommendations}
              disabled={isAiLoading || !selectedJobId}
              className={`${styles.button} ${
                isAiLoading || !selectedJobId ? styles.buttonDisabled : styles.buttonActive
              }`}
            >
              {isAiLoading ? (
                <>
                  <svg className={styles.spinner} fill="none" viewBox="0 0 24 24">
                    <circle
                      className={styles.spinnerBg}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className={styles.spinnerPath}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Đang tìm CV phù hợp...
                </>
              ) : (
                'Tìm CV phù hợp với công việc'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Result */}
      {recommendedCvs.length > 0 && (
        <div className={styles.result}>
          <div className={styles.resultHeader}>
            <span />
            <h3>Kết quả phân tích từ hệ thống</h3>
            <span />
          </div>

          <div className={styles.resultGrid}>
            {recommendedCvs.map((cv) => (
              <CVCard
                key={cv.resumeId}
                cv={cv}
                isRecommended
                jobTitle={selectedJob?.title}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
