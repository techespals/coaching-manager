import { useNavigate, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { title: "Dashboard", icon: "📊", path: "/admin/dashboard" },
    { title: "Students", icon: "👨‍🎓", path: "/admin/students" },
    { title: "Courses", icon: "📚", path: "/admin/courses" },
    { title: "Batches", icon: "🕒", path: "/admin/batches" },
    { title: "Attendance", icon: "✅", path: "/admin/attendance" },
    { title: "Payments", icon: "💳", path: "/admin/payments" },
  ];

  return (
    <aside className="admin-sidebar">
      <div>
        <div className="brand-box">
          <h2>TechEspals</h2>
          <span>Coaching Manager</span>
        </div>

        <nav className="side-menu">
          {menuItems.map((item) => (
            <button
              key={item.title}
              className={
                location.pathname === item.path
                  ? "side-item active"
                  : "side-item"
              }
              onClick={() => navigate(item.path)}
            >
              <span>{item.icon}</span>
              {item.title}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button onClick={() => navigate("/")} className="home-btn">
          🏠 Home
        </button>

        <button onClick={logout} className="logout-btn">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}