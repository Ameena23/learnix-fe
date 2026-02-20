import { NavLink } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/NavBar.jsx";
import { usePermissions } from "../context/PermissionsContext";
import {
  FiMenu,
  FiBarChart2,
  FiUsers,
  FiClipboard,
  FiFileText,
  FiUserPlus,
  FiLock
} from "react-icons/fi";
import "./MainLayout.css";

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { hasPermission } = usePermissions();
  const userRole = localStorage.getItem('userRole');

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <span className="logo">SMS</span>
        </div>

        <nav className="sidebar-nav">
          {hasPermission('dashboard', 'read') && (
            <NavLink to="/dashboard" className="nav-link">
              <FiBarChart2 />
              <span>Dashboard</span>
            </NavLink>
          )}

          {hasPermission('student_mark_entry', 'read') && (
            <NavLink to="/studentss" className="nav-link">
              <FiUsers />
              <span>Students Mark Entry</span>
            </NavLink>
          )}

          {hasPermission('exam_mark_view_edit', 'read') && (
            <NavLink to="/exam-mark-entries" className="nav-link">
              <FiClipboard />
              <span>Exam Marks view/edit</span>
            </NavLink>
          )}

          {hasPermission('attendance', 'read') && (
            <NavLink to="/attendance" className="nav-link">
              <FiClipboard />
              <span>Attendance</span>
            </NavLink>
          )}

          {hasPermission('reports', 'read') && (
            <NavLink to="/reports/report-card" className="nav-link">
              <FiFileText />
              <span>Reports</span>
            </NavLink>
          )}

          {hasPermission('user_management', 'read') && (
            <NavLink to="/user-create" className="nav-link">
              <FiUserPlus />
              <span>User Management</span>
            </NavLink>
          )}

          {userRole === 'admin' && (
            <NavLink to="/privileges" className="nav-link">
              <FiLock />
              <span>Privileges</span>
            </NavLink>
          )}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main">
        <Navbar
          onToggle={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
        />

        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
