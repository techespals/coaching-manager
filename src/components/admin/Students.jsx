import { useEffect, useState } from "react";
import api from "../../api";
import AdminPageLayout from "./AdminPageLayout";
import "./Student.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

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
  setPhotoFile(null);
};

  const addStudent = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/owner/students", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        parentPhone: form.parentPhone,
        totalFees: Number(form.totalFees),
        paidFees: Number(form.paidFees),
        courseId: Number(form.courseId),
        batchId: Number(form.batchId),
      });

      if (photoFile) {
        const photoData = new FormData();

        photoData.append("file", photoFile);

        await api.post(
          `/owner/students/${res.data.id}/photo`,
          photoData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
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

  const filteredStudents = students.filter((s) =>
    `${s.name || ""} ${s.phone || ""} ${s.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredBatches = batches.filter(
    (b) => String(b.course?.id) === String(form.courseId)
  );
  const sendWhatsAppReminder = (student) => {

  const message =
`Dear Parent,

This is a reminder that the pending fee for ${student.name} is ₹${student.remainingFees}.

Please submit the fee at your earliest convenience.

Regards,
${student.institute?.instituteName || "Coaching Institute"}`;

  const url =
`https://wa.me/91${student.parentPhone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};


  const exportStudentsExcel = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8080/api/owner/students/export",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      alert("Export failed");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "students.xlsx";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Export failed");
  }

};
  return (
    <AdminPageLayout
      title="Students Management"
      subtitle="Manage students, fees and pending payments."
    >
      <div className="students-stats-row">
        <div className="student-stat-card">
          <p>Total Students</p>
          <h2>{students.length}</h2>
        </div>

        <div className="student-stat-card highlight">
          <p>Total Pending Fees</p>
          <h2>₹{totalPending}</h2>
        </div>

        <div className="student-stat-card">
          <p>Quick Action</p>
          <button type="button" onClick={showPendingFees}>
            Show Pending Fees
          </button>
        </div>

        <div className="student-stat-card">
          <p>View All</p>
          <button type="button" onClick={fetchStudents}>
            All Students
          </button>
        </div>
      </div>

      <form
        className="student-form-card"
        onSubmit={editingId ? updateStudent : addStudent}
      >
        <div className="section-title">
          <h2>{editingId ? "Edit Student" : "Add New Student"}</h2>
          <p>Fill student details and assign course with batch.</p>
        </div>

        <div className="student-form-grid">
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
            {filteredBatches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.batchName}
              </option>
            ))}
          </select>
          
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-action">
            {editingId ? "Update Student" : "Add Student"}
          </button>

          {editingId && (
            <button type="button" className="secondary-action" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="student-table-card">
        <div className="table-header">
        <div>
          <h2>Student Records</h2>
          <p>Search, edit and manage all students.</p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            className="student-search"
            type="text"
            placeholder="Search by name, phone or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="button"
            className="primary-action"
            onClick={exportStudentsExcel}
          >
            Export Excel
          </button>
        </div>
      </div>

        <table className="premium-table">
          <thead>
            <tr>
              <th>Photo</th>
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

  <td>
    {s.photoUrl ? (
      <img
        src={`http://localhost:8080${s.photoUrl}`}
        alt={s.name}
        className="student-photo"
      />
    ) : (
      "No Photo"
    )}
  </td>

  <td>{s.name}</td>
  <td>{s.email}</td>
  <td>{s.phone}</td>
  <td>{s.parentPhone}</td>
  <td>₹{s.totalFees}</td>
  <td>₹{s.paidFees}</td>
  <td className="pending">₹{s.remainingFees}</td>

  <td>
    <span className={`fee-status ${s.feeStatus?.toLowerCase()}`}>
      {s.feeStatus}
    </span>
  </td>

  <td className="table-actions">
    <button
      type="button"
      className="edit-action"
      onClick={() => editStudent(s)}
    >
      Edit
    </button>

    <button
      type="button"
      className="danger-action"
      onClick={() => deleteStudent(s.id)}
    >
      Delete
    </button>
   
<button
  type="button"
  className="edit-action"
  onClick={() => sendWhatsAppReminder(s)}
>
  WhatsApp
</button>
  </td>

</tr>
              
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="10">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminPageLayout>
  );
}