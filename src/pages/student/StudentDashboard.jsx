import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "";

  const [student, setStudent] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/student/account/profile/${username}`);
      setStudent(res.data);
    } catch (err) {
      console.log("Student profile error:", err);
    }
  };

  useEffect(() => {
    fetchStudent();
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
        username,
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

  return (
    <div className="student-dashboard-page">
      <div className="top-actions">
        <button className="premium-home-btn" onClick={() => navigate("/")}>
          🏠 Home
        </button>

        <button className="premium-logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>

      <div className="student-hero">
        <h1>Welcome, {student?.name || "Student"}</h1>
        <p>Your complete academic, batch and fee details in one place.</p>
      </div>

      <section className="student-section">
        <h2>👤 Student Profile</h2>

        <div className="student-info-row">
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

      <section className="student-section">
        <h2>📚 Course & Batch Details</h2>

        <div className="student-info-row">
          <div>
            <span>Course</span>
            <strong>{student?.course?.courseName || "N/A"}</strong>
          </div>

          <div>
            <span>Batch</span>
            <strong>{student?.batch?.batchName || "N/A"}</strong>
          </div>

          <div>
            <span>Timing</span>
            <strong>{student?.batch?.timing || "N/A"}</strong>
          </div>

          <div>
            <span>Teacher</span>
            <strong>{student?.batch?.teacherName || "N/A"}</strong>
          </div>
        </div>
      </section>

      <section className="student-section">
        <h2>💰 Fees Details</h2>

        <div className="student-info-row">
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

      <section className="student-section">
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

          <button>Update Password</button>
        </form>
      </section>
    </div>
  );
}