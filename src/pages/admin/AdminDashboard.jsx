import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    batches: 0,
    pendingFees: 0,
  });

  const fetchStats = async () => {
    try {
      const studentsRes = await api.get("/owner/students");
      const coursesRes = await api.get("/owner/courses");
      const batchesRes = await api.get("/owner/batches");

      const pendingFees = studentsRes.data.reduce(
        (sum, s) => sum + Number(s.remainingFees || 0),
        0
      );

      setStats({
        students: studentsRes.data.length,
        courses: coursesRes.data.length,
        batches: batchesRes.data.length,
        pendingFees,
      });
    } catch (err) {
      console.log("Dashboard stats error:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="top-actions">
        <button className="premium-home-btn" onClick={() => navigate("/")}>
          🏠 Home
        </button>

        <button className="premium-logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>

      <h1>Admin Dashboard</h1>

      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Students</h3>
          <h2>{stats.students}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Courses</h3>
          <h2>{stats.courses}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Batches</h3>
          <h2>{stats.batches}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending Fees</h3>
          <h2>₹{stats.pendingFees}</h2>
        </div>
      </div>

      <div className="grid">
        <div className="box" onClick={() => navigate("/admin/students")}>
          <h2>Students</h2>
          <p>Manage students</p>
        </div>

        <div className="box" onClick={() => navigate("/admin/courses")}>
          <h2>Courses</h2>
          <p>Manage courses</p>
        </div>

        <div className="box" onClick={() => navigate("/admin/attendance")}>
          <h2>Attendance</h2>
          <p>Track attendance</p>
        </div>

        <div className="box" onClick={() => navigate("/admin/payments")}>
          <h2>Payments</h2>
          <p>Track fee collection</p>
        </div>

        <div className="box" onClick={() => navigate("/admin/batches")}>
          <h2>Batches</h2>
          <p>Manage batches</p>
        </div>
      </div>
    </div>
  );
}