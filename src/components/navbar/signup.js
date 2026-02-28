import { signup } from "../api";
import { useState } from "react";
import "./login.css";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
    alert("Account created");
    navigate("/login");
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
            <h2>Register</h2>

            <input
              placeholder="Username"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />

            <input
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
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

            <button type="submit">Signup</button>

            <p className="switch-text">
              Already have account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
