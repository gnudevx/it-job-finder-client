import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './RecommendJobs.module.scss';
import Pagination from '@/components/common/Pagination/Pagination.jsx';
import { getJobDetail } from '@/api/jobService';
import { recommendResume } from '@/api/resumeService';

export default function RecommendJobs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const cv = location.state?.cv;
  const [pageJobsDetail, setPageJobsDetail] = useState([]);
  const limit = 5;

  // Gọi API recommend trên backend, không fetch file qua URL từ client
  useEffect(() => {
    if (!cv) {
      navigate('/candidate/account/mycvs');
      return;
    }

    const fetchRecommend = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await recommendResume(cv.id);
        setResults(data);
      } catch (err) {
        console.error('Lỗi recommend CV:', err);
        setError('Không thể phân tích CV. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommend();
  }, [cv, navigate]);

  // Khi đổi trang → fetch detail của 5 job
  useEffect(() => {
    if (!results) return;

    const start = (page - 1) * limit;
    const currentJobs = results.recommendations.slice(start, start + limit);

    const fetchDetails = async () => {
      try {
        const detailPromises = currentJobs.map((job) => getJobDetail(job.id).catch(() => null));

        const detailedList = await Promise.all(detailPromises);
        setPageJobsDetail(detailedList.filter(Boolean));
      } catch (e) {
        console.error('Lỗi load detail:', e);
      }
    };

    fetchDetails();
  }, [page, results]);

  // Render
  if (loading) return <p className={styles.loading}>Đang phân tích CV...</p>;
  if (error) return <p className={styles.loading}>{error}</p>;
  if (!results) return null;

  const totalJobs = results.recommendations?.length || 0;
  const totalPages = Math.ceil(totalJobs / limit);

  const goJobDetail = (id) => navigate(`/job/${id}`);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gợi ý việc làm từ CV</h2>

      <h3 className={styles.sectionTitle}>Kỹ năng tìm thấy:</h3>
      <div className={styles.skills}>
        {results.skills_found.length > 0 
          ? results.skills_found.join(', ') 
          : 'Không tìm thấy kỹ năng'}
      </div>

      {results.summary && (
        <p className={styles.summary}>{results.summary}</p>
      )}

      <h3 className={styles.sectionTitle}>
        Danh sách việc làm phù hợp ({totalJobs})
      </h3>

      {totalJobs === 0 ? (
        <p className={styles.noResults}>Không tìm thấy việc làm phù hợp với CV của bạn.</p>
      ) : (
        <>
          <div className={styles.jobList}>
            {pageJobsDetail.map((job, idx) => {
              const recommendation = results.recommendations[
                (page - 1) * limit + idx
              ];
              
              return (
                <div key={job._id} className={styles.recommendationCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.jobInfo}>
                      <h4 className={styles.jobTitle}>{job.title}</h4>
                      <p className={styles.company}>
                        {job.company || 'Công ty đang cập nhật'}
                      </p>
                    </div>
                    <div className={styles.matchScore}>
                      <div className={styles.percentage}>
                        {recommendation?.match_percentage || 0}%
                      </div>
                      <small>Match</small>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Lương:</span>
                      <span>{job.salary_raw || 'Thoả thuận'}</span>
                    </div>

                    {/* Thông tin kinh nghiệm */}
                    {recommendation?.cv_experience_years != null && (
                      <div className={styles.infoRow}>
                        <span className={styles.label}>Kinh nghiệm CV:</span>
                        <span>
                          {recommendation.cv_experience_years > 0
                            ? `${recommendation.cv_experience_years} năm`
                            : 'Chưa có kinh nghiệm'}
                        </span>
                      </div>
                    )}
                    {recommendation?.experience_required != null && (
                      <div className={styles.infoRow}>
                        <span className={styles.label}>Yêu cầu:</span>
                        <span className={recommendation.experience_match === true ? styles.matchYes : recommendation.experience_match === false ? styles.matchNo : ''}>
                          {recommendation.experience_required} năm
                          {recommendation.experience_match === true && ' ✓'}
                          {recommendation.experience_match === false && ' ⚠'}
                        </span>
                      </div>
                    )}

                    {/* Thông tin địa điểm */}
                    {recommendation?.cv_location && (
                      <div className={styles.infoRow}>
                        <span className={styles.label}>Địa chỉ ứng viên:</span>
                        <span>{recommendation.cv_location}</span>
                      </div>
                    )}
                    {recommendation?.job_location_text && (
                      <div className={styles.infoRow}>
                        <span className={styles.label}>Địa điểm công việc:</span>
                        <span className={recommendation.location_match ? styles.matchYes : ''}>
                          {recommendation.job_location_text}
                          {recommendation.location_match && ' ✓'}
                        </span>
                      </div>
                    )}

                    {recommendation?.reason && (
                      <div className={styles.reason}>
                        <strong>Lý do gợi ý:</strong> {recommendation.reason}
                      </div>
                    )}

                    {recommendation?.matched_skills && (
                      <div className={styles.matchedSkills}>
                        <strong>Kỹ năng trùng khớp:</strong>
                        {recommendation.matched_skills.required.length > 0 && (
                          <div className={styles.skillGroup}>
                            <span className={styles.skillLabel}>
                              Bắt buộc ({recommendation.matched_skills.required.length}):
                            </span>
                            <div className={styles.skillTags}>
                              {recommendation.matched_skills.required.map((skill) => (
                                <span key={skill} className={styles.skillTag}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {recommendation.matched_skills.optional.length > 0 && (
                          <div className={styles.skillGroup}>
                            <span className={styles.skillLabel}>
                              Tùy chọn ({recommendation.matched_skills.optional.length}):
                            </span>
                            <div className={styles.skillTags}>
                              {recommendation.matched_skills.optional.map((skill) => (
                                <span key={skill} className={styles.skillTag}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className={styles.cardFooter}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => goJobDetail(job._id)}
                    >
                      Xem chi tiết công việc
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
