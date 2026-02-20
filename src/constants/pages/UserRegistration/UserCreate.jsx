import React, { useState } from "react";
import StudentForm from "./StudentForm";
import TeacherForm from "./TeacherForm";
import "./userCreate.css";
import MainLayout from "../../layouts/MainLayout";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function UserCreate() {
  const [role, setRole] = useState("");

  const getTitle = () => {
    if (role === "student") return "Student Registration";
    if (role === "teacher") return "Teacher Registration";
    return "User Registration";
  };

  const getSubtitle = () => {
    if (role === "student") return "Register a new student";
    if (role === "teacher") return "Register a new teacher";
    return "Create student or teacher account";
  };

  return (
    <MainLayout>
      <div className="page-wrapper">
        <h1 className="page-title">{getTitle()}</h1>
        <p className="page-subtitle">{getSubtitle()}</p>

        <div className="role-selection-container">
          <label className="role-label">I want to register a...</label>
          <div className="role-options">
            <button
              className={`role-card ${role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >
              <div className="role-card-icon">
                <FaUserGraduate size={24} />
              </div>
              <div className="role-card-content">
                <h3>Student</h3>
                <p>Academic profile & records</p>
              </div>
              <div className="active-indicator">
                <IoMdCheckmarkCircle />
              </div>
            </button>

            <button
              className={`role-card ${role === "teacher" ? "active" : ""}`}
              onClick={() => setRole("teacher")}
            >
              <div className="role-card-icon">
                <FaChalkboardTeacher size={24} />
              </div>
              <div className="role-card-content">
                <h3>Teacher</h3>
                <p>Faculty access & payroll</p>
              </div>
              <div className="active-indicator">
                <IoMdCheckmarkCircle />
              </div>
            </button>
          </div>
        </div>

        <div className="divider" />

        {role === "student" && <StudentForm />}
        {role === "teacher" && <TeacherForm />}
      </div>
    </MainLayout>
  );
}
