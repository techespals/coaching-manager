import { useEffect, useState } from "react";
import api from "../../api";
import AdminPageLayout from "./AdminPageLayout";
import "./Batches.css";

export default function Batches() {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    batchName: "",
    courseId: "",
    startTime: "",
    endTime: "",
    capacity: "",
    teacherName: "",
  });

  const fetchBatches = async () => {
    try {
      const res = await api.get("/owner/batches");
      setBatches(res.data);
    } catch (err) {
      console.log("Batch fetch error:", err.response?.data);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get("/owner/courses");
      setCourses(res.data);
    } catch (err) {
      console.log("Course fetch error:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchBatches();
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addBatch = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/owner/batches/${form.courseId}`, {
        batchName: form.batchName,
        timing: `${form.startTime} - ${form.endTime}`,
        capacity: Number(form.capacity),
        teacherName: form.teacherName,
      });

      setForm({
        batchName: "",
        courseId: "",
        startTime: "",
        endTime: "",
        capacity: "",
        teacherName: "",
      });

      fetchBatches();
    } catch (err) {
      console.log("Add batch error:", err.response?.data);
      alert("Batch add nahi hua. Course select hai ya nahi check karo.");
    }
  };

  const deleteBatch = async (id) => {
    if (!window.confirm("Delete Batch?")) return;

    try {
      await api.delete(`/owner/batches/${id}`);
      fetchBatches();
    } catch (err) {
      console.log("Delete batch error:", err.response?.data);
      alert("Batch delete nahi hua");
    }
  };

  return (
    <AdminPageLayout
      title="Batch Management"
      subtitle="Create and manage batches with course, timing and teacher."
    >
      <div className="batch-overview-grid">
        <div className="batch-form-card">
          <div className="section-title">
            <h2>Add New Batch</h2>
            <p>Assign a batch to a course with timing and teacher details.</p>
          </div>

          <form onSubmit={addBatch}>
            <div className="batch-form-grid">
              <input
                name="batchName"
                placeholder="Batch Name"
                value={form.batchName}
                onChange={handleChange}
                required
              />

              <select
                name="courseId"
                value={form.courseId}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>

                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.courseName}
                  </option>
                ))}
              </select>

              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                required
              />

              <input
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                required
              />

              <input
                name="teacherName"
                placeholder="Teacher Name"
                value={form.teacherName}
                onChange={handleChange}
                required
              />

              <input
                name="capacity"
                type="number"
                placeholder="Batch Capacity"
                value={form.capacity}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="primary-action">
              Add Batch
            </button>
          </form>
        </div>

        <div className="batch-summary-card">
          <p>Total Batches</p>
          <h2>{batches.length}</h2>
          <span>Running batches in this institute</span>
        </div>
      </div>

      <div className="batch-table-card">
        <div className="table-header">
          <div>
            <h2>All Batches</h2>
            <p>Course-wise batch records with teacher and capacity.</p>
          </div>
        </div>

        <table className="premium-table">
          <thead>
            <tr>
              <th>Batch</th>
              <th>Course</th>
              <th>Timing</th>
              <th>Teacher</th>
              <th>Capacity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {batches.map((batch) => (
              <tr key={batch.id}>
                <td>{batch.batchName}</td>
                <td>{batch.course?.courseName || "N/A"}</td>
                <td>{batch.timing}</td>
                <td>{batch.teacherName}</td>
                <td>{batch.capacity}</td>

                <td>
                  <button
                    type="button"
                    className="danger-action"
                    onClick={() => deleteBatch(batch.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {batches.length === 0 && (
              <tr>
                <td colSpan="6">No batches found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminPageLayout>
  );
}