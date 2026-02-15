import { signup } from "../api";
import { useState } from "react";
import './login.css'
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({username:"", email:"", password:""});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
    alert("Account created, please login");
    navigate("/login");   // 🔥 redirect
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="login_form">
        <input placeholder="Username" 
          onChange={e=>setForm({...form, username:e.target.value})}/>
        <input placeholder="Email" 
          onChange={e=>setForm({...form, email:e.target.value})}/>
        <input type="password" placeholder="Password" 
          onChange={e=>setForm({...form, password:e.target.value})}/>
        <button>Signup</button>
      </form>
    </>
  );
}

export default Signup;
