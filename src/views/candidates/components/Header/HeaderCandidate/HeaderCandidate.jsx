import React, { useState, useEffect, useRef } from "react";
import {
    ChevronDown, ChevronRight, MessageSquareMore,
    Briefcase, FileText, UserCog, Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "@/views/candidates/components/Header/HeaderCandidate/HeaderCandidate.module.scss";
import logo from "@/assets/Logo_HireIT_Header.png";
import logo_candidate from "@/assets/logo_candidate.jpg";
import NotificationDropdown from "@/views/candidates/components/Header/DropdownButton/NotificationDropdown.jsx";
import { clearToken } from "@/utils/auth.js";

export default function HeaderCandidate() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [openSections, setOpenSections] = useState({
        jobs: false,
        cv: false,
        peronal_settings: false,
        general_settings: false,
    });

    const dropdownRef = useRef(null);
    const profileRef = useRef(null);
    const navigate = useNavigate();

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Close dropdown when click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <header className={styles.headerCandidate}>
            {/* Left */}
            <div className={styles["header-left"]}>
                <img src={logo} alt="Logo" className={styles["brand-logo"]} />
            </div>

            {/* Center Navigation */}
            <nav className={styles.nav}>
                <button className={styles.navItem} onClick={() => navigate("/candidate/home")}>
                    Việc làm
                </button>
                <button className={styles.navItem} onClick={() => navigate("/candidate/account/mycvs")}>
                    Thêm CV
                </button>
                <button
                    className={styles.navItem}
                    onClick={() => {
                        const cv = localStorage.getItem("selectedCV");
                        if (!cv) navigate("/candidate/account/mycvs");
                        else navigate("/candidate/account/recommendjobs");
                    }}
                >
                    Gợi ý việc làm
                </button>
            </nav>

            {/* Right */}
            <div className={styles["header-right"]}>
                <NotificationDropdown />

                <div className={styles.iconWrapper} onClick={() => navigate("/candidate/messages")}>
                    <MessageSquareMore className={styles.icon} />
                </div>

                {/* PROFILE DROPDOWN */}
                <div
                    className={styles.profileWrapper}
                    ref={profileRef}
                    onClick={() => setShowDropdown((prev) => !prev)}
                >
                    <img src={logo_candidate} className={styles.avatarIcon} />
                    <span className={styles.username}>Ứng viên</span>
                    <ChevronDown className={styles.caretIcon} />

                    {showDropdown && (
                        <div className={styles.profileDropdown} ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
                            <div className={styles["profile-dropdown"]}>
                                {/* Quản lý việc làm */}
                                <div className={styles["dropdown-section"]}>
                                    <h4 onClick={() => toggleSection("jobs")}>
                                        <span className={styles.h4Left}>
                                            <Briefcase className={styles.sectionIcon} />
                                            Quản lý việc làm
                                        </span>

                                        <ChevronRight className={`${styles.arrowIcon} ${openSections.jobs ? styles.open : ""}`} />
                                    </h4>

                                    <ul className={`${styles.subList} ${openSections.jobs ? styles.show : ""}`}>
                                        <li onClick={() => navigate("/candidate/account/savedjobs")}>Việc làm đã lưu</li>
                                        <li onClick={() => navigate("/candidate/account/appliedjobs")}>Việc làm đã ứng tuyển</li>
                                        <li
                                            onClick={() => {
                                                const cv = localStorage.getItem("selectedCV");
                                                if (!cv) navigate("/candidate/account/mycvs");
                                                else navigate("/candidate/account/recommendjobs");
                                                setShowDropdown(false);
                                            }}
                                        >
                                            Gợi ý việc làm
                                        </li>
                                    </ul>
                                </div>

                                {/* Quản lý CV */}
                                <div className={styles["dropdown-section"]}>
                                    <h4 onClick={() => toggleSection("cv")}>
                                        <span className={styles.h4Left}>
                                            <FileText className={styles.sectionIcon} />
                                            Quản lý CV
                                        </span>

                                        <ChevronRight className={`${styles.arrowIcon} ${openSections.cv ? styles.open : ""}`} />
                                    </h4>

                                    <ul className={`${styles.subList} ${openSections.cv ? styles.show : ""}`}>
                                        <li onClick={() => navigate("/candidate/account/mycvs")}>CV của tôi</li>
                                        <li onClick={() => navigate("/candidate/account/connectedemployer")}>Nhà tuyển dụng muốn kết nối</li>
                                        <li onClick={() => navigate("/candidate/account/viewedemployer")}>Nhà tuyển dụng xem hồ sơ</li>
                                    </ul>
                                </div>

                                {/* Cài đặt cá nhân */}
                                <div className={styles["dropdown-section"]}>
                                    <h4 onClick={() => toggleSection("peronal_settings")}>
                                        <span className={styles.h4Left}>
                                            <UserCog className={styles.sectionIcon} />
                                            Cài đặt cá nhân
                                        </span>

                                        <ChevronRight className={`${styles.arrowIcon} ${openSections.peronal_settings ? styles.open : ""}`} />
                                    </h4>

                                    <ul className={`${styles.subList} ${openSections.peronal_settings ? styles.show : ""}`}>
                                        <li onClick={() => navigate("/candidate/account")}>Cài đặt thông tin cá nhân</li>
                                        <li onClick={() => navigate("/candidate/account/changepassword")}>Đổi mật khẩu</li>
                                    </ul>
                                </div>

                                {/* Cài đặt chung */}
                                <div className={styles["dropdown-section"]}>
                                    <h4 onClick={() => toggleSection("general_settings")}>
                                        <span className={styles.h4Left}>
                                            <Settings className={styles.sectionIcon} />
                                            Cài đặt chung
                                        </span>

                                        <ChevronRight className={`${styles.arrowIcon} ${openSections.general_settings ? styles.open : ""}`} />
                                    </h4>

                                    <ul className={`${styles.subList} ${openSections.general_settings ? styles.show : ""}`}>
                                        <li onClick={() => navigate("/candidate/account/notifications")}>Cài đặt thông báo</li>
                                        <li onClick={() => navigate("/candidate/account/security")}>Cài đặt bảo mật</li>
                                    </ul>
                                </div>

                                {/* Đăng xuất */}
                                <button
                                    className={styles["logout-button"]}
                                    onClick={() => {
                                        clearToken();
                                        navigate("/login");
                                    }}
                                >
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
