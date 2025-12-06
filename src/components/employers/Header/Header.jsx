import React, { useState } from "react";
import styles from "./Header.module.scss";
import { IoMenuSharp } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { BiMessageSquareDots } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
// import { FaBell } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi2";
import { NavButton } from "@/views/employers/components/Dashboard/NavButton/NavButton.jsx";
import { DropdownButton } from "@/views/employers/components/Dashboard/DropdownButton/DropdownButton.jsx";
import { InsightDropdownContent } from "@/views/employers/components/Dashboard/InsightDropdownContent/InsightDropdownContent.jsx";
import NotificationDropdown from "@/views/employers/components/Dashboard/DropdownButton/NotificationDropdown.jsx";
import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";
import { IoCaretDown, IoHelpCircleOutline, IoLogOutOutline } from "react-icons/io5";
import logoHIDEIT from "@assets/Logo_HireIT.png";
import authService from "@/services/authService";
import { useEffect } from "react";
import employerSerivce from "@/api/employerSerivce";
import { useNavigate } from "react-router-dom";
export default function Header({ onToggleSidebar }) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await authService.logoutRequest();   // 👈 gọi API logout
        } catch (error) {
            console.error("Logout error:", error);
        }

        // Xóa token, điều hướng về login
        localStorage.removeItem("authToken");

        navigate("/login");    // 👈 chuyển trang
    };
    const [currentEmployerId, setCurrentEmployerId] = useState(null);

    useEffect(() => {
        const fetchEmployerData = async () => {
            try {
                const res = await employerSerivce.getMe();
                // giả sử getEmployerPersonal gọi /employer/account/settings/personal
                setCurrentEmployerId(res.user._id); // lấy employer._id
            } catch (err) {
                console.error("Lấy thông tin employer lỗi:", err);
            }
        };
        fetchEmployerData();
    }, []);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <header className={styles["header"]}>
            <div className={styles["header-left"]}>
                <IoMenuSharp
                    className={styles["menu-icon"]}
                    onClick={onToggleSidebar}
                />
                {/* <span className={styles["brand-name"]}>HireIT</span> */}
                <div className={styles["brand-name"]}>
                    <img src={logoHIDEIT} alt="HireIT Logo" className={styles["brand-logo"]} />
                </div>
            </div>

            <div className={styles["header-right"]}>
                <NavButton icon={BsPencilSquare} label="Đăng tin" to="/employer/jobs/create" />
                <NavButton icon={TbReportSearch} label="Tìm CV" to="/employer/search" />
                <NavButton icon={BiMessageSquareDots} label="Connect" to="/employer/connect" />
                <DropdownButton
                    icon={FaRegLightbulb}
                    label="Insights"
                    content={<InsightDropdownContent />}
                />

                <NotificationDropdown employerId={currentEmployerId} />

                <button className={`${styles["icon-button"]} ${styles["cart-button"]}`}>
                    <HiShoppingCart />
                    <span className={styles["badge"]}>0</span>
                </button>
                {/* 2. Nút Avatar và Dropdown (Mới) */}
                <div className={styles["profile-menu-wrapper"]}>
                    {/* Nút bấm để mở dropdown */}
                    <button
                        className={styles["icon-button"]}
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                    >
                        <FaUserCircle className={styles["avatar-icon"]} />
                        <IoCaretDown className={styles["caret-icon"]} />
                    </button>

                    {/* Menu dropdown, chỉ hiện khi isDropdownOpen là true */}
                    {isDropdownOpen && (
                        <div className={styles["profile-dropdown"]}>
                            <ul>
                                <li>
                                    <IoHelpCircleOutline />
                                    <span>Hỗ trợ</span>
                                </li>
                                <li onClick={handleLogout} className={styles.logoutItem}>
                                    <IoLogOutOutline />
                                    <span>Đăng xuất</span>
                                </li>
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
