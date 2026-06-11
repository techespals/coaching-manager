import { useEffect, useState } from "react";
import api from "../../api";
import AdminPageLayout from "./AdminPageLayout";
import "./Attendance.css";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});

  const fetchStudents = async () => {
    try {
      const res = await api.get("/owner/students");
      setStudents(res.data);
    } catch (err) {
      console.log("Students fetch error:", err.response?.data);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/owner/attendance");
      setAttendance(res.data);
    } catch (err) {
      console.log("Attendance fetch error:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const saveAttendance = async () => {
    try {
      for (const student of students) {
        await api.post("/owner/attendance", {
          studentId: student.id,
          status: attendanceMap[student.id] ? "PRESENT" : "ABSENT",
        });
      }

      fetchAttendance();
    } catch (err) {
      console.log("Save attendance error:", err.response?.data);
      alert("Attendance save nahi hui");
    }
  };

  const presentCount = Object.values(attendanceMap).filter(Boolean).length;
  const absentCount = students.length - presentCount;

  return (
    <AdminPageLayout
      title="Attendance Management"
      subtitle="Mark daily attendance and track saved attendance records."
    >
      <div className="attendance-stats-row">
        <div className="attendance-stat-card">
          <p>Total Students</p>
          <h2>{students.length}</h2>
        </div>

        <div className="attendance-stat-card present">
          <p>Present Selected</p>
          <h2>{presentCount}</h2>
        </div>

        <div className="attendance-stat-card absent">
          <p>Absent Selected</p>
          <h2>{absentCount}</h2>
        </div>

        <div className="attendance-stat-card">
          <p>Saved Records</p>
          <h2>{attendance.length}</h2>
        </div>
      </div>

      <div className="attendance-table-card">
        <div className="table-header">
          <div>
            <h2>Mark Today Attendance</h2>
            <p>Select present students and save attendance for today.</p>
          </div>

          <button type="button" className="primary-action" onClick={saveAttendance}>
            Save Attendance
          </button>
        </div>

        <table className="premium-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Present</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.course?.courseName || "N/A"}</td>
                <td>{s.batch?.batchName || "N/A"}</td>
                <td>
                  <label className="toggle-check">
                    <input
                      type="checkbox"
                      checked={attendanceMap[s.id] || false}
                      onChange={(e) =>
                        setAttendanceMap({
                          ...attendanceMap,
                          [s.id]: e.target.checked,
                        })
                      }
                    />
                    <span></span>
                  </label>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td colSpan="6">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminPageLayout>
  );
}