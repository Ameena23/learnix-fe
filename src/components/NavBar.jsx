import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiUser, FiLogOut, FiMail, FiPhone, FiBook, FiCalendar, FiChevronDown, FiHome, FiBriefcase, FiAward, FiClock } from "react-icons/fi";
import { FaChalkboardTeacher, FaUserGraduate, FaBookOpen, FaGraduationCap, FaUniversity } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import "./Navbar.css";

export default function Navbar({ onToggle }) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    return null;
  });

  // Keep effect only for listening to storage changes if needed, 
  // or remove if initial load is sufficient.
  useEffect(() => {
    if (!userData) {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        try {
          setUserData(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, [userData]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const profileContainer = document.querySelector('.profile-container');
      if (profileContainer && !profileContainer.contains(event.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
    navigate("/");
  }

  // Helper functions
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatGender = (gender) => {
    if (gender === "M") return "Male";
    if (gender === "F") return "Female";
    if (gender === "O") return "Other";
    return "Not specified";
  };

  const formatRole = (role) => {
    if (!role) return "User";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Don't show anything if userData is not loaded yet
  if (!userData) {
    return (
      <header className="navbar">
        <button className="menu-btn" onClick={onToggle}>
          <FiMenu size={22} />
        </button>
        <div className="navbar-title">
          <span className="title-icon">📊</span>
          <span className="title-text">Student Analytics</span>
        </div>
        <div className="navbar-actions">
          <div className="profile-icon skeleton"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        {/* MENU BUTTON */}
        <button className="menu-btn" onClick={onToggle} title="Toggle Menu">
          <FiMenu size={22} />
        </button>

        {/* TITLE */}
        <div className="navbar-title">
          <span className="title-icon">📊</span>
          <span className="title-text">Student Analytics abcd </span>
        </div>

        {/* ACTIONS */}
        <div className="navbar-actions">
          {/* PROFILE DROPDOWN */}
          <div className="profile-container">
            <button
              className={`profile-btn ${showProfile ? "active" : ""}`}
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="profile-icon">
                {getInitials(userData.name)}
                <span className="status-indicator"></span>
              </div>
              <FiChevronDown className={showProfile ? "rotate" : ""} />
            </button>

            {/* SPLIT-SCREEN PROFILE DROPDOWN */}
            {showProfile && (
              <div className="profile-dropdown split-profile">
                {/* LEFT SECTION - Personal Info */}
                <div className="profile-left-section">
                  {/* PROFILE HEADER */}
                  <div className="profile-header">
                    <div className="profile-avatar">
                      {getInitials(userData.name)}
                    </div>
                    <div className="profile-info">
                      <h3>{userData.name || "User"}</h3>
                      <div className={`role-badge ${(userData.role || "").toLowerCase()}`}>
                        {userData.role === "teacher" ? (
                          <FaChalkboardTeacher />
                        ) : (
                          <FaUserGraduate />
                        )}
                        {formatRole(userData.role)}
                      </div>
                      <p className="user-code">
                        <small>{userData.usercode || "ID: N/A"}</small>
                      </p>
                    </div>
                  </div>

                  {/* PERSONAL INFO */}
                  <div className="personal-info">
                    <div className="detail-row">
                      <div className="detail-icon">
                        <FiMail />
                      </div>
                      <div className="detail-content">
                        <h4>Email Address</h4>
                        <p>{userData.email || "No email"}</p>
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-icon">
                        <FiUser />
                      </div>
                      <div className="detail-content">
                        <h4>Gender</h4>
                        <p>{formatGender(userData.gender)}</p>
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-icon">
                        <FiCalendar />
                      </div>
                      <div className="detail-content">
                        <h4>Member Since</h4>
                        <p>{formatDate(userData.created_at)}</p>
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-icon">
                        <FiBook />
                      </div>
                      <div className="detail-content">
                        <h4>User Role</h4>
                        <p>{formatRole(userData.role)}</p>
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS
                  <div className="action-buttons">
                    <button className="action-btn edit-btn">
                      <FiUser /> Edit Profile
                    </button>
                  </div> */}
                </div>

                {/* VERTICAL DIVIDER */}
                <div className="profile-divider">
                  <div className="divider-line"></div>
                </div>

                {/* RIGHT SECTION - Additional Info */}
                <div className="profile-right-section">
                  {/* STATS GRID */}
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <IoMdCheckmarkCircle />
                      </div>
                      <div className="stat-content">
                        <h3>Active</h3>
                        <p>Status</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <FiClock />
                      </div>
                      <div className="stat-content">
                        <h3>Today dfsgdnhfjg</h3>
                        <p>Last Login</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        {userData.role === "teacher" ? (
                          <FaChalkboardTeacher />
                        ) : (
                          <FaUserGraduate />
                        )}
                      </div>
                      <div className="stat-content">
                        <h3>{formatRole(userData.role)}</h3>
                        <p>Role</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <FiAward />
                      </div>
                      <div className="stat-content">
                        <h3>{userData.usercode?.split('-')[1] || "N/A"}</h3>
                        <p>ID Number</p>
                      </div>
                    </div>
                  </div>

                  {/* ADDITIONAL INFO */}
                  <div className="info-section">
                    <h4><FaUniversity /> Institutional Access</h4>
                    <p className="info-text">
                      Secure {formatRole(userData.role)} access granted via system code <strong>{userData.usercode || "N/A"}</strong>.
                    </p>
                  </div>

                  {/* ACCOUNT TYPE */}
                  <div className="info-section">
                    <h4><FaGraduationCap /> Account Verified</h4>
                    <p className="info-text">
                      {userData.role === "teacher" ? "Faculty & Staff Administrative Account" : "Student Academic Portal Access"}
                    </p>
                  </div>

                  {/* LOGOUT BUTTON */}
                  <button
                    className="profile-logout-btn"
                    onClick={() => setShowConfirm(true)}
                  >
                    <FiLogOut />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ORIGINAL LOGOUT BUTTON (MODERNIZED) */}
          {!showProfile && (
            <button
              className="nav-btn logout-btn"
              onClick={() => setShowConfirm(true)}
            >
              <FiLogOut />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </header>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button className="cancel" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}