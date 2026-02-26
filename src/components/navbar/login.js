import { useState,useEffect } from "react";
import { login } from "../api";
import "./login.css";
import Navbar from "../navbar/navbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await login(form);

  localStorage.setItem("token", res.data.access);
  localStorage.setItem("username", res.data.username); // ⭐ ADD THIS

  window.location.href = "/";
};

  return (
    <>
      <Navbar />
      <div className="auth-page">
        {/* LEFT HERO */}
        <div className="auth-left">
          <h1>Welcome to Dairy Farm Management System!</h1>
        </div>

        {/* RIGHT CARD */}
        <div className="auth-right">
          <form onSubmit={handleSubmit} className="auth-card">
            <h2>Login to Internet Banking</h2>

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
