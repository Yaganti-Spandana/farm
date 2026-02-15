import { login } from "../api";
import { useState } from "react";
import './login.css'
import Navbar from "../navbar/navbar"

function Login() {
  const [form, setForm] = useState({username:"", password:""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);

    // store JWT + username
    localStorage.setItem("token", res.data.access);
    localStorage.setItem("username", res.data.username);

    window.location.href = "/";
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="login_form">
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

