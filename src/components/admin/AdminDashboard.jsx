import { useEffect, useState } from "react";
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

  const quickActions = [
    { title: "Students", desc: "Manage admissions and records", icon: "👨‍🎓", path: "/admin/students" },
    { title: "Courses", desc: "Create coaching programs", icon: "📚", path: "/admin/courses" },
    { title: "Batches", desc: "Manage timings and teachers", icon: "🕒", path: "/admin/batches" },
    { title: "Attendance", desc: "Mark daily attendance", icon: "✅", path: "/admin/attendance" },
    { title: "Payments", desc: "Track fees and collections", icon: "💳", path: "/admin/payments" },
  ];

  return (
    <AdminPageLayout
      title={`Welcome back, ${adminName}`}
      subtitle={adminEmail}
    >
      <div className="dashboard-hero">
        <div>
          <p>Institute Control Center</p>
          <h2>Manage your coaching operations from one premium dashboard.</h2>
        </div>
        <span>Live Analytics</span>
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