import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Authentication.module.scss";

import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle } from "@/utils/googleAuth";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { setAuthToken, setUserId } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đăng nhập thất bại");
        return;
      }

      // Lưu vào context + localStorage
      setAuthToken(data.token);
      localStorage.setItem("authToken", data.token);

      localStorage.setItem("userId", data.user._id);
      setUserId(data.user._id);

      alert("Đăng nhập thành công!");

      // Điều hướng theo role
      if (data.user.role === "employer") {
        navigate("/employer");
      } else {
        navigate("/candidate/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Không thể kết nối server");
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle(async (code) => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        if (data.success) {
          setAuthToken(data.token);
          localStorage.setItem("authToken", data.token);

          localStorage.setItem("userId", data.user._id);
          setUserId(data.user._id);

          alert("Đăng nhập Google thành công!");
          navigate("/candidate/home");
        } else {
          alert("Google login thất bại!");
        }
      } catch (error) {
        console.error("Google Login Error:", error);
        alert("Lỗi kết nối đến server!");
      }
    });
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authCard} onSubmit={handleLogin}>
        <h2 className={styles.title}>Chào mừng bạn đã quay trở lại</h2>
        <p className={styles.subtitle}>
          Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
        </p>

        {/* Email */}
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className={styles.inputGroup}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className={styles.togglePass}
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "Ẩn" : "Hiện"}
          </span>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.submitBtn} type="submit">
          Đăng nhập
        </button>

        <div className={styles.orLine}>Hoặc đăng nhập bằng</div>

        <div className={styles.socialButtons}>
          {/* GOOGLE */}
          <button
            type="button"
            className={styles.google}
            onClick={handleGoogleLogin}
          >
            <FcGoogle /> Google
          </button>

        </div>

        <p className={styles.switchLine}>
          Bạn chưa có tài khoản?
          <span onClick={() => navigate("/register")}> Đăng ký ngay</span>
        </p>
      </form>
    </div>
  );
}
