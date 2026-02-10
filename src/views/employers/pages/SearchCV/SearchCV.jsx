import { NavLink, Routes, Route } from "react-router-dom";
import styles from "./SearchCV.module.scss";
import SearchCVList from "./SearchCVList.jsx";
import AIRecommendationBox from "./AIRecommendationBox.jsx";

const SearchCV = () => {
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
                            className={({ isActive }) =>
                                `${styles.tab} ${isActive ? styles.activeTab : ""}`
                            }
                        >
                            Tìm kiếm CV
                        </NavLink>
                        <NavLink
                            to="ai"
                            className={({ isActive }) =>
                                `${styles.tab} ${isActive ? styles.activeTab : ""}`
                            }
                        >
                            Gợi ý CV (AI)
                        </NavLink>
                    </div>
                </div>
            </nav>

            <main className={styles.main}>
                <Routes>
                    <Route index element={<SearchCVList />} />
                    <Route path="ai" element={<AIRecommendationBox />} />
                </Routes>
            </main>
        </div>
    );
};

export default SearchCV;