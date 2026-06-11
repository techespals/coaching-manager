import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", data);

      if (res.data.role !== "INSTITUTE_ADMIN") {
        alert("Not Admin Account");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("instituteId", res.data.instituteId);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);

      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err.response?.status);
      console.log(err.response?.data);
      alert("Login failed");
    }
  };

  return (
    <div className="center">
      <form className="card" onSubmit={login}>
        <h1>Admin Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}