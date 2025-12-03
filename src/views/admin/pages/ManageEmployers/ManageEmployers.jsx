import React, { useState } from "react";
import { LicenseStatus } from "../ManageBusinessLicense/LicenseStatus.jsx";
import { Edit2, ShieldCheck, ShieldAlert, Save } from "lucide-react";
import styles from "./ManageEmployers.module.scss";

const mockEmployers = [
  { id: "101", name: "Nguyen Van A", email: "hr@techcorp.com", companyName: "Tech Corp", postLimit: 10, postsUsed: 8, licenseStatus: LicenseStatus.VERIFIED },
  { id: "102", name: "Tran Thi B", email: "b@realestate.vn", companyName: "Real Estate VN", postLimit: 5, postsUsed: 2, licenseStatus: LicenseStatus.VERIFIED },
  { id: "103", name: "Le Van C", email: "c@startup.io", companyName: "Startup IO", postLimit: 3, postsUsed: 3, licenseStatus: LicenseStatus.PENDING },
];

const ManageEmployers = () => {
  const [employers, setEmployers] = useState(mockEmployers);
  const [editingId, setEditingId] = useState(null);
  const [tempLimit, setTempLimit] = useState(0);

  const startEditing = (emp) => {
    setEditingId(emp.id);
    setTempLimit(emp.postLimit);
  };

  const saveLimit = (id) => {
    setEmployers((prev) =>
      prev.map((e) => (e.id === id ? { ...e, postLimit: tempLimit } : e))
    );
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      {/* --- Header --- */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản Lý Nhà Tuyển Dụng</h1>
          <p className={styles.subTitle}>
            Kiểm soát danh sách và giới hạn đăng tin của nhà tuyển dụng.
          </p>
        </div>

        {/* <div className={styles.tipBox}>
          Tip: Thay đổi "Giới hạn tin" để kiểm soát số lượng tin đăng của từng NTD.
        </div> */}
      </div>

      {/* --- Table --- */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tên Công Ty</th>
              <th>Email</th>
              <th className={styles.center}>Xác thực</th>
              <th className={styles.center}>Đã dùng / Giới hạn</th>
              <th className={styles.right}>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {employers.map((emp) => (
              <tr key={emp.id} className={styles.row}>
                <td>
                  <span className={styles.company}>{emp.companyName}</span>
                  <div className={styles.small}>{emp.name}</div>
                </td>

                <td>{emp.email}</td>

                <td className={styles.center}>
                  {emp.licenseStatus === LicenseStatus.VERIFIED ? (
                    <ShieldCheck className={styles.iconGreen} size={20} />
                  ) : (
                    <ShieldAlert className={styles.iconYellow} size={20} />
                  )}
                </td>

                <td className={styles.center}>
                  {editingId === emp.id ? (
                    <div className={styles.editBox}>
                      <span className={styles.small}>{emp.postsUsed} /</span>

                      <input
                        type="number"
                        value={tempLimit}
                        onChange={(e) =>
                          setTempLimit(Number(e.target.value))
                        }
                        className={styles.input}
                        min={emp.postsUsed}
                      />
                    </div>
                  ) : (
                    <span
                      className={`${styles.limitText} ${emp.postsUsed >= emp.postLimit ? styles.textRed : ""
                        }`}
                    >
                      {emp.postsUsed} / {emp.postLimit}
                    </span>
                  )}
                </td>

                <td className={styles.right}>
                  {editingId === emp.id ? (
                    <button
                      onClick={() => saveLimit(emp.id)}
                      className={styles.saveBtn}
                    >
                      <Save size={16} /> Lưu
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(emp)}
                      className={styles.editBtn}
                    >
                      <Edit2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageEmployers;
