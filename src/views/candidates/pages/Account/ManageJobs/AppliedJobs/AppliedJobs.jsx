import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styles from './AppliedJobs.module.scss';
import JobCard from '@/views/candidates/components/JobCard/JobCard.jsx';
import { useNavigate } from 'react-router-dom';
import useFavorites from '@/hooks/useFavorites';
import useDebounce from '@/hooks/useDebounce';
import { getMyAppliedJobs } from '@/api/applicationService/candidateApplication';
import Pagination from '@/components/common/Pagination/Pagination';

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  const { isFavorite, toggleFavorite } = useFavorites(authToken);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);
        const appliedJobs = await getMyAppliedJobs(authToken);

        const jobDetails = appliedJobs
          .map((app) => {
            const job = app.jobId;
            return {
              id: job?._id,
              title: job?.title,
              group: job?.group_id?.name || 'Không rõ',
              salary: job?.salary_raw || 'Thoả thuận',
              location: job?.location?.name || 'Không rõ',
              experience: job?.experience,
              createdAt: job?.createdAt,
              status: app.status,
              updatedAt: app.updatedAt,
            };
          })
          .filter(Boolean);

        setJobs(jobDetails);
      } catch (err) {
        console.error('Lỗi tải công việc đã ứng tuyển:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [authToken]);

  // Memoize filtered results
  const filtered = useMemo(() => {
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (job.group && job.group.toLowerCase().includes(debouncedSearch.toLowerCase()))
    );
  }, [jobs, debouncedSearch]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const paginatedJobs = filtered.slice(startIndex, endIndex);

  const handleSearch = useCallback((value) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Đang tải danh sách công việc đã ứng tuyển...</p>
      </div>
    );

  return (
    <div className={styles['home-container']}>
      <h2 className={styles.heading}>Danh sách công việc đã ứng tuyển</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên công việc hoặc nhóm..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div className={styles['jobs-grid']}>
        {filtered.length === 0 && (
          <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>
            {jobs.length === 0
              ? 'Bạn chưa ứng tuyển công việc nào.'
              : 'Không tìm thấy công việc nào.'}
          </p>
        )}

        {paginatedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isFavorite={isFavorite(job.id)}
            onToggleFavorite={() => toggleFavorite(job.id)}
            onClick={() => navigate(`/job/${job.id}`)}
            showStatusAndUpdate={true}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}
