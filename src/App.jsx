import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/public/Home";
import Batches from "./pages/Batches";

import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Payments from "./pages/Payments";

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
      <Route path="/" element={<Home />} />

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/student-login" element={<StudentLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdmin>
            <AdminDashboard />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/admin/students"
        element={
          <ProtectedAdmin>
            <Students />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/admin/courses"
        element={
          <ProtectedAdmin>
            <Courses />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/admin/attendance"
        element={
          <ProtectedAdmin>
            <Attendance />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/admin/payments"
        element={
          <ProtectedAdmin>
            <Payments />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedStudent>
            <StudentDashboard />
          </ProtectedStudent>
        }
      />
      <Route
      path="/admin/batches"
      element={
        <ProtectedAdmin>
          <Batches />
        </ProtectedAdmin>
      }
    />
    </Routes>
  );
}