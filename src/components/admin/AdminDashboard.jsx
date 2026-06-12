import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import AdminPageLayout from "./AdminPageLayout";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalBatches: 0,
    totalCollection: 0,
    todayCollection: 0,
    pendingFees: 0,
    pendingStudents: 0,
    todayPresent: 0,
    todayAbsent: 0,
    todayAttendancePercentage: 0,
    monthlyCollection: {},
    latestStudents: [],
    latestPayments: [],
  });

  const adminName = localStorage.getItem("name") || "Admin";
  const adminEmail = localStorage.getItem("email") || "";

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/owner/dashboard");
      setDashboard(res.data);
    } catch (err) {
      console.log("Dashboard error:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const monthlyData = useMemo(() => {
    return Object.entries(dashboard.monthlyCollection || {});
  }, [dashboard.monthlyCollection]);

  const maxCollection = Math.max(
    ...monthlyData.map(([, amount]) => Number(amount || 0)),
    1
  );

  const quickActions = [
    { title: "Students", desc: "Manage admissions", icon: "👨‍🎓", path: "/admin/students" },
    { title: "Courses", desc: "Create programs", icon: "📚", path: "/admin/courses" },
    { title: "Batches", desc: "Manage timings", icon: "🕒", path: "/admin/batches" },
    { title: "Attendance", desc: "Mark attendance", icon: "✅", path: "/admin/attendance" },
    { title: "Payments", desc: "Track fees", icon: "💳", path: "/admin/payments" },
  ];

  return (
    <AdminPageLayout title={`Welcome back, ${adminName}`} subtitle={adminEmail}>
      <div className="dashboard-hero">
        <div>
          <p>Institute Control Center</p>
          <h2>Manage students, fees, batches, attendance and analytics from one dashboard.</h2>
        </div>

        <div className="hero-attendance">
          <h3>{Number(dashboard.todayAttendancePercentage || 0).toFixed(0)}%</h3>
          <span>Today's Attendance</span>
        </div>
      </div>

      <div className="dashboard-stats-grid">
        <div className="dash-stat-card">
          <p>Total Students</p>
          <h2>{dashboard.totalStudents}</h2>
        </div>

        <div className="dash-stat-card">
          <p>Total Courses</p>
          <h2>{dashboard.totalCourses}</h2>
        </div>

        <div className="dash-stat-card">
          <p>Total Batches</p>
          <h2>{dashboard.totalBatches}</h2>
        </div>

        <div className="dash-stat-card collection">
          <p>Total Collection</p>
          <h2>₹{dashboard.totalCollection}</h2>
        </div>

        <div className="dash-stat-card today">
          <p>Today Collection</p>
          <h2>₹{dashboard.todayCollection}</h2>
        </div>

        <div className="dash-stat-card warning">
          <p>Pending Fees</p>
          <h2>₹{dashboard.pendingFees}</h2>
        </div>

        <div className="dash-stat-card warning">
          <p>Pending Students</p>
          <h2>{dashboard.pendingStudents}</h2>
        </div>

        <div className="dash-stat-card attendance">
          <p>Today Present / Absent</p>
          <h2>
            {dashboard.todayPresent} / {dashboard.todayAbsent}
          </h2>
        </div>
      </div>

      <div className="dashboard-analytics-grid">
        <div className="analytics-card large">
          <div className="analytics-header">
            <div>
              <h2>Monthly Collection</h2>
              <p>Fee collection trend across the year.</p>
            </div>
          </div>

          <div className="bar-chart">
            {monthlyData.map(([month, amount]) => {
              const height = (Number(amount || 0) / maxCollection) * 100;

              return (
                <div className="bar-item" key={month}>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ height: `${height}%` }}></div>
                  </div>
                  <span>{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="analytics-card">
          <h2>Attendance Overview</h2>

          <div className="attendance-meter">
            <h3>{Number(dashboard.todayAttendancePercentage || 0).toFixed(0)}%</h3>
            <p>Today Attendance</p>
          </div>

          <div className="attendance-mini">
            <div>
              <span>Present</span>
              <strong>{dashboard.todayPresent}</strong>
            </div>

            <div>
              <span>Absent</span>
              <strong>{dashboard.todayAbsent}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>

        <div className="dashboard-actions-grid">
          {quickActions.map((item) => (
            <div
              key={item.title}
              className="dashboard-action-card"
              onClick={() => navigate(item.path)}
            >
              <div className="action-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-bottom-grid">
        <div className="dashboard-table-card">
          <h2>Recent Students</h2>

          {dashboard.latestStudents?.length === 0 ? (
            <p className="empty-text">No recent students</p>
          ) : (
            dashboard.latestStudents?.map((s) => (
              <div className="mini-row" key={s.id}>
                <div>
                  <h4>{s.name}</h4>
                  <p>{s.phone}</p>
                </div>
                <span>₹{s.remainingFees}</span>
              </div>
            ))
          )}
        </div>

        <div className="dashboard-table-card">
          <h2>Recent Payments</h2>

          {dashboard.latestPayments?.length === 0 ? (
            <p className="empty-text">No recent payments</p>
          ) : (
            dashboard.latestPayments?.map((p) => (
              <div className="mini-row" key={p.id}>
                <div>
                  <h4>{p.student?.name || "Student"}</h4>
                  <p>{p.paymentDate}</p>
                </div>
                <span>₹{p.amount}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminPageLayout>
  );
}