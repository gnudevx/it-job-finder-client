import styles from "./InsightDropdownContent.module.scss";

export const InsightDropdownContent = () => {
    // Tạm dùng mock data — sau này bạn có thể fetch từ MongoDB / API admin
    const insights = [
        {
            id: 1,
            tag: "Market Insight",
            title: "Hành vi tìm việc của ứng viên sau dịp Tết",
            date: "11/02/2025",
            desc: "Theo thống kê, hành vi tìm việc và ứng tuyển của ứng viên sẽ tăng mạnh vào tuần thứ 3 sau Tết...",
            image: "https://via.placeholder.com/320x120.png?text=Market+Insight",
            isNew: true,
        },
        {
            id: 2,
            tag: "Bí kíp đăng tin",
            title: "Hình thức bán hàng - Tiêu chí riêng cho Kinh doanh",
            date: "28/11/2024",
            desc: "Chọn thêm hình thức bán hàng với các tin đăng tuyển nhân viên kinh doanh để tối ưu hiệu quả...",
        },
        {
            id: 3,
            tag: "Bí kíp đăng tin",
            title: "Hành vi tìm việc của ứng viên sau lễ 2/9",
            date: "06/09/2024",
            desc: "Sau nghỉ lễ 2/9, số lượt ứng tuyển dự báo sẽ tăng mạnh trong ngành công nghệ...",
        },
    ];

    return (
        <div className={styles.container}>
            <h4>TopCV Insights</h4>
            {insights.map((item) => (
                <div key={item.id} className={styles.item}>
                    <div className={styles.info}>
                        <div className={styles.meta}>
                            <span className={styles.tag}>{item.tag}</span>
                            <span className={styles.date}>{item.date}</span>
                        </div>
                        <h5>{item.title}</h5>
                        <p>{item.desc}</p>
                    </div>
                </div>
            ))}
            <div className={styles.footer}>
                <button>Xem tất cả</button>
            </div>
        </div>
    );
};
