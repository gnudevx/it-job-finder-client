import React from "react";
import styles from "./HomePage.module.scss";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/Logo_HireIT.png";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className={styles.homepage}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.logoSection}>
                        <img src={Logo} className={styles.logo} />
                    </div>

                    <div className={styles.authSection}>
                        <button
                            className={styles.loginBtn}
                            onClick={() => navigate("/login")}
                        >
                            Đăng nhập
                        </button>
                        <button className={styles.registerBtn}>Đăng ký</button>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>
                    Tìm việc làm mơ ước của bạn hôm nay
                </h1>
                <p className={styles.heroSubtitle}>
                    Hàng ngàn cơ hội việc làm từ các công ty hàng đầu Việt Nam
                </p>

                <div className={styles.heroSearch}>
                    <input
                        type="text"
                        placeholder="Nhập chức danh, kỹ năng hoặc công ty..."
                        className={styles.heroInput}
                    />
                    <button className={styles.heroButton}>Tìm việc ngay</button>
                </div>
            </section>

            {/* Categories */}
            <section className={styles.categories}>
                <h2 className={styles.sectionTitle}>Loại hình nổi bật</h2>

                <div className={styles.categoryGrid}>
                    {[
                        "Công nghệ thông tin",
                        "Quản lý dự án",
                        "Business Analyst",
                        "Data Engineer",
                        "Nhân sự",
                        "Thiết kế",
                        "Frontend Developer",
                        "Dịch vụ khách hàng",
                    ].map((job, index) => (
                        <div className={styles.categoryCard} key={index}>
                            {job}
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>© 2025 by Dũng Nguyễn - Tín Nguyễn</p>
            </footer>
        </div>
    );
}
