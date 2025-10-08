import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="homepage">
        {/* Header */}
        <header className="header">
            <div className="header-container">
            <div className="logo-section">
                <img src="/logo.png" alt="Logo" className="logo" />
                <span className="brand">ITFinder</span>
            </div>

            <div className="auth-section">
                <button className="login-btn" onClick={() => navigate("/login")}>Đăng nhập</button>
                <button className="register-btn">Đăng ký</button>
            </div>
            </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
            <h1 className="hero-title">Tìm việc làm mơ ước của bạn hôm nay</h1>
            <p className="hero-subtitle">
            Hàng ngàn cơ hội việc làm từ các công ty hàng đầu Việt Nam
            </p>

            <div className="hero-search">
            <input
                type="text"
                placeholder="Nhập chức danh, kỹ năng hoặc công ty..."
                className="hero-input"
            />
            <button className="hero-button">Tìm việc ngay</button>
            </div>
        </section>

        {/* Job Categories */}
        <section className="categories">
            <h2 className="section-title">Loại hình nổi bật</h2>
            <div className="category-grid">
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
                <div className="category-card" key={index}>
                {job}
                </div>
            ))}
            </div>
        </section>

        {/* Footer */}
        <footer className="footer">
            <p>© 2025 by Dũng Nguyễn - Tín Nguyễn</p>
        </footer>
        </div>
    );
}
