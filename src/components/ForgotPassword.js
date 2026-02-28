import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post(
      "https://farm-pgi5.onrender.com/api/password_reset/",
      { email }, // must be an object with "email" key
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(res.data);

      setMsg("Password reset link sent to your email.");
    } catch (err) {
  console.error(err.response?.data || err.message);
}
  };

  return (
    <>
      <Navbar/>
      <div className="auth-page">
        <form onSubmit={handleSubmit} className="auth-card">
          <h2>Forgot Password</h2>

          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Link</button>

          {msg && <p className="success-text">{msg}</p>}
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;