import styles from "./AdminDashboard.module.scss";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.mainContent}>
        THIS IS ADMIN DASHBOARD
        <Outlet />
      </div>
    </div>
  );
}
