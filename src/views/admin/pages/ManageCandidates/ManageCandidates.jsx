import { useEffect, useState } from "react";
import styles from "./ManageCandidates.module.scss";
import adminService from "@/services/adminService";

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      const token = localStorage.getItem("authToken"); // token sau login
      try {
        const data = await adminService.AllCandidates(token);

        if (data.success) {
          setCandidates(data.data);
        } else {
          console.error("API error:", data.message);
        }
      } catch (error) {
        console.error("Error loading candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quản Lý Candidate</h1>

      <div className={styles.box}>
        {loading ? (
          <p>Đang tải danh sách ứng viên...</p>
        ) : candidates.length === 0 ? (
          <p>Không có ứng viên nào.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Địa chỉ</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Avatar</th>
                <th>Ngày tham gia</th>
                <th>Cập nhật gần nhất</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((c) => (
                <tr key={c._id}>
                  <td>{c.fullName}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                  <td>{c.birthday ? new Date(c.birthday).toLocaleDateString("vi-VN") : "—"}</td>
                  <td>
                    {c.gender === "male"
                      ? "Nam"
                      : c.gender === "female"
                      ? "Nữ"
                      : "Khác"}
                  </td>
                  <td>
                    {c.avatar ? (
                      <img
                        src={c.avatar}
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{new Date(c.createdAt).toLocaleString("vi-VN")}</td>
                  <td>{new Date(c.updatedAt).toLocaleString("vi-VN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
