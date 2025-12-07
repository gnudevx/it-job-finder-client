import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Authentication.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle } from "@/utils/googleAuth";

export default function RegisterPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("candidate");
  const [gender, setGender] = useState("other");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!fullname || !email || !pass || !confirm) {
      setError("Vui lòng nhập đầy đủ thông tin");
      setLoading(false);
      return;
    }

    if (pass !== confirm) {
      setError("Mật khẩu không trùng khớp");
      setLoading(false);
      return;
    }

    if (pass.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          email,
          password: pass,
          role,
          gender,
        }),
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Đăng ký thất bại");
        setLoading(false);
        return;
      }

      login(data.user);
      // Show success message
      alert("Đăng ký thành công! Đang chuyển hướng...");
      
      // Navigate based on role - AUTO LOGIN COMPLETE
      if (data.user.role === "candidate") {
        navigate("/candidate/home");
      } else if (data.user.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/");
      }

    } catch (e) {
      setError("Lỗi kết nối server");
      console.error("Register error:", e);
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle(async (code) => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
          credentials: "include"
        });

        const data = await res.json();

        if (data.success) {
          // Save user info
          localStorage.setItem("user", JSON.stringify(data.user));
          
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }

          alert("Đăng nhập bằng Google thành công!");
          
          // Navigate based on user role from response
          if (data.user.role === "candidate") {
            navigate("/candidate/home");
          } else if (data.user.role === "employer") {
            navigate("/employer/dashboard");
          } else {
            navigate("/");
          }
        } else {
          alert("Google login failed: " + (data.error || data.message));
        }
      } catch (error) {
        console.error("Google login error:", error);
        alert("Lỗi kết nối server");
      }
    });
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authCard} onSubmit={handleRegister}>
        <h2 className={styles.title}>Chào mừng bạn đến với TopCV</h2>
        <p className={styles.subtitle}>
          Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
        </p>

        {/* Role Selection */}
        <div className={styles.roleSelection}>
          <label className={styles.roleLabel}>Đăng ký với vai trò:</label>
          <div className={styles.roleButtons}>
            <button
              type="button"
              className={`${styles.roleBtn} ${role === "candidate" ? styles.active : ""}`}
              onClick={() => setRole("candidate")}
              disabled={loading}
            >
              <div className={styles.roleIcon}>👤</div>
              <div className={styles.roleText}>
                <strong>Ứng viên</strong>
                <small>Tìm kiếm việc làm</small>
              </div>
            </button>
            <button
              type="button"
              className={`${styles.roleBtn} ${role === "employer" ? styles.active : ""}`}
              onClick={() => setRole("employer")}
              disabled={loading}
            >
              <div className={styles.roleIcon}>🏢</div>
              <div className={styles.roleText}>
                <strong>Nhà tuyển dụng</strong>
                <small>Đăng tin tuyển dụng</small>
              </div>
            </button>
          </div>
        </div>

        {/* Full name */}
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Nhập họ tên"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Gender Selection */}
        <div className={styles.genderSelection}>
          <label className={styles.genderLabel}>Giới tính:</label>
          <div className={styles.genderButtons}>
            <button
              type="button"
              className={`${styles.genderBtn} ${gender === "male" ? styles.active : ""}`}
              onClick={() => setGender("male")}
              disabled={loading}
            >
              <span className={styles.genderIcon}>♂</span>
              Nam
            </button>
            <button
              type="button"
              className={`${styles.genderBtn} ${gender === "female" ? styles.active : ""}`}
              onClick={() => setGender("female")}
              disabled={loading}
            >
              <span className={styles.genderIcon}>♀</span>
              Nữ
            </button>
            <button
              type="button"
              className={`${styles.genderBtn} ${gender === "other" ? styles.active : ""}`}
              onClick={() => setGender("other")}
              disabled={loading}
            >
              <span className={styles.genderIcon}>⚧</span>
              Khác
            </button>
          </div>
        </div>

        {/* Password */}
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Confirm */}
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </button>

        <div className={styles.orLine}>Hoặc đăng nhập bằng</div>

        <div className={styles.socialButtons}>
          <button
            type="button"
            className={styles.google}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle /> Google
          </button>
        </div>

        <p className={styles.switchLine}>
          Bạn đã có tài khoản?
          <span onClick={() => !loading && navigate("/login")}> Đăng nhập ngay</span>
        </p>
      </form>
    </div>
  );
}
