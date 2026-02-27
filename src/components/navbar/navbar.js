import './navbar.css'
import { Link } from "react-router-dom" 
import { useState } from "react" 
import { useEffect } from 'react'; 
import HomeIcon from '@mui/icons-material/Home' 
import DashboardIcon from '@mui/icons-material/Dashboard' 
import { FaMoneyBill, FaReceipt, FaBox } from "react-icons/fa"; 
import { GiMilkCarton, GiCow } from "react-icons/gi"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
function Navbar(){ 
  const isLoggedIn = localStorage.getItem("token"); 
  const username = localStorage.getItem("username"); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const handleLogout = () => { 
    localStorage.removeItem("token"); 
    localStorage.removeItem("username"); 
    window.location.href = "/login"; }; 
  useEffect(() => { 
    document.body.style.overflow = menuOpen ? "hidden" : "auto"; },
            [menuOpen]); 
  return( <div className='navbar'> {/* Hamburger */} 
    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}> ☰ </div> 
  <div className={`nav-menu ${menuOpen ? "open" : ""}`}> {/* Home */} 
<Link to='/' className="icon"> <HomeIcon style={{ color: "white", fontSize: "30px"}} /> <span>Home</span> </Link> 
{/* NEW Overview component */} {isLoggedIn && ( <Link to='/overview' className="icon"> <DashboardIcon style={{ color: "white", fontSize: "30px"}} /> <p>Overview</p> </Link> )} 
{isLoggedIn && ( <> <Link to='/animal' className="icon"> <GiCow style={{ color: "white", fontSize: "30px"}} /> <p>Animal</p> </Link> 
  <Link to='/milk' className="icon"> <GiMilkCarton style={{ color: "white", fontSize: "30px"}} /> <p>Milk</p> </Link> 
  <Link to='/sales' className="icon"> <FaMoneyBill style={{ color: "white", fontSize: "30px"}} /> <p>Sales</p> </Link>
  <Link to='/expense' className="icon"> <FaReceipt style={{ color: "white", fontSize: "30px"}} /> <p>Expense</p> </Link> 
  <Link to='/inventory' className="icon"> <FaBox style={{ color: "white", fontSize: "30px"}} /> <p>Inventory</p> </Link> 
  <Link to='/profit' className="icon"> <FaBox style={{ color: "white", fontSize: "30px"}} /> <p>Profit/Loss</p> </Link> </> )} 
{/* Account */} 
<div className="account-wrapper" onClick={() => setShowDropdown(!showDropdown)} > 
  <AccountCircleIcon style={{ color: "white", fontSize: "30px", cursor: "pointer" }} />
{isLoggedIn && ( <span className="username-text"> {username} </span> )} 
{showDropdown && ( <div className="dropdown"> {isLoggedIn ? ( <> 
  <Link to='/accounts'style={{ color: "#d35400", fontSize: "20px", cursor: "pointer" }}>Records</Link><br/>
  <button onClick={handleLogout}>Logout</button> </> ) : 
  ( <> <Link to="/login" style={{ color: "#d35400", fontSize: "20px", cursor: "pointer" }}>Login</Link> <Link to="/signup" style={{ color: "#d35400", fontSize: "20px", cursor: "pointer" }}>Register</Link> </> )} </div> )} </div> </div> </div> ) } 
  export default Navbar;
