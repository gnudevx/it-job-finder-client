import { useState, useMemo, useEffect } from 'react';
import styles from './SearchCVList.module.scss';
import axiosClient from '@/services/axiosClient.js';
import CVCard from './CVCard';

const SearchCVList = () => {
  const [filters, setFilters] = useState({
    q: '',
    jobTitle: '',
    level: '',
    location: '',
    education: '',
    status: '',
    experienceMin: '',
    experienceMax: '',
  });
  const [cvs, setCvs] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCVs = async () => {
      setLoading(true);
      try {
        const params = {
          ...filters,
          skills: selectedSkills.join(','),
        };
        const res = await axiosClient.get('/employer/search-cv', { params });
        setCvs(res || []);
      } catch (err) {
        console.error('Error fetching CVs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCVs();
  }, [filters, selectedSkills]);

  const allSkills = useMemo(() => {
    const skills = new Set();
    cvs.forEach((cv) => {
      if (Array.isArray(cv.skills)) {
        cv.skills.forEach((s) => skills.add(s));
      }
    });
    return Array.from(skills);
  }, [cvs]);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const updateFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      q: '',
      jobTitle: '',
      level: '',
      location: '',
      education: '',
      status: '',
      experienceMin: '',
      experienceMax: '',
    });
    setSelectedSkills([]);
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.filterContainer}>
          <h3 className={styles.title}>Bộ lọc</h3>

          {/* Search */}
          <div className={styles.section}>
            <input
              className={styles.searchInput}
              placeholder="Tìm CV..."
              value={filters.q}
              onChange={(e) => updateFilter('q', e.target.value)}
            />
          </div>

          {/* Thông tin cơ bản */}
          <div className={styles.section}>
            <h4>Thông tin</h4>

            <div className={styles.field}>
              <label>Tiêu đề</label>
              <input
                value={filters.jobTitle}
                onChange={(e) => updateFilter('jobTitle', e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>Cấp độ</label>
              <input
                value={filters.level}
                onChange={(e) => updateFilter('level', e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>Địa điểm</label>
              <input
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
              />
            </div>
          </div>

          {/* Kinh nghiệm */}
          <div className={styles.section}>
            <h4>Kinh nghiệm</h4>

            <div className={styles.fieldRow}>
              <input
                type="number"
                placeholder="Từ (năm)"
                value={filters.experienceMin}
                onChange={(e) => updateFilter('experienceMin', e.target.value)}
              />
              <input
                type="number"
                placeholder="Đến (năm)"
                value={filters.experienceMax}
                onChange={(e) => updateFilter('experienceMax', e.target.value)}
              />
            </div>
          </div>

          {/* Skills */}
          <div className={styles.section}>
            <h4>Kỹ năng</h4>

            <div className={styles.skills}>
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={selectedSkills.includes(skill) ? styles.skillActive : styles.skill}
                  type="button"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <button className={styles.clearButton} onClick={clearFilters}>
            Xóa bộ lọc
          </button>
        </div>
      </aside>

      <section className={styles.content}>
        {loading ? (
          <p>Đang tải CV...</p>
        ) : cvs.length === 0 ? (
          <p>Không tìm thấy CV phù hợp.</p>
        ) : (
          <div className={styles.list}>
            {cvs.map((cv) => (
              <CVCard key={cv.id} cv={cv} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchCVList;
