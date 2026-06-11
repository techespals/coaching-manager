import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "OWNER",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", data);

      alert("Registered Successfully");

      navigate("/login");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="center">
      <form className="card" onSubmit={register}>
        <h1>Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

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

        <select name="role" onChange={handleChange}>
          <option value="OWNER">OWNER</option>
          <option value="STUDENT">STUDENT</option>
        </select>

        <button>Register</button>

        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}