import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

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

      const savedCandidatePassword =
        localStorage.getItem("mock_password") || "123456";

      if (username === "tin" && password === savedCandidatePassword) {
        localStorage.setItem("authToken", "token-tin");
        alert("Đăng nhập thành công!");
        navigate("/candidate/home");
        return;
      }

      if (username === "dung" && password === "2003") {
        localStorage.setItem("authToken", "token-dung");
        alert("Đăng nhập thành công!");
        navigate("/employer");
        return;
      }

      setError("Sai username hoặc mật khẩu");
    }, 1000);
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginCard} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Đăng nhập</h2>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className={styles.togglePass}
            onClick={() => setShowPass((s) => !s)}
          >
            {showPass ? "Ẩn" : "Hiện"}
          </span>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
