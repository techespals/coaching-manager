import { useEffect, useState } from "react";
import api from "../api";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await api.get("/owner/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Courses</h1>

      {courses.map((c) => (
        <div className="box" key={c.id}>
          <h2>{c.courseName}</h2>
          <p>{c.description}</p>
          <p>Fees: ₹{c.fees}</p>
        </div>
      ))}
    </div>
  );
}