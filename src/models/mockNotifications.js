export const mockNotifications = Array.from({ length: 200 }, (_, i) => {
    const id = i + 1;
    return {
        id,
        title: `Thông báo hệ thống #${id}`,
        date: new Date(Date.now() - i * 86400000).toLocaleDateString("vi-VN"),
        isNew: i < 5,
        description: `Nội dung mô tả chi tiết của thông báo hệ thống số ${id}.`
            + ` Đây là một thông báo mẫu để minh họa cách hoạt động của hệ thống thông báo trong ứng dụng.`,
        type: i % 3 === 0 ? "feature" : "notice",
    };
});