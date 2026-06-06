import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Attendance() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});

  const fetchStudents = async () => {
    try {
      const res = await api.get("/owner/students");
      setStudents(res.data);
    } catch (err) {
      console.log("Students fetch error:", err);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/owner/attendance");
      setAttendance(res.data);
    } catch (err) {
      console.log("Attendance fetch error:", err);
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

      alert("Attendance Saved Successfully");
      fetchAttendance();
    } catch (err) {
      console.log("Save attendance error:", err);
      alert("Attendance save nahi hui");
    }
  };

  const presentCount = Object.values(attendanceMap).filter(Boolean).length;
  const absentCount = students.length - presentCount;

  return (
    <div className="admin-page">
      <div className="page-top">
        <div>
          <h1>Attendance Management</h1>
          <p>Check present students and save attendance.</p>
        </div>

        <button type="button" onClick={() => navigate("/admin/dashboard")}>
          Back Dashboard
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Students</h3>
          <h2>{students.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Present Selected</h3>
          <h2>{presentCount}</h2>
        </div>

        <div className="stat-card">
          <h3>Absent Selected</h3>
          <h2>{absentCount}</h2>
        </div>

        <div className="stat-card">
          <h3>Saved Records</h3>
          <h2>{attendance.length}</h2>
        </div>
      </div>

      <div className="table-card">
        <h2>Mark Today Attendance</h2>

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

        <button type="button" className="main-action" onClick={saveAttendance}>
          Save Attendance
        </button>
      </div>
    </div>
  );
}