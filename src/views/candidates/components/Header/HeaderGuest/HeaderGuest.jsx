import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/views/candidates/components/Header/HeaderGuest/HeaderGuest.module.scss";
import logo from "@/assets/Logo_HireIT_Header.png";

export default function HeaderGuest() {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            {/* Left */}
            <div className={styles["header-left"]}>
                <img src={logo} alt="Logo" className={styles["brand-logo"]} />
            </div>

            {/* Center Navigation */}
            <nav className={styles.nav}>
                <button className={styles.navItem} onClick={() => navigate("/home")}>
                    Việc làm
                </button>

                <button className={styles.navItem} onClick={() => navigate("/login")}>
                    Thêm CV
                </button>

                <button className={styles.navItem} onClick={() => navigate("/login")}>
                    Gợi ý việc làm
                </button>
            </nav>

            {/* Right */}
            <div className={styles["header-right"]}>
                <button className={styles.loginBtn} onClick={() => navigate("/login")}>
                    Đăng nhập
                </button>
                <button className={styles.registerBtn} onClick={() => navigate("/register")}>
                    Đăng ký
                </button>
            </div>
        </header>
    );
}
