import { useEffect, useState } from "react";
import styles from "./ManageCandidates.module.scss";
import adminService from "@/api/adminService";

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await adminService.AllCandidates();
      if (res.success) {
        setCandidates(res.data);
      }
    } catch (err) {
      console.error("Error loading candidates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa ứng viên này?")) return;
    try {
      await adminService.DeleteCandidate(id);
      setCandidates(candidates.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting candidate:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quản Lý Candidate</h1>
      <button className={styles.addBtn} onClick={() => window.location.href="/admin/manage/candidates/add"}>
        Thêm Ứng Viên
      </button>

      <div className={styles.tableWrapper}>
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
                <th>Hành động</th>
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
                  <td>{c.gender === "male" ? "Nam" : c.gender === "female" ? "Nữ" : "Khác"}</td>
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
                  <td>
                    <div className={styles.actionBtns}>
                      <button className={styles.editBtn} onClick={() => window.location.href=`/admin/manage/candidates/${c._id}`}>
                        Sửa
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(c._id)}>
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
