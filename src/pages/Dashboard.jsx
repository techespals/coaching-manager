export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <div className="grid">
        <div className="box">
          <h2>Total Students</h2>
          <p>Manage all students</p>
        </div>

        <div className="box">
          <h2>Courses</h2>
          <p>Manage courses</p>
        </div>

        <div className="box">
          <h2>Payments</h2>
          <p>Track fee payments</p>
        </div>

        <div className="box">
          <h2>Attendance</h2>
          <p>Monitor attendance</p>
        </div>
      </div>
    </div>
  );
}