export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <div className="grid">
        <div className="box">
          <h2>Students</h2>
          <p>Manage students</p>
        </div>

        <div className="box">
          <h2>Courses</h2>
          <p>Manage courses</p>
        </div>

        <div className="box">
          <h2>Attendance</h2>
          <p>Track attendance</p>
        </div>

        <div className="box">
          <h2>Payments</h2>
          <p>Track fee collection</p>
        </div>
      </div>
    </div>
  );
}