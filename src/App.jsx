import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login.jsx";

import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Attendance from "./pages/attendance/Attendance.jsx"
import StudentListPage from "./pages/students/studentMarkEntrypage.jsx";
import ExamMarkEntriesPage from "./pages/students/examMarkEntriesPage.jsx";
import UserCreate from "./pages/UserRegistration/UserCreate.jsx";
import StudentReportCard from "./pages/students/studentReportCard.jsx";
import ReportCardGenerator from "./pages/students/reportCardGenerator.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <Login />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/students" element={<StudentSummary />} />  */}
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/reports/report-card" element={<ReportCardGenerator />} />
        <Route path="/reports/report-card/:admission_no" element={<StudentReportCard />} />
        <Route path="/exam-mark-entries" element={< ExamMarkEntriesPage />} />
        <Route path="/studentss" element={<StudentListPage />} />
        <Route path="/user-create" element={<UserCreate />} />
      </Routes>
    </Router>
  );
}