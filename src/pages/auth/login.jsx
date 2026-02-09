import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      background: "#9b9ab2ff",
      borderRadius: "8px",
      boxShadow: "0 8px 15px rgba(131, 27, 27, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "25px",
      color: "#514e8cff",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      padding: "12px 15px",
      marginBottom: "20px",
      border: "1.5px solid #4b25d1ff",
      borderRadius: "5px",
      fontSize: "16px",
      outline: "none",
    },
    inputFocus: {
      borderColor: "#19bc44ff",
    },
    button: {
      padding: "12px 20px",
      backgroundColor: "#1c09ec2c",
      color: "white",
      border: "none",
      fontSize: "18px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    message: {
      marginTop: "20px",
      textAlign: "center",
      fontWeight: "600",
      color: "green",
    },
  };

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await API.post("/api/auth/login", {
        email,
        password
      });

      if (response.data.success) {
        const user = response.data.user;

        // store login info
        localStorage.setItem("userId", user.id);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", user.role); // Store user role
        localStorage.setItem("userData", JSON.stringify(user)); // Store entire user data

        // ✅ show success message
        setMessage("Login successful!");

        // ✅ navigate based on role after 1 second
        setTimeout(() => {
          // Redirect based on user role
          switch (user.role) {
            case 'admin':
              navigate("/dashboard");
              break;
            case 'teacher':
              navigate("/dashboard");
              break;
            case 'student':
              navigate("/dashboard");
              break;
            default:
              navigate("/dashboard");
          }
        }, 1000);

      } else {
        setMessage(response.data.message);
      }

    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Failed to login");
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>

      <form style={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {message && <p style={message.includes("successful") ? styles.message : { ...styles.message, color: "red" }}>{message}</p>}
    </div>
  );
}

export default Login;