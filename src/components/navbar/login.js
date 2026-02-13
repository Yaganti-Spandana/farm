import { login } from "../api";
import { useState } from "react";
import './login.css'
import Navbar from "../navbar/navbar"
function Login() {
  const [form, setForm] = useState({username:"", password:""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    localStorage.setItem("token", res.data.access);
    window.location.href = "/";
  };

  return (
    <>
    <Navbar></Navbar>
    <form onSubmit={handleSubmit} className="login_form">
      <input placeholder="Username"
        onChange={e=>setForm({...form, username:e.target.value})}/><br></br>
      <input type="password" placeholder="Password"
        onChange={e=>setForm({...form, password:e.target.value})}/><br></br>
      <button>Login</button>
    </form></>
  );
}

export default Login;
