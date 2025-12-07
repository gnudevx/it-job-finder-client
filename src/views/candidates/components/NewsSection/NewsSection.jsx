import React from "react";
import styles from "./NewsSection.module.scss";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import CareerTipsImage from "@/assets/photo-blog.avif";
import TechTrendsImage from "@/assets/photo-AI.avif";
import InterviewImage from "@/assets/photo-bigTech.avif";
export default function NewsSection() {

    const articles = [
        {
            category: "Career Tips",
            title: "Cách deal lương hiệu quả cho Senior Developer năm 2025",
            desc: "Bí quyết thương lượng mức thu nhập xứng đáng với năng lực của bạn trong bối cảnh thị trường biến động.",
            image: CareerTipsImage,
            date: "12 Oct, 2024",
            readTime: "5 min read",
            author: "Tanca",
            link: "https://www.tanca.io/blog/cach-viet-email-deal-luong-hieu-qua-va-kheo-leo-voi-nha-tuyen-dung"
        },
        {
            category: "Tech Trends",
            title: "AI đang thay đổi quy trình tuyển dụng IT như thế nào?",
            desc: "Tìm hiểu về cách các công ty lớn sử dụng AI để lọc hồ sơ và làm sao để CV của bạn vượt qua vòng này.",
            image: TechTrendsImage,
            date: "10 Oct, 2024",
            readTime: "3 min read",
            author: "Tech Insider",
            link: "https://www.globaltechinsider.com/"
        },
        {
            category: "Interview",
            title: "Top 20 câu hỏi phỏng vấn System Design tại Big Tech",
            desc: "Tổng hợp bộ câu hỏi và hướng dẫn trả lời chi tiết cho các vị trí Backend/Fullstack level cao.",
            image: InterviewImage,
            date: "08 Oct, 2024",
            readTime: "10 min read",
            author: "Dev Lead",
            link: "https://fsecourse.com/system-design-interview/"
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={styles.badge}>Blog & Insights</span>

                    <h2 className={styles.title}>
                        Góc nhìn <span className={styles.gradient}>nghề nghiệp</span>
                    </h2>

                    <p className={styles.subtitle}>
                        Cập nhật xu hướng công nghệ, bí quyết phỏng vấn và lời khuyên phát triển sự nghiệp từ chuyên gia.
                    </p>
                </div>

                <div className={styles.grid}>
                    {articles.map((item, idx) => (
                        <article key={idx} className={styles.card}>

                            <div className={styles.imageWrapper}>
                                <img src={item.image} alt={item.title} className={styles.image} />

                                <div className={styles.category}>
                                    {item.category}
                                </div>
                            </div>

                            <div className={styles.cardContent}>

                                <div className={styles.meta}>
                                    <span className={styles.metaItem}>
                                        <Clock size={12} /> {item.date}
                                    </span>

                                    <span className={styles.dot}></span>

                                    <span className={styles.metaItem}>
                                        <BookOpen size={12} /> {item.readTime}
                                    </span>
                                </div>

                                <h3 className={styles.cardTitle}>{item.title}</h3>

                                <p className={styles.desc}>{item.desc}</p>

                                <div className={styles.footer}>
                                    <span className={styles.author}>By {item.author}</span>

                                    <a href={item.link} className={styles.readMore} target="_blank" rel="noopener noreferrer">
                                        <ArrowUpRight size={18} />
                                    </a>
                                </div>
                            </div>

                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}
