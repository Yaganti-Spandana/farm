import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./navbar/navbar";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://farm-pgi5.onrender.com/api/password_reset/confirm/",
        {
          password,
          token,
        }
      );

      setMsg("Password reset successful. You can login now.");
    } catch (err) {
      setMsg("Reset failed.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <form onSubmit={handleSubmit} className="auth-card">
          <h2>Reset Password</h2>

          <input
            type="password"
            placeholder="New password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>

          {msg && <p className="success-text">{msg}</p>}
        </form>
      </div>
    </>
  );
}

export default ResetPassword;