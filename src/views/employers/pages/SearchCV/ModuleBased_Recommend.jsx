import React, { useState, useEffect, useRef } from 'react';
import styles from './ModuleBased_Recommend.module.scss';
import CVCard from './CVCard.jsx';
import axiosClient from '@/services/axiosClient.js';
import recommendService from '@/api/recommendService.js';
import { Sparkles, BrainCircuit, ArrowRight, BriefcaseBusiness, ChevronDown } from 'lucide-react';

export default function ModuleBased_Recommend() {
  const [selectedJobId, setSelectedJobId] = useState('');
  const [jobs, setJobs] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [recommendedCvs, setRecommendedCvs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      if (response.success) {
        setRecommendedCvs(response.data);
      } else {
        console.log('Error getting recommendations:', response.data);
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
          <div className={styles.headerGlow} />

          <div className={styles.titleRow}>
            <div className={styles.iconBox}>
              <BrainCircuit size={34} strokeWidth={2.2} />
            </div>

            <div className={styles.titleContent}>
              <div className={styles.badge}>
                <Sparkles size={14} />
                Professional CV Matching
              </div>

              <h2 className={styles.title}>Professional CV Recommendation</h2>

              <p className={styles.subtitle}>
                Hệ thống phân tích kỹ năng và kinh nghiệm để đề xuất ứng viên phù hợp nhất với vị
                trí tuyển dụng.
              </p>
            </div>
          </div>
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
              <div className={styles.selectorCard}>
                <div className={styles.labelRow}>
                  <label className={styles.label}>Vị trí tuyển dụng</label>
                  <span className={styles.hint}>Hệ thống sẽ phân tích CV theo semantic matching</span>
                </div>

                <div className={styles.customSelect} ref={dropdownRef}>
                  <div
                    className={`${styles.selectTrigger} ${isOpen ? styles.selectTriggerOpen : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <BriefcaseBusiness size={20} className={styles.triggerIcon} />
                    <span className={styles.selectValue}>
                      {selectedJob?.title || 'Chọn vị trí cần tuyển dụng'}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    />
                  </div>

                  {isOpen && (
                    <div className={styles.dropdownList}>
                      <div
                        className={styles.dropdownItem}
                        onClick={() => {
                          setSelectedJobId('');
                          setIsOpen(false);
                        }}
                      >
                        Chọn vị trí cần tuyển dụng
                      </div>
                      {jobs.map((job) => (
                        <div
                          key={job._id}
                          className={`${styles.dropdownItem} ${
                            selectedJobId === job._id ? styles.dropdownItemActive : ''
                          }`}
                          onClick={() => {
                            setSelectedJobId(job._id);
                            setIsOpen(false);
                          }}
                          title={job.title}
                        >
                          {job.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Neural Matching...
                </>
              ) : (
                <>
                  Phân tích & gợi ý CV
                  <ArrowRight size={18} />
                </>
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
              <CVCard key={cv.resumeId} cv={cv} isRecommended jobTitle={selectedJob?.title} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
