import React from "react";
import styles from "./ViewedEmployer.module.scss";

export default function ViewedEmployer() {
    // 🔹 Dữ liệu mẫu (có thể thay bằng dữ liệu thật từ API)
    const employers = [
        {
            id: 1,
            logo: "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/52abc87777839ea711633c6f26f8df6f-5d71df53686b6.jpg",
            name: "Chị Bình",
            position: "Trưởng phòng",
            company: "CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐÀO TẠO KỸ NGUYÊN",
            timeAgo: "6 năm trước",
        },
        {
            id: 2,
            logo: "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-cong-nghe-nha-viet-nam-1e9f191a14dae29d7e9c85373b25f606-66d14720a5b07.jpg",
            name: "Anh Tuấn",
            position: "HR Manager",
            company: "CÔNG TY TNHH CÔNG NGHỆ TOPCV VIỆT NAM",
            timeAgo: "3 năm trước",
        },
    ];

    return (
        <div className={styles.container}>
            <h2>Danh sách Nhà tuyển dụng xem CV</h2>

            <div className={styles.list}>
                {employers.map((employer) => (
                    <div key={employer.id} className={styles.card}>
                        <img src={employer.logo} alt={employer.company} className={styles.logo} />
                        <div className={styles.info}>
                            <div className={styles.nameLine}>
                                <span className={styles.name}>{employer.name}</span>
                                <span className={styles.position}>{employer.position}</span>
                            </div>
                            <div className={styles.company}>{employer.company}</div>
                        </div>
                        <div className={styles.time}>{employer.timeAgo}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
