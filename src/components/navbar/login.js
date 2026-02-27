import React, { useState } from "react";
import { login } from "../api";
import "./login.css";
import Navbar from "../navbar/navbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(form);

      localStorage.setItem("token", res.data.access);
      localStorage.setItem("username", res.data.username);

      window.location.href = "/";
    } catch (err) {
      console.log(err);

      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">
        <div className="auth-left">
          <h1>Welcome to Dairy Farm Management System!</h1>
        </div>

        <div className="auth-right">
          <form onSubmit={handleSubmit} className="auth-card">
            <h2>Login</h2>

            <input
              placeholder="User ID"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>

            {/* 🔴 ERROR MESSAGE */}
            {error && <p className="error-text">{error}</p>}

            <button type="submit">Login</button>

            <p className="switch-text">
              New user? <a href="/signup">Register</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
