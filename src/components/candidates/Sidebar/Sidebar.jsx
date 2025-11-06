import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Home, User, BookmarkCheck, FileText, ChevronDown } from "lucide-react";
import styles from "./Sidebar.module.scss";
import avt from "@/assets/logo.jpg";

export default function Sidebar({ isCollapsed }) {
    const [openSubMenu, setOpenSubMenu] = useState(false);

    const menuItems = [
        { name: "Trang chủ", icon: Home, path: "/candidate/home" },
        { name: "Hồ sơ", icon: User, path: "/candidate/profile" },
        { name: "Việc đã lưu", icon: BookmarkCheck, path: "/candidate/saved" },
        {
            name: "Đơn ứng tuyển",
            icon: FileText,
            path: "/candidate/applications",
            children: [
                { name: "Đang xử lý", path: "/candidate/applications/pending" },
                { name: "Đã duyệt", path: "/candidate/applications/approved" },
            ],
        },
    ];

    const handleSubMenuToggle = () => setOpenSubMenu((prev) => !prev);

    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
            {/* --- Hồ sơ người dùng --- */}
            <div className={styles.profile}>
                <div className={styles.avatarWrapper}>
                    <img src={avt} alt="avatar" className={styles.avatarImg} />
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>Ứng viên</div>
                    <div className={styles.role}>Candidate</div>
                </div>
            </div>

            {/* --- Danh sách menu --- */}
            <nav className={styles.menu}>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isOpen = item.children && openSubMenu;

                    return (
                        <div key={item.name} className={styles["submenu-wrapper"]}>
                            <NavLink
                                to={item.path}
                                end
                                className={({ isActive }) =>
                                    `${styles["menu-item"]} ${isActive ? styles.active : ""}`
                                }
                            >
                                <div className={styles["icon-box"]}>
                                    <Icon size={20} />
                                </div>
                                <span>{item.name}</span>

                                {/* Nếu có submenu thì thêm nút mở */}
                                {item.children && (
                                    <button
                                        className={styles["submenu-toggle-btn"]}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleSubMenuToggle();
                                        }}
                                    >
                                        <ChevronDown
                                            size={16}
                                            className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
                                        />
                                    </button>
                                )}
                            </NavLink>

                            {/* Hiển thị submenu nếu mở */}
                            {isOpen && item.children && (
                                <div className={styles.submenu}>
                                    {item.children.map((child) => (
                                        <NavLink
                                            key={child.path}
                                            to={child.path}
                                            className={({ isActive }) =>
                                                `${styles["submenu-item"]} ${isActive ? styles.active : ""}`
                                            }
                                        >
                                            {child.name}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}

Sidebar.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
};
