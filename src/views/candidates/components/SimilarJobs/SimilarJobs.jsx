import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SimilarJobs.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import JobCard from '../JobCard/JobCard';
import useFavorites from '@/hooks/useFavorites';

export default function SimilarJobs({ jobId }) {
  const [jobs, setJobs] = useState([]);
  const authToken = localStorage.getItem('authToken');
  const { toggleFavorite, isFavorite } = useFavorites(authToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jobId) return;

    const fetchRecommend = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/recommend/jobs/${jobId}`
        );

        if (res.data.success) {
          // map dữ liệu về đúng format JobCard
          const mapped = res.data.data.map((item) => ({
            id: item._id,
            title: item.title,
            salary: item.salary_raw,
            location: item.location?.name || item.location,
            company: 'Đang cập nhật',
            jobType: 'fulltime',
            createdAt: new Date(),
          }));

          setJobs(mapped);
        }
      } catch (err) {
        console.error('Lỗi recommend:', err);
      }
    };

    fetchRecommend();
  }, [jobId]);

  if (!jobs.length) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Việc làm tương tự</h2>

      <div className={styles.list}>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isFavorite={isFavorite(job.id)}
            onToggleFavorite={toggleFavorite}
            onClick={() => navigate(`/job/${job.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

SimilarJobs.propTypes = {
  jobId: PropTypes.string.isRequired,
};