import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Authentication.module.scss";

import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle } from "@/utils/googleAuth";

export default function RegisterPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!fullname || !email || !pass || !confirm) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (pass !== confirm) {
      setError("Mật khẩu không trùng khớp");
      return;
    }

    // Fake register
    localStorage.setItem("mock_password", pass);
    alert("Đăng ký thành công!");
    navigate("/login");
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authCard} onSubmit={handleRegister}>
        <h2 className={styles.title}>Chào mừng bạn đến với TopCV</h2>
        <p className={styles.subtitle}>
          Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
        </p>

        {/* Full name */}
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Nhập họ tên"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        {/* Confirm */}
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.submitBtn} type="submit">
          Đăng ký
        </button>

        <div className={styles.orLine}>Hoặc đăng nhập bằng</div>

        <div className={styles.socialButtons}>
          <button className={styles.google}
          onClick={() => {
            loginWithGoogle(async (code) => {
              const res = await fetch("http://localhost:5000/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
              });

              const data = await res.json();

              if (data.success) {
                localStorage.setItem("authToken", data.token);
                alert("Đăng ký bằng Google thành công!");
                navigate("/candidate/home");
              }
            });
          }}>
          <FcGoogle /> Google</button>
        </div>

        <p className={styles.switchLine}>
          Bạn đã có tài khoản?
          <span onClick={() => navigate("/login")}> Đăng nhập ngay</span>
        </p>
      </form>
    </div>
  );
}
