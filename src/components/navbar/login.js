import { login } from "../api";
import { useState } from "react";
import "./auth.css";
import Navbar from "../navbar/navbar";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    localStorage.setItem("token", res.data.access);
    window.location.href = "/";
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        {/* LEFT HERO */}
        <div className="auth-left">
          <h1>Welcome to Net Banking</h1>
          <p>Secure • Fast • Reliable</p>
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

            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

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