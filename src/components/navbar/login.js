import { login } from "../api";
import { useState } from "react";
import './login.css'
import Navbar from "../navbar/navbar"

function Login() {
  const [form, setForm] = useState({username:"", password:""});
  const [error, setError] = useState("");   // 🔥 error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);

      localStorage.setItem("token", res.data.access);
      localStorage.setItem("username", res.data.username);

      window.location.href = "/";
    } catch (err) {
      // 🔥 handles wrong password / user
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="login_form">

        {error && <p className="error">{error}</p>} {/* popup/message */}

        <input 
          placeholder="Username"
          value={form.username}
          onChange={e=>setForm({...form, username:e.target.value})}
        /><br/>

        <input 
          type="password" 
          placeholder="Password"
          value={form.password}
          onChange={e=>setForm({...form, password:e.target.value})}
        /><br/>

        <button>Login</button>
      </form>
    </>
  );
}

export default Login;
