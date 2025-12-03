import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import { Users, FileText, CheckCircle, AlertCircle } from "lucide-react";
import styles from "./AdminDashboard.module.scss";
import PropTypes from "prop-types";
const data = [
  { name: 'T2', jobs: 40, users: 24 },
  { name: 'T3', jobs: 30, users: 13 },
  { name: 'T4', jobs: 20, users: 98 },
  { name: 'T5', jobs: 27, users: 39 },
  { name: 'T6', jobs: 18, users: 48 },
  { name: 'T7', jobs: 23, users: 38 },
  { name: 'CN', jobs: 34, users: 43 },
];
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
StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
};

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Tổng Quan Dashboard</h1>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard title="Tổng Tin Tuyển Dụng" value="1,234" icon={FileText} color={styles.bgBlue} />
        <StatCard title="Nhà Tuyển Dụng Mới" value="56" icon={Users} color={styles.bgGreen} />
        <StatCard title="Hồ Sơ Chờ Duyệt" value="12" icon={AlertCircle} color={styles.bgYellow} />
        <StatCard title="Doanh Nghiệp Đã Xác Thực" value="892" icon={CheckCircle} color={styles.bgPurple} />
      </div>

      {/* Charts */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Thống Kê Tin Đăng (7 ngày qua)</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e5e7eb' }} cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="jobs" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Tăng Trưởng Người Dùng</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e5e7eb' }} />
                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
