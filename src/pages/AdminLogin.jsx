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

      if (res.data.role !== "OWNER") {
        alert("Not Admin Account");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/admin/dashboard");
    } catch (err) {
      alert("Invalid Credentials");
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
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button>Login</button>
      </form>
    </div>
  );
}