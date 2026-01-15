import React, { useState } from 'react';
import styles from './insights.module.scss';
import { INITIAL_TIPS } from './constants';
import { Lightbulb, Sparkles, Loader2, ThumbsUp, ThumbsDown, Info } from 'lucide-react';

const insights = () => {
    const [tips, setTips] = useState(INITIAL_TIPS);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Bí kíp đăng tin');

    const filters = [
        "Tất cả",
        "Bí kíp đăng tin",
        "Từ khóa tìm kiếm",
        "Hiệu quả dịch vụ",
        "Thị trường tuyển dụng",
        "Tính năng",
        "Báo cáo Thị trường"
    ];

    const categoryMap = {
        "Tất cả": 'All',
        "Bí kíp đăng tin": 'Market Insight',
        "Từ khóa tìm kiếm": 'Keywords',
        "Hiệu quả dịch vụ": 'Service Efficiency',
        "Thị trường tuyển dụng": 'Recruitment Market',
        "Tính năng": 'Feature',
        "Báo cáo Thị trường": 'Market Report'
    };

    const getDisplayCategory = (cat) => {
        const entry = Object.entries(categoryMap).find(([value]) => value === cat);
        return entry ? entry[0] : cat;
    };

    const filteredTips = tips.filter(tip => {
        const targetCategory = categoryMap[activeFilter];
        if (targetCategory === 'All') return true;
        return tip.category === targetCategory;
    });

    const handleGenerateTip = async () => {
        setLoading(true);
        // Giả lập API call
        const newTip = {
            id: Date.now(),
            category: 'Market Insight',
            title: 'Bí kíp mới từ AI',
            content: 'Nội dung AI tạo ra...',
            date: new Date().toLocaleDateString(),
            aiGenerated: true
        };
        setTips(prev => [newTip, ...prev]);
        setLoading(false);
    };

    return (
        <div className={styles.section}>
            {/* Banner */}
            <div className={styles.banner}>
                <div className={styles.bannerContent}>
                    <div className={styles.iconWrapper}>
                        <Lightbulb className={styles.icon} />
                    </div>
                    <p className={styles.bannerText}>
                        Cùng RecruitPro khám phá những bí kíp và thông tin hữu ích giúp bạn <span className={styles.highlight}>nâng cao hiệu quả tuyển dụng</span> và tìm kiếm những ứng viên xuất sắc.
                    </p>
                    <div className={styles.bannerImageWrapper}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2942/2942544.png" alt="folder" className={styles.bannerImage} />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className={styles.container}>
                <div className={styles.filters}>
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                        >
                            {filter}
                        </button>
                    ))}
                    <button
                        onClick={handleGenerateTip}
                        disabled={loading}
                        className={styles.aiBtn}
                    >
                        {loading ? <Loader2 className={styles.loader} /> : <Sparkles className={styles.sparkles} />}
                        AI Tư Vấn
                    </button>
                </div>

                {/* Tips List */}
                <div className={styles.tipsList}>
                    {filteredTips.length > 0 ? (
                        filteredTips.map((tip) => (
                            <div key={tip.id} className={styles.tipCard}>
                                <div className={styles.tipHeader}>
                                    <span className={styles.category}>{getDisplayCategory(tip.category)}</span>
                                    <span className={styles.date}>{tip.date}</span>
                                </div>
                                <h3 className={styles.title}>
                                    {tip.title} {tip.aiGenerated && <Sparkles className={styles.sparklesSmall} />}
                                </h3>
                                <p className={styles.content}>{tip.content}</p>
                                <div className={styles.actions}>
                                    <button className={styles.likeBtn}><ThumbsUp className={styles.iconSmall} /> Hữu ích</button>
                                    <button className={styles.dislikeBtn}><ThumbsDown className={styles.iconSmall} /> Không hữu ích</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}><Info className={styles.iconLarge} /></div>
                            <h3> Hiện Chưa có bài viết nào</h3>
                            <p> Hiện chưa có thông tin trong mục này. Vui lòng quay lại sau.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default insights;
