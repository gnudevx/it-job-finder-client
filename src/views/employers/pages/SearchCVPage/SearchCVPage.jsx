import { NavLink, Outlet } from "react-router-dom";
import styles from "./SearchCV.module.scss";

export default function SearchCVPage() {
    return (
        <div className={styles.app}>
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
                                isActive ? styles.activeTab : ""
                            }
                        >
                            Tìm kiếm CV
                        </NavLink>

                        <NavLink
                            to="ai"
                            className={({ isActive }) =>
                                isActive ? styles.activeTab : ""
                            }
                        >
                            Gợi ý CV (AI)
                        </NavLink>
                    </div>
                </div>
            </nav>

            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}
