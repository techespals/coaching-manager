import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    parentPhone: "",
    totalFees: "",
    paidFees: "",
    courseId: "",
    batchId: "",
  };

  const [form, setForm] = useState(emptyForm);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/owner/students");
      setStudents(res.data);
    } catch (err) {
      console.log("FETCH STUDENTS ERROR:", err.response?.status);
      console.log("DATA:", err.response?.data);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get("/owner/courses");
      setCourses(res.data);
    } catch (err) {
      console.log("FETCH COURSES ERROR:", err.response?.status);
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await api.get("/owner/batches");
      setBatches(res.data);
    } catch (err) {
      console.log("FETCH BATCHES ERROR:", err.response?.status);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchBatches();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const addStudent = async (e) => {
    e.preventDefault();

    try {
      await api.post("/owner/students", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        parentPhone: form.parentPhone,
        totalFees: Number(form.totalFees),
        paidFees: Number(form.paidFees),
        courseId: Number(form.courseId),
        batchId: Number(form.batchId),
      });

      alert("Student Added Successfully");
      resetForm();
      fetchStudents();
    } catch (err) {
      console.log("ADD STUDENT ERROR:", err.response?.status);
      console.log("DATA:", err.response?.data);
      alert("Student add nahi hua. Console check karo.");
    }
  };

  const editStudent = (student) => {
    setEditingId(student.id);

    setForm({
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      parentPhone: student.parentPhone || "",
      totalFees: student.totalFees || "",
      paidFees: student.paidFees || "",
      courseId: student.course?.id || "",
      batchId: student.batch?.id || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/owner/students/${editingId}`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        parentPhone: form.parentPhone,
        totalFees: Number(form.totalFees),
        paidFees: Number(form.paidFees),
        courseId: Number(form.courseId),
        batchId: Number(form.batchId),
      });

      alert("Student Updated Successfully");
      resetForm();
      fetchStudents();
    } catch (err) {
      console.log("UPDATE STUDENT ERROR:", err.response?.status);
      console.log("DATA:", err.response?.data);
      alert("Student update nahi hua");
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await api.delete(`/owner/students/${id}`);
      alert("Student Deleted Successfully");

      if (editingId === id) {
        resetForm();
      }

      fetchStudents();
    } catch (err) {
      console.log("DELETE STUDENT ERROR:", err.response?.status);
      console.log("DATA:", err.response?.data);
      alert("Student delete nahi hua");
    }
  };

  const showPendingFees = async () => {
    try {
      const res = await api.get("/owner/students");
      const pending = res.data.filter((s) => Number(s.remainingFees) > 0);
      setStudents(pending);
    } catch (err) {
      console.log("PENDING FEES ERROR:", err.response?.status);
    }
  };

  const totalPending = students.reduce(
    (sum, s) => sum + Number(s.remainingFees || 0),
    0
  );

  const filteredBatches = batches.filter(
  (b) => String(b.course?.id) === String(form.courseId)
);

  return (
    <div className="admin-page">
      <div className="page-top">
        <div>
          <h1>Students Management</h1>
          <p>Manage students, fees and pending payments.</p>
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
          <h3>Total Pending Fees</h3>
          <h2>₹{totalPending}</h2>
        </div>

        <div className="stat-card">
          <h3>Quick Action</h3>
          <button type="button" onClick={showPendingFees}>
            Show Pending Fees
          </button>
        </div>

        <div className="stat-card">
          <h3>View All</h3>
          <button type="button" onClick={fetchStudents}>
            All Students
          </button>
        </div>
      </div>

      <form
        className="student-form"
        onSubmit={editingId ? updateStudent : addStudent}
      >
        <h2>{editingId ? "Edit Student" : "Add New Student"}</h2>

        <div className="form-grid">
          <input
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Student Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Student Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="parentPhone"
            placeholder="Parent Phone"
            value={form.parentPhone}
            onChange={handleChange}
            required
          />

          <input
            name="totalFees"
            type="number"
            placeholder="Total Fees"
            value={form.totalFees}
            onChange={handleChange}
            required
          />

          <input
            name="paidFees"
            type="number"
            placeholder="Paid Fees"
            value={form.paidFees}
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

          <select
            name="batchId"
            value={form.batchId}
            onChange={handleChange}
            required
          >
            <option value="">Select Batch</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.batchName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="main-action">
          {editingId ? "Update Student" : "Add Student"}
        </button>

        {editingId && (
          <button type="button" className="cancel-btn" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      <div className="table-card">
        <h2>Student Records</h2>

        <input
          className="search-input"
          type="text"
          placeholder="Search by name, phone or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="premium-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Parent</th>
              <th>Total Fees</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.parentPhone}</td>
                <td>₹{s.totalFees}</td>
                <td>₹{s.paidFees}</td>
                <td className="pending">₹{s.remainingFees}</td>
                <td>
                  <span className={`status ${s.feeStatus?.toLowerCase()}`}>
                    {s.feeStatus}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => editStudent(s)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteStudent(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="9">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}