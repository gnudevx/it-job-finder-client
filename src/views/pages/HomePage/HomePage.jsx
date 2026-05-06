import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.scss';

import FilterBar from '@/views/candidates/components/FilterBar/FilterBar.jsx';
import useFavorites from '@/hooks/useFavorites';
import useDebounce from '@/hooks/useDebounce';
import JobCard from '@/views/candidates/components/JobCard/JobCard.jsx';
import { getAllJobs } from '@/api/jobService';
import Pagination from '@/components/common/Pagination/Pagination';
import NewsSection from '@/views/candidates/components/NewsSection/NewsSection.jsx';
import { Search, MapPin } from 'lucide-react';

// // Memoize normalizeText to avoid recalculation
// const normalizeText = (str) => {
//   if (!str) return '';
//   return str
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .replace(/\./g, '')
//     .replace(/\s+/g, '')
//     .toLowerCase();
// };

export default function HomePage() {
  const authToken = localStorage.getItem('authToken');
  const { toggleFavorite, isFavorite } = useFavorites(authToken);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300); // Debounce search to 300ms
  const [filters, setFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 16;

  const navigate = useNavigate();

  // Fetch jobs only once on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const params = {
          q: debouncedSearch,
          location: filters.location,
          experience: filters.experience,
          salaryLevel: filters.salaryLevel,
          skills: filters.skills,
          createDate: filters.createDate,
        };

        const data = await getAllJobs(params);
        const formatted = (data.data || data).map((job) => ({
          id: job._id,
          title: job.title,
          group: job.group_id?.name || 'Không rõ',
          salary: job.salary_raw || 'Thoả thuận',
          location: job.location?.name || 'Không rõ',
          experience: job.experience,
          createdAt: job.createdAt || job.updatedAt || null,
          skills: job.skills || [],
          jobType: job.jobType,
        }));

        formatted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJobs(formatted);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [debouncedSearch, filters.location, filters.experience, filters.salaryLevel, filters.skills, filters.createDate]);

  const handleFilterChange = useCallback((type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const filtered = jobs;

  const totalPages = Math.ceil(filtered.length / jobsPerPage);
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filtered.slice(indexOfFirst, indexOfLast);

  return (
    <div className={styles['home-container']}>
      {/* -------------- REPLACED WITH NEW HERO LAYOUT ---------------- */}
      <div className={styles.heroWrapper}>
        <div className={styles.bgLayer}></div>
        <div className={styles.bgCircleTop}></div>
        <div className={styles.bgCircleBottom}></div>

        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.leftContent}>
              <h1 className={styles.title}>
                HireIT - <span className={styles.gradientText}>Thêm CV,</span>
                <br />
                Tìm việc làm hiệu quả
              </h1>

              <p className={styles.subtitle}>
                Tiếp cận đa dạng các tin tuyển dụng IT chất lượng cao mỗi ngày.
              </p>

              <div className={styles.searchBar}>
                <div className={styles.searchInput}>
                  <Search className={styles.icon} size={20} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm việc làm, kỹ năng, công ty..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  />
                </div>

                <div className={styles.locationSelect}>
                  <MapPin className={styles.icon} size={20} />
                  <select
                    value={filters.location || ''}
                    onChange={(e) => {
                      const val = e.target.value;

                      // Nếu chọn "Tất cả địa điểm" => xoá filter
                      const formatted = val === '' || val === 'all' ? '' : val;

                      handleFilterChange('location', formatted);
                    }}
                  >
                    <option value="all">Tất cả địa điểm</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                  </select>
                </div>

                <button onClick={handleSearchSubmit} className={styles.searchButton}>
                  Tìm kiếm
                </button>
              </div>
            </div>

            <div className={styles.rightContent}>
              <div className={styles.imageWrapper}>
                <div className={styles.imageGlow}></div>
                <img
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Job Search"
                  className={styles.mainImage}
                />

                {/* <div className={styles.floatingBadge}>
                                    <div className={styles.badgeIconWrapper}>
                                        <Search size={24} />
                                    </div>
                                    <div>
                                        <p className={styles.badgeLabel}>Việc làm mới</p>
                                        <p className={styles.badgeCount}>120+</p>
                                    </div>
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------- END HERO SECTION ---------------- */}

      <FilterBar onChange={handleFilterChange} />

      <div className={styles['jobs-grid']}>
        {loading ? (
          <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>
            <p>Đang tải danh sách công việc...</p>
          </div>
        ) : currentJobs.length === 0 ? (
          <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>
            <p>Không tìm thấy công việc nào.</p>
          </div>
        ) : (
          currentJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isFavorite={isFavorite(job.id)}
              onToggleFavorite={toggleFavorite}
              onClick={() => navigate(`/job/${job.id}`)}
            />
          ))
        )}
      </div>

      <div className={styles['pagination']}>
        {totalPages > 1 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={(newPage) => setCurrentPage(newPage)}
          />
        )}
      </div>

      <NewsSection />
    </div>
  );
}
