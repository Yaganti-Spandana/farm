import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(""); // Success or error message
  const [error, setError] = useState(""); // Detailed error
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://farm-pgi5.onrender.com/api/password_reset/",
        { email }, // Must be object with "email" key
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Needed if server sends cookies
        }
      );

      if (res.status === 200) {
        setMsg(
          "If this email exists in our system, a password reset link has been sent."
        );
      } else {
        setError("Unexpected server response. Please try again later.");
      }
    } catch (err) {
      // Handle network/CORS errors separately
      if (!err.response) {
        setError(
          "Network error: unable to reach the server. Please check your internet connection or try again later."
        );
      } else if (err.response.status >= 400 && err.response.status < 500) {
        setError(
          "There was a problem with your request. Please check your email and try again."
        );
      } else {
        setError(
          "Server error: something went wrong. Please try again later."
        );
      }
      console.error("ForgotPassword error:", err.response || err.message);
    } finally {
      setLoading(false);
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

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* Display messages */}
          {msg && <p className="success-text">{msg}</p>}
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;