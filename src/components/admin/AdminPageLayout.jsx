import AdminSidebar from "./AdminSidebar";
import "./AdminPageLayout.css";

export default function AdminPageLayout({ title, subtitle, children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <div className="admin-page-header">
          <div>
            <p className="admin-eyebrow">Coaching Manager</p>
            <h1>{title}</h1>
            <span>{subtitle}</span>
          </div>

          
        </div>

        {children}
      </main>
    </div>
  );
}