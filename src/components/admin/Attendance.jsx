import { useEffect, useState } from "react";
import api from "../../api";
import AdminPageLayout from "./AdminPageLayout";
import "./Attendance.css";

export default function Attendance() {
  const today = new Date().toISOString().split("T")[0];

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [savedAttendance, setSavedAttendance] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});

  const [filters, setFilters] = useState({
    courseId: "",
    batchId: "",
    date: today,
  });

  const fetchInitialData = async () => {
    try {
      const studentsRes = await api.get("/owner/students");
      const coursesRes = await api.get("/owner/courses");
      const batchesRes = await api.get("/owner/batches");

      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
      setBatches(batchesRes.data);
    } catch (err) {
      console.log("Attendance data fetch error:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const filteredBatches = batches.filter(
    (b) => String(b.course?.id) === String(filters.courseId)
  );

  const filteredStudents = students.filter(
    (s) => String(s.batch?.id) === String(filters.batchId)
  );

  const fetchSavedAttendance = async (batchId = filters.batchId, date = filters.date) => {
    if (!batchId || !date) return;

    try {
      const res = await api.get(`/owner/attendance/batch/${batchId}?date=${date}`);
      setSavedAttendance(res.data);

      const existingMap = {};
      res.data.forEach((a) => {
        existingMap[a.student?.id] = a.status === "PRESENT";
      });

      setAttendanceMap(existingMap);
    } catch (err) {
      console.log("Saved attendance fetch error:", err.response?.data);
    }
  };

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;

    const updatedFilters = {
      ...filters,
      [name]: value,
    };

    if (name === "courseId") {
      updatedFilters.batchId = "";
      setSavedAttendance([]);
      setAttendanceMap({});
    }

    setFilters(updatedFilters);

    if (name === "batchId" && value) {
      fetchSavedAttendance(value, updatedFilters.date);
    }

    if (name === "date" && updatedFilters.batchId) {
      fetchSavedAttendance(updatedFilters.batchId, value);
    }
  };

  const saveAttendance = async () => {
    if (!filters.batchId) {
      alert("Please select a batch first");
      return;
    }

    if (filteredStudents.length === 0) {
      alert("No students found in this batch");
      return;
    }

    try {
      const payload = filteredStudents.map((student) => ({
        studentId: student.id,
        batchId: Number(filters.batchId),
        date: filters.date,
        status: attendanceMap[student.id] ? "PRESENT" : "ABSENT",
      }));

      await api.post("/owner/attendance/bulk", payload);

      fetchSavedAttendance(filters.batchId, filters.date);
    } catch (err) {
      console.log("Bulk attendance save error:", err.response?.data);
      alert("Attendance save nahi hui");
    }
  };

  const presentCount = filteredStudents.filter((s) => attendanceMap[s.id]).length;
  const absentCount = filteredStudents.length - presentCount;

  return (
    <AdminPageLayout
      title="Attendance Management"
      subtitle="Select course and batch to mark daily attendance."
    >
      <div className="attendance-filter-card">
        <div className="section-title">
          <h2>Attendance Filters</h2>
          <p>Select course, batch and date before marking attendance.</p>
        </div>

        <div className="attendance-filter-grid">
          <select
            name="courseId"
            value={filters.courseId}
            onChange={handleFilterChange}
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.courseName}
              </option>
            ))}
          </select>

          <select
            name="batchId"
            value={filters.batchId}
            onChange={handleFilterChange}
            disabled={!filters.courseId}
          >
            <option value="">Select Batch</option>
            {filteredBatches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.batchName} - {b.timing}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />

          <button type="button" className="primary-action" onClick={saveAttendance}>
            Save Attendance
          </button>
        </div>
      </div>

      <div className="attendance-stats-row">
        <div className="attendance-stat-card">
          <p>Batch Students</p>
          <h2>{filteredStudents.length}</h2>
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
          <h2>{savedAttendance.length}</h2>
        </div>
      </div>

      <div className="attendance-table-card">
        <div className="table-header">
          <div>
            <h2>Mark Batch Attendance</h2>
            <p>
              {filters.batchId
                ? "Toggle present students and save attendance."
                : "Please select a course and batch to view students."}
            </p>
          </div>
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
            {filteredStudents.map((s) => (
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

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="6">No students found for selected batch</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminPageLayout>
  );
}