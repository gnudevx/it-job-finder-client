export const PACKAGES = [
    {
        id: 'pkg_basic',
        name: 'Gói Khởi Đầu',
        tier: 'FREE',
        price: '0 VNĐ',
        description: 'Dành cho các startup nhỏ hoặc nhu cầu tuyển dụng ít.',
        features: [
            { text: '1 Tin đăng miễn phí / tháng', included: true },
            { text: 'Hiển thị trong 30 ngày', included: true },
            { text: 'Hỗ trợ qua Email', included: true },
            { text: 'Đẩy tin top đầu', included: false },
            { text: 'AI gợi ý ứng viên', included: false },
        ],
        highlight: false,
    },
    {
        id: 'pkg_pro',
        name: 'Gói Tăng Tốc',
        tier: 'PRO',
        price: '1.500.000 VNĐ',
        description: 'Giải pháp tối ưu cho doanh nghiệp đang mở rộng quy mô.',
        features: [
            { text: '10 Tin đăng / tháng', included: true },
            { text: 'Hiển thị ưu tiên 45 ngày', included: true },
            { text: 'Hỗ trợ ưu tiên 24/7', included: true },
            { text: '2 lần đẩy tin top đầu', included: true },
            { text: 'AI gợi ý ứng viên (Cơ bản)', included: true },
        ],
        highlight: true,
    },
    {
        id: 'pkg_enterprise',
        name: 'Gói Toàn Diện',
        tier: 'ENTERPRISE',
        price: '5.000.000 VNĐ',
        description: 'Dành cho tập đoàn lớn với nhu cầu tuyển dụng liên tục.',
        features: [
            { text: 'Không giới hạn tin đăng', included: true },
            { text: 'Hiển thị VIP vĩnh viễn', included: true },
            { text: 'Quản lý tài khoản riêng', included: true },
            { text: 'Đẩy tin tự động hàng tuần', included: true },
            { text: 'AI Matching cao cấp', included: true },
        ],
        highlight: false,
    },
];

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
    {
        id: 'tip_1',
        title: 'Tiêu đề hấp dẫn',
        content: 'Sử dụng các động từ mạnh và lợi ích rõ ràng ngay trong tiêu đề tin đăng để tăng 30% tỷ lệ click.',
        category: 'JD',
        aiGenerated: false,
    },
    {
        id: 'tip_2',
        title: 'Minh bạch lương thưởng',
        content: 'Tin tuyển dụng công khai khoảng lương thường nhận được nhiều hơn 40% hồ sơ so với tin để "Thỏa thuận".',
        category: 'Sourcing',
        aiGenerated: false,
    },
];
