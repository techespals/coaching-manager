import { useEffect, useState } from "react";
import api from "../api";

export default function Students() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/owner/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Students</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Remaining Fees</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.remainingFees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}