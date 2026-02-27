import './navbar.css' 
import { Link } from "react-router-dom" 
import { useState } from "react" 
import { useEffect } from 'react'; 
import HomeIcon from '@mui/icons-material/Home' 
import DashboardIcon from '@mui/icons-material/Dashboard' 
import { FaMoneyBill, FaReceipt, FaBox } from "react-icons/fa"; 
import { GiMilkCarton, GiCow } from "react-icons/gi"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
    document.body.style.overflow = menuOpen ? "hidden" : "auto"; }, [menuOpen]); 
  return( 
    <div className='navbar'> 
  {/* Hamburger */} 
    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}> ☰ </div> 
  <div className={`nav-menu ${menuOpen ? "open" : ""}`}> {/* Home */} 
<Link to='/' className="icon">
  <div className="icon-left">
    <HomeIcon className="nav-icon" />
    <span>Home</span>
  </div>
  <ChevronRightIcon className="nav-arrow" />
</Link> 
{/* NEW Overview component */} {isLoggedIn && ( <Link to='/overview' className="icon"> <DashboardIcon style={{ color: "white", fontSize: "30px"}} /> <p>Overview</p> </Link> )} 
{isLoggedIn && ( <> 
  <Link to='/animal' className="icon">
  <div className="icon-left">
    <GiCow className="nav-icon" />
    <span>Animal</span>
  </div>
  <ChevronRightIcon className="nav-arrow" />
</Link>
  <Link to='/milk' className="icon">
  <div className="icon-left">
    <GiMilkCarton className="nav-icon" />
    <span>Milk</span>
  </div>
  <ChevronRightIcon className="nav-arrow" />
</Link>
  <Link to='/sales' className="icon">
  <div className="icon-left">
    <FaMoneyBill className="nav-icon" />
    <span>Sales</span>
  </div>
  <ChevronRightIcon className="nav-arrow" />
</Link>
  <Link to='/expense' className="icon">
  <div className="icon-left">
    <FaReceipt className="nav-icon" />
    <span>Expense</span>
  </div>
  <ChevronRightIcon className="nav-arrow" />
</Link>
  <Link to='/inventory' className="icon">
  <div className="icon-left">
    <FaBox className="nav-icon" />
    <span>Inventory</span>
  </div>
  <ChevronRightIcon className="nav-arrow" />
</Link>
  <Link to='/profit' className="icon">
  <div className="icon-left">
    <FaBox className="nav-icon" />
    <span>Profit/Loss</span>
  </div>
  <ChevronRightIcon className="nav-arrow" />
</Link> 
{/* Account */} 
<div className="account-wrapper" onClick={() => setShowDropdown(!showDropdown)} > 
  <AccountCircleIcon style={{ color: "white", fontSize: "30px", cursor: "pointer" }} /> 
{isLoggedIn && ( <span className="username-text"> {username} </span> )} 
{showDropdown && ( <div className="dropdown"> {isLoggedIn ? ( <> <Link to='/accounts'style={{ color: "#d35400", fontSize: "20px", cursor: "pointer" }}>Records</Link><br/> 
  <button onClick={handleLogout}>Logout</button> </> ) : 
  ( <> <Link to="/login">Login</Link> <Link to="/signup">Register</Link> </> )} </div> )}
  </div> 
  </div> 
  </div> ) } 
  export default Navbar;
