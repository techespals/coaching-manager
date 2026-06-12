import { useEffect, useState } from "react";
import api from "../../api";
import "./SuperAdminDashboard.css";

export default function SuperAdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalInstitutes: 0,
    activeInstitutes: 0,
    inactiveInstitutes: 0,
    totalInstituteAdmins: 0,
    totalStudents: 0,
  });

  const [institutes, setInstitutes] = useState([]);

  const [form, setForm] = useState({
    instituteName: "",
    ownerName: "",
    email: "",
    phone: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  const fetchDashboard = async () => {
    const res = await api.get("/super-admin/dashboard");
    setDashboard(res.data);
  };

  const fetchInstitutes = async () => {
    const res = await api.get("/super-admin/institutes");
    setInstitutes(res.data);
  };

  useEffect(() => {
    fetchDashboard();
    fetchInstitutes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createInstitute = async (e) => {
    e.preventDefault();

    await api.post("/super-admin/institutes", form);

    setForm({
      instituteName: "",
      ownerName: "",
      email: "",
      phone: "",
      adminName: "",
      adminEmail: "",
      adminPassword: "",
    });

    fetchDashboard();
    fetchInstitutes();

    alert("Institute created successfully");
  };

  const toggleStatus = async (id) => {
    await api.put(`/super-admin/institutes/${id}/toggle-status`);
    fetchDashboard();
    fetchInstitutes();
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/admin-login";
  };

  return (
    <div className="super-page">
      <div className="super-header">
        <div>
          <p>TechEspals Control Panel</p>
          <h1>Super Admin Dashboard</h1>
        </div>

        <button onClick={logout}>Logout</button>
      </div>

      <div className="super-stats-grid">
        <div className="super-card">
          <p>Total Institutes</p>
          <h2>{dashboard.totalInstitutes}</h2>
        </div>

        <div className="super-card active">
          <p>Active Institutes</p>
          <h2>{dashboard.activeInstitutes}</h2>
        </div>

        <div className="super-card warning">
          <p>Inactive Institutes</p>
          <h2>{dashboard.inactiveInstitutes}</h2>
        </div>

        <div className="super-card">
          <p>Institute Admins</p>
          <h2>{dashboard.totalInstituteAdmins}</h2>
        </div>

        <div className="super-card">
          <p>Total Students</p>
          <h2>{dashboard.totalStudents}</h2>
        </div>
      </div>

      <div className="super-form-card">
        <h2>Create New Institute</h2>

        <form onSubmit={createInstitute} className="super-form-grid">
          <input
            name="instituteName"
            placeholder="Institute Name"
            value={form.instituteName}
            onChange={handleChange}
            required
          />

          <input
            name="ownerName"
            placeholder="Owner Name"
            value={form.ownerName}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Institute Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Institute Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="adminName"
            placeholder="Admin Name"
            value={form.adminName}
            onChange={handleChange}
            required
          />

          <input
            name="adminEmail"
            placeholder="Admin Email"
            value={form.adminEmail}
            onChange={handleChange}
            required
          />

          <input
            name="adminPassword"
            type="password"
            placeholder="Admin Password"
            value={form.adminPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Create Institute</button>
        </form>
      </div>

      <div className="super-table-card">
        <h2>All Institutes</h2>

        <table>
          <thead>
            <tr>
              <th>Institute</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {institutes.map((i) => (
              <tr key={i.id}>
                <td>{i.instituteName}</td>
                <td>{i.ownerName}</td>
                <td>{i.email}</td>
                <td>{i.phone}</td>
                <td>{i.active ? "Active" : "Inactive"}</td>
                <td>
                  <button onClick={() => toggleStatus(i.id)}>
                    {i.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}

            {institutes.length === 0 && (
              <tr>
                <td colSpan="6">No institutes found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}