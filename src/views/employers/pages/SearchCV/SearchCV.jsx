import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './SearchCV.module.scss';
import SearchCVList from './SearchCVList.jsx';
import AIRecommendationBox from './AIRecommendationBox.jsx';
import ModuleBased_Recommend from './ModuleBased_Recommend.jsx';
import employerService from '@/api/employerSerivce.js';

const FEATURE_ACCESS = {
  FREE: { module: false, ai: false },
  PRO: { module: true, ai: false },
  ENTERPRISE: { module: true, ai: true },
};

const SearchCV = () => {
  const navigate = useNavigate();
  const [tier, setTier] = useState('FREE');
  const [loadingTier, setLoadingTier] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadEmployerTier = async () => {
      try {
        const res = await employerService.getMe();
        if (!isMounted) return;

        setTier(res?.user?.tier || 'FREE');
      } catch (error) {
        console.error('Failed to load employer tier:', error);
        if (isMounted) setTier('FREE');
      } finally {
        if (isMounted) setLoadingTier(false);
      }
    };

    loadEmployerTier();

    return () => {
      isMounted = false;
    };
  }, []);

  const access = FEATURE_ACCESS[tier] || FEATURE_ACCESS.FREE;

  const renderLockedFeature = (title, message) => (
    <div className={styles.lockedState}>
      <div className={styles.lockedCard}>
        <p className={styles.lockedKicker}>Quyền truy cập</p>
        <h2 className={styles.lockedTitle}>{title}</h2>
        <p className={styles.lockedMessage}>{message}</p>
        <button className={styles.upgradeButton} onClick={() => navigate('/employer/buy-services')}>
          Nâng cấp gói
        </button>
      </div>
    </div>
  );

  if (loadingTier) {
    return <div className={styles.loadingState}>Đang kiểm tra gói dịch vụ...</div>;
  }

  return (
    <div className={styles.app}>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.brand}>
            <div className={styles.logo}>CV</div>
          </div>
          <div className={styles.navTabs}>
            <NavLink
              to=""
              end
              className={({ isActive }) => `${styles.tab} ${isActive ? styles.activeTab : ''}`}
            >
              Tìm kiếm CV
            </NavLink>
            {access.ai ? (
              <NavLink
                to="ai"
                className={({ isActive }) => `${styles.tab} ${isActive ? styles.activeTab : ''}`}
              >
                Gợi ý CV (AI)
              </NavLink>
            ) : (
              <button type="button" className={`${styles.tab} ${styles.tabDisabled}`}>
                Gợi ý CV (AI)
              </button>
            )}
            {access.module ? (
              <NavLink
                to="module"
                className={({ isActive }) => `${styles.tab} ${isActive ? styles.activeTab : ''}`}
              >
                Gợi ý CV (Module)
              </NavLink>
            ) : (
              <button type="button" className={`${styles.tab} ${styles.tabDisabled}`}>
                Gợi ý CV (Module)
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <Routes>
          <Route index element={<SearchCVList />} />
          <Route
            path="ai"
            element={
              access.ai ? (
                <AIRecommendationBox />
              ) : (
                renderLockedFeature(
                  'Gợi ý CV (AI) chỉ dành cho gói Toàn Diện',
                  tier === 'FREE'
                    ? 'Gói Khởi Đầu không dùng được chức năng này. Hãy nâng lên gói Tăng Tốc hoặc Toàn Diện.'
                    : 'Gói Tăng Tốc chỉ dùng được gợi ý CV (Module). Hãy nâng lên gói Toàn Diện để dùng AI.',
                )
              )
            }
          />
          <Route
            path="module"
            element={
              access.module ? (
                <ModuleBased_Recommend />
              ) : (
                renderLockedFeature(
                  'Gợi ý CV (Module) chưa khả dụng',
                  'Gói Khởi Đầu không dùng được chức năng này. Hãy nâng lên gói Tăng Tốc hoặc Toàn Diện.',
                )
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default SearchCV;
