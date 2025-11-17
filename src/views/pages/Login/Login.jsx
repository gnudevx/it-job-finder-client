import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Vui lòng nhập username và mật khẩu");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Lấy mật khẩu đã lưu cho candidate (mock)
      const savedCandidatePassword =
        localStorage.getItem("mock_password") || "123456";

      // ===== CANDIDATE LOGIN =====
      if (username === "tin" && password === savedCandidatePassword) {
        localStorage.setItem("authToken", "token-tin");
        alert("Đăng nhập thành công!");
        navigate("/candidate/home");
        return;
      }

      // ===== EMPLOYER LOGIN (giữ nguyên) =====
      if (username === "dung" && password === "2003") {
        localStorage.setItem("authToken", "token-dung");
        alert("Đăng nhập thành công!");
        navigate("/employer");
        return;
      }

      // Nếu không khớp
      setError("Sai username hoặc mật khẩu");
    }, 1000);
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="title">Đăng nhập</h2>

        {/* Username */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="toggle-pass"
            onClick={() => setShowPass((s) => !s)}
          >
            {showPass ? "Ẩn" : "Hiện"}
          </span>
        </div>

        {/* Error */}
        {error && <p className="error">{error}</p>}

        {/* Submit */}
        <button type="submit" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
