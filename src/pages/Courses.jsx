import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    courseName: "",
    description: "",
    fees: "",
    duration: "",
  });

  const fetchCourses = async () => {
    const res = await api.get("/owner/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCourse = async (e) => {
    e.preventDefault();

    await api.post("/owner/courses", {
      ...form,
      fees: Number(form.fees),
    });

    alert("Course Added Successfully");

    setForm({
      courseName: "",
      description: "",
      fees: "",
      duration: "",
    });

    fetchCourses();
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    await api.delete(`/owner/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="admin-page">
      <div className="page-top">
        <div>
          <h1>Courses Management</h1>
          <p>Create and manage coaching courses.</p>
        </div>

        <button onClick={() => navigate("/admin/dashboard")}>
          Back Dashboard
        </button>
      </div>

      <form className="student-form" onSubmit={addCourse}>
        <h2>Add New Course</h2>

        <div className="form-grid">
          <input
            name="courseName"
            placeholder="Course Name"
            value={form.courseName}
            onChange={handleChange}
            required
          />

          <input
            name="description"
            placeholder="Course Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="fees"
            placeholder="Fees"
            value={form.fees}
            onChange={handleChange}
            required
          />

          <input
            name="duration"
            placeholder="Duration"
            value={form.duration}
            onChange={handleChange}
            required
          />
        </div>

        <button className="main-action">Add Course</button>
      </form>

      <div className="table-card">
        <h2>Course Records</h2>

        <table className="premium-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Description</th>
              <th>Fees</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>{c.courseName}</td>
                <td>{c.description}</td>
                <td>₹{c.fees}</td>
                <td>{c.duration}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCourse(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {courses.length === 0 && (
              <tr>
                <td colSpan="5">No courses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}