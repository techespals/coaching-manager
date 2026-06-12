import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", data);

      if (
        res.data.role !== "INSTITUTE_ADMIN" &&
        res.data.role !== "SUPER_ADMIN"
      ) {
        toast.error("Not an Admin Account");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("instituteId", res.data.instituteId || "");
      localStorage.setItem("name", res.data.name || "");
      localStorage.setItem("email", res.data.email || "");

      toast.success("Login Successful");

      setTimeout(() => {
        if (res.data.role === "SUPER_ADMIN") {
          navigate("/super-admin/dashboard");
        } else {
          navigate("/admin/dashboard");
        }
      }, 1000);
    } catch (err) {
      console.log(err.response?.status);
      console.log(err.response?.data);

      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
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

        <button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
}