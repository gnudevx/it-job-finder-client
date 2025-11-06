import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import styles from "@components/candidates/Header/Header.module.scss";
import logo from "@/assets/Logo_HireIT.png";


export default function Header({ onToggleSidebar }) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className={styles.header}>
            {/* --- Left: Logo + menu --- */}
            <div className={styles["header-left"]}>
                <button
                    onClick={onToggleSidebar}
                    className={styles["menu-icon"]}
                    aria-label="Toggle sidebar"
                >
                    <Menu />
                </button>

                <div className={styles["brand-name"]}>
                    <img src={logo} alt="Logo" className={styles["brand-logo"]} />
                    <span className={styles["brand-text"]}>IT Job Finder</span>
                </div>
            </div>

            {/* --- Center: Navigation --- */}
            <nav className={styles.nav}>
                <button className={styles.navItem}>Việc làm</button>
                <button className={styles.navItem}>Hồ sơ</button>
                <button className={styles.navItem}>Cẩm nang nghề nghiệp</button>
                <button className={styles.navItem}>Công cụ</button>
            </nav>

            {/* --- Right: Icons + Profile --- */}
            <div className={styles["header-right"]}>
                <div className={styles.iconWrapper}>
                    <Bell className={styles.icon} />
                </div>

                <div
                    className={styles.profileWrapper}
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <User className={styles.avatarIcon} />
                    <span className={styles.username}>Ứng viên</span>
                    <ChevronDown className={styles.caretIcon} />
                    {showDropdown && (
                        <div className={styles.profileDropdown}>
                            <ul>
                                <li>Hồ sơ của tôi</li>
                                <li>Việc đã lưu</li>
                                <li>Đơn ứng tuyển</li>
                                <li className={styles.logout}>Đăng xuất</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    onToggleSidebar: PropTypes.func.isRequired,
};
