import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");      // Success or error message
  const [errorType, setErrorType] = useState(""); // "network" or "server"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErrorType("");

    if (!email) {
      setMsg("Please enter your email.");
      return;
    }

    try {
      const res = await axios.post(
        "https://farm-pgi5.onrender.com/api/password_reset/",
        { email },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 15000, // 15 seconds timeout
        }
      );

      // If backend returns 200
      setMsg("✅ Password reset link sent to your email!");
      setErrorType("success");

    } catch (err) {
      console.error(err);

      // Axios network error (server not reachable, CORS blocked)
      if (!err.response) {
        setMsg(
          "⚠️ Network error: unable to reach the server. Check your internet or try again later."
        );
        setErrorType("network");
      } else if (err.response.status >= 400 && err.response.status < 500) {
        // Client errors like invalid email
        setMsg(
          err.response.data?.email?.[0] ||
          "⚠️ Invalid request. Please check your email and try again."
        );
        setErrorType("client");
      } else if (err.response.status >= 500) {
        // Server errors
        setMsg(
          "⚠️ Server error: password reset email could not be sent. Try again later."
        );
        setErrorType("server");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <form onSubmit={handleSubmit} className="auth-card">
          <h2>Forgot Password</h2>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Link</button>

          {/* Message display */}
          {msg && (
            <p
              className={
                errorType === "success"
                  ? "success-text"
                  : "error-text"
              }
            >
              {msg}
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;