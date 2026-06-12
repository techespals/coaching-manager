import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/student/dashboard");
      setDashboard(res.data);
    } catch (err) {
      console.log("Student dashboard error:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      await api.put("/student/account/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      alert("Password changed successfully");

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      alert("Current password wrong or request failed");
    }
  };

  const student = dashboard?.student;
  const course = student?.course;
  const batch = student?.batch;

  return (
    <div className="student-dashboard-page">
      <div className="student-topbar">
        <div>
          <h2>TechEspals</h2>
          <span>Student Portal</span>
        </div>

        <div className="student-top-actions">
          <button onClick={() => navigate("/")}>🏠 Home</button>
          <button className="logout" onClick={logout}>🚪 Logout</button>
        </div>
      </div>

      <div className="student-hero">
        <div>
          <p>Welcome back</p>
          <h1>{student?.name || "Student"}</h1>
          <span>Your complete academic, attendance and fee details.</span>
        </div>

        <div className="attendance-circle">
          <h2>{dashboard?.attendancePercentage?.toFixed(0) || 0}%</h2>
          <p>Attendance</p>
        </div>
      </div>

      <div className="student-stats-grid">
        <div className="student-stat-card">
          <p>Current Course</p>
          <h2>{course?.courseName || "N/A"}</h2>
        </div>

        <div className="student-stat-card">
          <p>Current Batch</p>
          <h2>{batch?.batchName || "N/A"}</h2>
        </div>

        <div className="student-stat-card warning">
          <p>Pending Fees</p>
          <h2>₹{student?.remainingFees || 0}</h2>
        </div>

        <div className="student-stat-card success">
          <p>Fee Status</p>
          <h2>{student?.feeStatus || "N/A"}</h2>
        </div>
      </div>

      <div className="student-grid-two">
        <section className="student-section-card">
          <h2>👤 Student Profile</h2>

          <div className="student-info-grid">
            <div>
              <span>Name</span>
              <strong>{student?.name || "N/A"}</strong>
            </div>

            <div>
              <span>Mobile</span>
              <strong>{student?.phone || "N/A"}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{student?.email || "N/A"}</strong>
            </div>

            <div>
              <span>Parent Phone</span>
              <strong>{student?.parentPhone || "N/A"}</strong>
            </div>
          </div>
        </section>

        <section className="student-section-card">
          <h2>📚 Course & Batch</h2>

          <div className="student-info-grid">
            <div>
              <span>Course</span>
              <strong>{course?.courseName || "N/A"}</strong>
            </div>

            <div>
              <span>Duration</span>
              <strong>{course?.duration || "N/A"}</strong>
            </div>

            <div>
              <span>Batch</span>
              <strong>{batch?.batchName || "N/A"}</strong>
            </div>

            <div>
              <span>Timing</span>
              <strong>{batch?.timing || "N/A"}</strong>
            </div>

            <div>
              <span>Teacher</span>
              <strong>{batch?.teacherName || "N/A"}</strong>
            </div>
          </div>
        </section>
      </div>

      <div className="student-grid-two">
        <section className="student-section-card">
          <h2>💰 Fee Summary</h2>

          <div className="fee-progress">
            <div
              style={{
                width: `${
                  student?.totalFees
                    ? Math.min((student?.paidFees / student?.totalFees) * 100, 100)
                    : 0
                }%`,
              }}
            ></div>
          </div>

          <div className="student-info-grid">
            <div>
              <span>Total Fees</span>
              <strong>₹{student?.totalFees || 0}</strong>
            </div>

            <div>
              <span>Paid Fees</span>
              <strong>₹{student?.paidFees || 0}</strong>
            </div>

            <div>
              <span>Pending Fees</span>
              <strong>₹{student?.remainingFees || 0}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{student?.feeStatus || "N/A"}</strong>
            </div>
          </div>
        </section>

        <section className="student-section-card">
          <h2>✅ Attendance Summary</h2>

          <div className="student-info-grid">
            <div>
              <span>Total Records</span>
              <strong>{dashboard?.totalAttendance || 0}</strong>
            </div>

            <div>
              <span>Present Days</span>
              <strong>{dashboard?.presentDays || 0}</strong>
            </div>

            <div>
              <span>Absent Days</span>
              <strong>{dashboard?.absentDays || 0}</strong>
            </div>

            <div>
              <span>Attendance %</span>
              <strong>{dashboard?.attendancePercentage?.toFixed(1) || 0}%</strong>
            </div>
          </div>
        </section>
      </div>

      <div className="student-grid-two">
        <section className="student-section-card">
          <h2>💳 Recent Payments</h2>

          {dashboard?.recentPayments?.length === 0 ? (
            <p className="student-empty">No recent payments found.</p>
          ) : (
            dashboard?.recentPayments?.map((p) => (
              <div className="student-payment-row" key={p.id}>
                <div>
                  <strong>₹{p.amount}</strong>
                  <span>{p.paymentMode}</span>
                </div>
                <p>{p.paymentDate}</p>
              </div>
            ))
          )}
        </section>

        <section className="student-section-card">
          <h2>🔐 Change Password</h2>

          <form className="student-password-form" onSubmit={changePassword}>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordForm.currentPassword}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordForm.newPassword}
              onChange={handleChange}
              required
            />

            <button type="submit">Update Password</button>
          </form>
        </section>
      </div>
    </div>
  );
}