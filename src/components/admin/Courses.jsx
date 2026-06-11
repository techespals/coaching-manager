import { useEffect, useState } from "react";
import api from "../../api";
import AdminPageLayout from "./AdminPageLayout";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    courseName: "",
    description: "",
    fees: "",
    duration: "",
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/owner/courses");
      setCourses(res.data);
    } catch (err) {
      console.log("FETCH COURSES ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCourse = async (e) => {
    e.preventDefault();

    try {
      await api.post("/owner/courses", {
        ...form,
        fees: Number(form.fees),
      });

      setForm({
        courseName: "",
        description: "",
        fees: "",
        duration: "",
      });

      fetchCourses();
    } catch (err) {
      console.log("ADD COURSE ERROR:", err.response?.data);
      alert("Course add nahi hua");
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await api.delete(`/owner/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.log("DELETE COURSE ERROR:", err.response?.data);
      alert("Course delete nahi hua");
    }
  };

  return (
    <AdminPageLayout
      title="Courses Management"
      subtitle="Create, manage and organize all coaching programs."
    >
      <div className="courses-grid">
        <form className="course-form-card" onSubmit={addCourse}>
          <div className="section-title">
            <h2>Add New Course</h2>
            <p>Create a new program for this institute.</p>
          </div>

          <div className="course-form-grid">
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
              type="number"
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

          <button type="submit" className="primary-action">
            Add Course
          </button>
        </form>

        <div className="course-summary-card">
          <p>Total Courses</p>
          <h2>{courses.length}</h2>
          <span>Active programs in this institute</span>
        </div>
      </div>

      <div className="premium-table-card">
        <div className="table-header">
          <div>
            <h2>Course Records</h2>
            <p>All courses added by this institute admin.</p>
          </div>
        </div>

        {loading ? (
          <div className="empty-state">Loading courses...</div>
        ) : (
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
                      type="button"
                      className="danger-action"
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
        )}
      </div>
    </AdminPageLayout>
  );
}