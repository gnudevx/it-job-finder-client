export const REWARD_TIERS = [
    {
        name: 'Bạc (Silver)',
        minPoints: 0,
        benefits: ['Báo cáo tuần cơ bản', 'Giảm 5% gói tin đăng'],
        color: 'bg-gray-400',
    },
    {
        name: 'Vàng (Gold)',
        minPoints: 1000,
        benefits: ['Báo cáo phân tích sâu', 'Giảm 10% gói tin đăng', 'Huy hiệu NTD uy tín'],
        color: 'bg-yellow-400',
    },
    {
        name: 'Kim Cương (Diamond)',
        minPoints: 5000,
        benefits: ['Hỗ trợ 1-1', 'Giảm 20% trọn đời', 'Truy cập sớm tính năng Beta'],
        color: 'bg-blue-400',
    },
];

export const INITIAL_TIPS = [
    // Market Insight (Bí kíp đăng tin)
    {
        id: 'tip_1',
        title: 'Hành vi tìm việc của ứng viên sau dịp Tết',
        content: 'Theo thống kê, hành vi tìm việc và ứng tuyển của ứng viên sẽ tăng mạnh vào tuần thứ 3 sau Tết (dự kiến bắt đầu từ 17/2/2025). Kích hoạt dịch vụ đăng tin ngay để tăng lợi thế cạnh tranh.',
        category: 'Market Insight',
        date: '11/02/2025',
        aiGenerated: false,
    },
    {
        id: 'tip_2',
        title: 'Hình thức bán hàng - Tiêu chí riêng cho Sales',
        content: 'Chọn thêm Hình thức bán hàng với các tin đăng tuyển Nhân viên kinh doanh để tối ưu hóa khả năng tìm kiếm của ứng viên.',
        category: 'Market Insight',
        date: '28/11/2024',
        aiGenerated: false,
    },

    // Keywords (Từ khóa tìm kiếm)
    {
        id: 'tip_kw_1',
        title: 'Top từ khóa Hot tháng 2/2025',
        content: 'Các từ khóa được tìm nhiều nhất: "Nhân viên kinh doanh", "Marketing", "Kế toán", "Thực tập sinh". Hãy thêm các từ khóa này vào tiêu đề tin đăng của bạn.',
        category: 'Keywords',
        date: '10/02/2025',
        aiGenerated: false,
    },
    {
        id: 'tip_kw_2',
        title: 'Tối ưu SEO cho tin tuyển dụng IT',
        content: 'Với ngành IT, hãy cụ thể hóa ngôn ngữ lập trình (Java, React, .NET) ngay trong tiêu đề để thu hút đúng đối tượng.',
        category: 'Keywords',
        date: '05/02/2025',
        aiGenerated: false,
    },

    // Service Efficiency (Hiệu quả dịch vụ)
    {
        id: 'tip_se_1',
        title: 'Cách tăng 50% lượt xem tin',
        content: 'Sử dụng tính năng "Làm mới tin" vào khung giờ vàng (8h-9h sáng) giúp tin của bạn luôn nằm ở trang đầu kết quả tìm kiếm.',
        category: 'Service Efficiency',
        date: '01/02/2025',
        aiGenerated: false,
    },

    // Recruitment Market (Thị trường tuyển dụng)
    {
        id: 'tip_rm_1',
        title: 'Báo cáo lương 2024 - 2025',
        content: 'Mức lương trung bình ngành Marketing đã tăng 15% so với cùng kỳ năm ngoái. Cập nhật dải lương cạnh tranh để thu hút nhân tài.',
        category: 'Recruitment Market',
        date: '20/01/2025',
        aiGenerated: false,
    },

    // Feature (Tính năng)
    {
        id: 'tip_ft_1',
        title: 'Ra mắt tính năng: Chat trực tiếp với ứng viên',
        content: 'Giờ đây bạn có thể nhắn tin trực tiếp với ứng viên ngay trên hệ thống mà không cần chờ email phản hồi. Thử ngay!',
        category: 'Feature',
        date: '15/01/2025',
        aiGenerated: false,
    },

    // Market Report (Báo cáo thị trường)
    {
        id: 'tip_mr_1',
        title: 'Tổng quan thị trường lao động Q1/2025',
        content: 'Nhu cầu tuyển dụng nhóm ngành Dịch vụ & Du lịch dự kiến bùng nổ trở lại. Xem chi tiết báo cáo để chuẩn bị kế hoạch nhân sự.',
        category: 'Market Report',
        date: '01/01/2025',
        aiGenerated: false,
    },
];