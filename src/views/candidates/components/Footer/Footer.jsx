import React from "react";
import styles from "./Footer.module.scss";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.grid}>

                    {/* BRAND */}
                    <div className={styles.brand}>
                        <h3 className={styles.brandTitle}>
                            Hire<span className={styles.cyan}>IT</span>
                            <span className={styles.plus}>+</span>
                        </h3>

                        <p className={styles.brandDesc}>
                            Nền tảng tuyển dụng công nghệ Việt Nam. Kết nối nhân tài với những cơ hội nghề nghiệp tốt nhất.
                        </p>

                    </div>

                    {/* CANDIDATES */}
                    <div>
                        <h4 className={styles.sectionTitle}>Ứng Viên</h4>
                        <ul className={styles.linkList}>
                            <li><a href="" className={styles.linkItem}>Tìm việc làm</a></li>
                            <li><a href="" className={styles.linkItem}>Thêm việc làm yêu thích</a></li>
                            <li><a href="" className={styles.linkItem}>Ứng tuyển ngay</a></li>
                        </ul>
                    </div>

                    {/* EMPLOYER */}
                    <div>
                        <h4 className={styles.sectionTitle}>Nhà Tuyển Dụng</h4>
                        <ul className={styles.linkList}>
                            <li><a className={styles.linkItem}>Đăng tin tuyển dụng</a></li>
                            <li><a className={styles.linkItem}>Tìm kiếm hồ sơ</a></li>
                            <li><a className={styles.linkItem}>Giải pháp nhân sự</a></li>
                            <li><a className={styles.linkItem}>Báo giá dịch vụ</a></li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h4 className={styles.sectionTitle}>Liên Hệ</h4>

                        <ul className={styles.contactList}>
                            <li className={styles.contactItem}>
                                <MapPin size={18} className={styles.contactIcon} />
                                <span> Thủ Đức, TP. Hồ Chí Minh</span>
                            </li>

                            <li className={styles.contactItem}>
                                <Phone size={18} className={styles.contactIcon} />
                                <span>(028) 3999 9999</span>
                            </li>

                            <li className={styles.contactItem}>
                                <Mail size={18} className={styles.contactIcon} />
                                <span>contact@hireit.vn</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className={styles.bottom}>
                    <p className={styles.copy}>&copy; 2025 HireIT Corporation. All rights reserved.</p>

                    <div className={styles.bottomLinks}>
                        <a className={styles.bottomLink}>Điều khoản sử dụng</a>
                        <a className={styles.bottomLink}>Chính sách bảo mật</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
