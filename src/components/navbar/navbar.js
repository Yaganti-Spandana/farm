import './navbar.css'
import { Link } from "react-router-dom"
import { useState } from "react"
import HomeIcon from '@mui/icons-material/Home'
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
        window.location.href = "/login";
    };

    return(
        <div className='navbar'>

            {/* Hamburger */}
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            <div className={`nav-menu ${menuOpen ? "open" : ""}`}>

                <Link to='/' className="icon">
                    <HomeIcon style={{ color: "brown", fontSize: "32px"}} />
                    <p>Home</p>
                </Link>

                {isLoggedIn && (
                    <>
                        <Link to='/animal' className="icon">
                            <GiCow style={{ color: "brown", fontSize: "32px" }} />
                            <p>Animal</p>
                        </Link>

                        <Link to='/milk' className="icon">
                            <GiMilkCarton style={{ color: "brown", fontSize: "32px" }} />
                            <p>Milk</p>
                        </Link>

                        <Link to='/sales' className="icon">
                            <FaMoneyBill style={{ color: "brown", fontSize: "32px" }} />
                            <p>Sales</p>
                        </Link>

                        <Link to='/expense' className="icon">
                            <FaReceipt style={{ color: "brown", fontSize: "32px" }} />
                            <p>Expense</p>
                        </Link>

                        <Link to='/inventory' className="icon">
                            <FaBox style={{ color: "brown", fontSize: "32px" }} />
                            <p>Inventory</p>
                        </Link>

                        <Link to='/profit' className="icon">
                            <FaBox style={{ color: "brown", fontSize: "32px" }} />
                            <p>Profit/Loss</p>
                        </Link>
                    </>
                )}

                {/* Account */}
                <div 
                  className="account-wrapper"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                    <AccountCircleIcon 
                      style={{ color: "brown", fontSize: "32px", cursor: "pointer" }} 
                    />

                    {isLoggedIn && (
                        <span className="username-text">
                            {username}
                        </span>
                    )}

                    {showDropdown && (
                        <div className="dropdown">
                            {isLoggedIn ? (
                                <>
                                    <Link to='/accounts'>Records</Link><br/>
                                    <button onClick={handleLogout}>Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/signup">Register</Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;
