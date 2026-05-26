import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/public/Home";

import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

function ProtectedAdmin({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "OWNER") {
    return <Navigate to="/admin-login" />;
  }

  return children;
}

function ProtectedStudent({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "STUDENT") {
    return <Navigate to="/student-login" />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* PUBLIC WEBSITE */}
      <Route path="/" element={<Home />} />

      {/* LOGIN */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/student-login" element={<StudentLogin />} />

      {/* ADMIN */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdmin>
            <AdminDashboard />
          </ProtectedAdmin>
        }
      />

      {/* STUDENT */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedStudent>
            <StudentDashboard />
          </ProtectedStudent>
        }
      />
    </Routes>
  );
}