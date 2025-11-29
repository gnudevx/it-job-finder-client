import { useEffect, useState } from "react";
import styles from "./ManageEmployers.module.scss";
import adminService from "@/services/adminService";

export default function ManageEmployers() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployers = async () => {
      const token = localStorage.getItem("authToken"); // token sau login
      try {
        const data = await adminService.AllEmployers(token); // trả trực tiếp data từ axiosClient
        if (data.success) {
          setEmployers(data.data);
        } else {
          console.error("API error:", data.message || "Unknown error");
        }
      } catch (error) {
        if (error.response) {
          console.error("API error response:", error.response.data);
        } else {
          console.error("Error loading employers:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quản Lý Employer</h1>

      <div className={styles.box}>
        {loading ? (
          <p>Đang tải danh sách nhà tuyển dụng...</p>
        ) : employers.length === 0 ? (
          <p>Không có nhà tuyển dụng nào.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Phone</th>
                <th>Địa chỉ</th>
                <th>Avatar</th>
                <th>Ngày tham gia</th>
                <th>Công ty</th>
              </tr>
            </thead>

            <tbody>
              {employers.map((e) => (
                <tr key={e._id}>
                  <td>{e.fullName}</td>
                  <td>{e.phone || "—"}</td>
                  <td>{e.address || "—"}</td>
                  <td>
                    {e.avatar ? (
                      <img
                        src={e.avatar}
                        alt={e.fullName}
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{new Date(e.createdAt).toLocaleString("vi-VN")}</td>
                  <td>{e.companyId?.name || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
