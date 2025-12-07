import React, { useState } from "react"; // <-- Thêm useState
import { NavLink } from "react-router-dom";
import {
    Home,
    ShoppingCart,
    Briefcase,
    FileText,
    BarChart,
    ClipboardList, // <-- Icon mới cho "Tin tuyển dụng"
    ChevronDown,   // <-- Icon mới cho mũi tên sub-menu
    History,
    Settings,
    Bell,
    MessageSquareDot
} from "lucide-react";
import styles from "./Sidebar.module.scss";
import PropTypes from "prop-types";
import avt from "@/assets/logo.jpg";

// --- Cấu trúc menu MỚI ---
// Chúng ta thêm 'type', 'id', 'children', 'badge'
const menuItems = [
    { name: "Bảng tin", icon: Home, to: "dashboard" },
    { name: "HireIT Insights", icon: BarChart, to: "insights" },
    { name: "Mua dịch vụ", icon: ShoppingCart, to: "buy-services" },
    // Thêm một đường phân cách
    { type: "divider" },
    { name: "Chiến dịch tuyển dụng", icon: Briefcase, to: "recruitment-campaigns" },
    // Mục mới "Tin tuyển dụng"
    { name: "Tin tuyển dụng", icon: ClipboardList, to: "jobs" },
    // Mục "Quản lý CV" được cập nhật với 'children'
    {
        name: "Quản lý CV",
        icon: FileText,
        id: "cv-manager", // Thêm ID để quản lý state
        to: "cvs-management",
        children: [
            { name: "Quản lý kết nối CV", to: "cvs-management/candidate-connection" }
        ]
    },
    { type: "divider" },
    { name: "Lịch sử hoạt động", icon: History, to: "account/activities" },
    { name: "Cài đặt tài khoản", icon: Settings, to: "account/settings" },
    { type: "divider" },
    { name: "Thông báo hệ thống", icon: Bell, to: "system-notification" },
    { type: "divider" },
    { name: "Hộp thư hỗ trợ", icon: MessageSquareDot, to: "support-box" },
    { type: "divider" },
];


export default function Sidebar({ isCollapsed }) {
    // State để theo dõi menu con nào đang mở
    const [openSubMenuId, setOpenSubMenuId] = useState("");
    // Hàm xử lý khi bấm vào menu cha
    const handleSubMenuToggle = (id) => {
        setOpenSubMenuId(prevId => (prevId === id ? "" : id));
    };
    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
            <div className={styles.profile}>
                <div className={styles.avatarWrapper}>
                    <img src={avt} alt="avatar" className={styles.avatarImg} />
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>Nguyen Duc</div>
                    <div className={styles.role}>Employer</div>
                </div>
            </div>

            <nav className={styles.menu}>
                {menuItems.map((item, index) => {

                    // --- Render ĐƯỜNG PHÂN CÁCH ---
                    if (item.type === "divider") {
                        return <div key={`divider-${index}`} className={styles.divider}></div>;
                    }

                    // --- Render MENU CÓ CON (SUB-MENU) ---
                    if (item.children) {
                        const Icon = item.icon;
                        const isOpen = openSubMenuId === item.id;

                        return (
                            <div key={item.id} className={styles["submenu-wrapper"]}>
                                {/* * CHÚ Ý: Toàn bộ mục này là 1 NavLink
                                  * Nó chứa: Icon, Chữ, và Nút bấm (mũi tên)
                                */}
                                <NavLink
                                    to={item.to} // <-- Link cha (cvs-management)
                                    end
                                    className={({ isActive }) =>
                                        `${styles["menu-item"]} ${isActive ? styles.active : ""}`
                                    }
                                >
                                    {/* Icon và Chữ (giống như menu đơn) */}
                                    <div className={styles["icon-box"]}>
                                        <Icon size={20} />
                                    </div>
                                    <span>{item.name}</span>

                                    {/* Nút bấm Mũi tên */}
                                    <button
                                        className={styles["submenu-toggle-btn"]}
                                        onClick={(e) => {
                                            // Ngăn NavLink chuyển trang khi bấm nút này
                                            e.preventDefault();
                                            // Ngăn sự kiện nổi bọt
                                            e.stopPropagation();
                                            // Gọi hàm toggle
                                            handleSubMenuToggle(item.id);
                                        }}
                                    >
                                        <ChevronDown
                                            size={16}
                                            className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
                                        />
                                    </button>
                                </NavLink>

                                {/* * Danh sách menu con
                                  * Chỉ render khi: (isOpen) VÀ (sidebar KHÔNG bị thu gọn)
                                */}
                                {isOpen && (
                                    <div className={styles["submenu"]}>
                                        {item.children.map(child => (
                                            <NavLink
                                                key={child.to}
                                                to={child.to}
                                                className={({ isActive }) =>
                                                    `${styles["submenu-item"]} ${isActive ? styles.active : ""}`
                                                }
                                            >
                                                <span>{child.name}</span>
                                                {child.badge && <span className={styles.badge}>{child.badge}</span>}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }
                    // --- Render MENU ĐƠN (như cũ) ---
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            end
                            to={item.to}
                            className={({ isActive }) =>
                                `${styles["menu-item"]} ${isActive ? styles.active : ""}`
                            }
                        >
                            <div className={styles["icon-box"]}>
                                <Icon size={20} />
                            </div>
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}

Sidebar.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
};