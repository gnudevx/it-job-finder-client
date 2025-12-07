import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import { Users, FileText, CheckCircle, AlertCircle } from "lucide-react";
import styles from "./AdminDashboard.module.scss";
import { dashboardService } from "@api/dashboard.service";
import PropTypes from "prop-types";

// Component small card
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardValue}>{value}</p>
      </div>
      <div className={`${styles.iconBox} ${color}`}>
        <Icon size={24} className={styles.icon} />
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [jobStats, setJobStats] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [employerStats, setEmployerStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const [summaryRes, jobRes, userRes, employerRes] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getJobStats(),
        dashboardService.getUserGrowth(),
        dashboardService.getEmployerStats(),
      ]);

      setSummary(summaryRes.data);
      setJobStats(jobRes.data);
      setUserGrowth(userRes.data);
      setEmployerStats(employerRes.data);

    } catch (err) {
      console.error("Dashboard API error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Tổng Quan Dashboard</h1>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard title="Tổng Tin Tuyển Dụng" value={summary.totalJobs} icon={FileText} color={styles.bgBlue} />
        <StatCard title="Nhà Tuyển Dụng Mới" value={employerStats.newEmployers} icon={Users} color={styles.bgGreen} />
        <StatCard title="Hồ Sơ Chờ Duyệt" value={employerStats.pendingApproval} icon={AlertCircle} color={styles.bgYellow} />
        <StatCard title="Doanh Nghiệp Đã Xác Thực" value={employerStats.verifiedCompanies} icon={CheckCircle} color={styles.bgPurple} />
      </div>

      {/* Charts */}
      <div className={styles.chartsGrid}>
        {/* JOB STATS */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Thống Kê Tin Đăng (7 ngày qua)</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: "#6b7280" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280" }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* USER GROWTH */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Tăng Trưởng Người Dùng</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: "#6b7280" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280" }} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
};
