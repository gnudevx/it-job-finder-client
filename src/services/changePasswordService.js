const PASSWORD_KEY = "mock_password";

// Lấy mật khẩu hiện tại
export const getCurrentPassword = () => {
    const saved = localStorage.getItem(PASSWORD_KEY);
    if (!saved) {
        // nếu chưa có → tạo mật khẩu mặc định
        localStorage.setItem(PASSWORD_KEY, "123456");
        return "123456";
    }
    return saved;
};

// Lưu mật khẩu mới
export const saveNewPassword = (newPassword) => {
    localStorage.setItem(PASSWORD_KEY, newPassword);
};
