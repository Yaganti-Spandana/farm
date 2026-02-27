import './navbar.css'
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { FaMoneyBill, FaReceipt, FaBox } from "react-icons/fa"
import { GiMilkCarton, GiCow } from "react-icons/gi"

function Navbar() {
  const isLoggedIn = localStorage.getItem("token")
  const username = localStorage.getItem("username")

  const [showDropdown, setShowDropdown] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    window.location.href = "/login"
  }

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto"
  }, [menuOpen])

  // 🔥 auto close menu on click (mobile)
  const handleMenuClick = () => {
    setMenuOpen(false)
  }

  return (
    <div className='navbar'>

      {/* hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>

        {/* Home */}
        <Link to='/' className="icon" onClick={handleMenuClick}>
          <div className="menu-left">
            <HomeIcon className="menu-icon" />
            <p>Home</p>
          </div>
          <ChevronRightIcon className="nav-arrow" />
        </Link>

        {/* Overview */}
        {isLoggedIn && (
          <Link to='/overview' className="icon" onClick={handleMenuClick}>
            <div className="menu-left">
              <DashboardIcon className="menu-icon" />
              <p>Overview</p>
            </div>
            <ChevronRightIcon className="nav-arrow" />
          </Link>
        )}

        {isLoggedIn && (
          <>
            <Link to='/animal' className="icon" onClick={handleMenuClick}>
              <div className="menu-left">
                <GiCow className="menu-icon" />
                <p>Animal</p>
              </div>
              <ChevronRightIcon className="nav-arrow" />
            </Link>

            <Link to='/milk' className="icon" onClick={handleMenuClick}>
              <div className="menu-left">
                <GiMilkCarton className="menu-icon" />
                <p>Milk</p>
              </div>
              <ChevronRightIcon className="nav-arrow" />
            </Link>

            <Link to='/sales' className="icon" onClick={handleMenuClick}>
              <div className="menu-left">
                <FaMoneyBill className="menu-icon" />
                <p>Sales</p>
              </div>
              <ChevronRightIcon className="nav-arrow" />
            </Link>

            <Link to='/expense' className="icon" onClick={handleMenuClick}>
              <div className="menu-left">
                <FaReceipt className="menu-icon" />
                <p>Expense</p>
              </div>
              <ChevronRightIcon className="nav-arrow" />
            </Link>

            <Link to='/inventory' className="icon" onClick={handleMenuClick}>
              <div className="menu-left">
                <FaBox className="menu-icon" />
                <p>Inventory</p>
              </div>
              <ChevronRightIcon className="nav-arrow" />
            </Link>

            <Link to='/profit' className="icon" onClick={handleMenuClick}>
              <div className="menu-left">
                <FaBox className="menu-icon" />
                <p>Profit/Loss</p>
              </div>
              <ChevronRightIcon className="nav-arrow" />
            </Link>
          </>
        )}

        {/* account */}
        <div
          className="account-wrapper"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <AccountCircleIcon className="account-icon" />

          {isLoggedIn && (
            <span className="username-text">{username}</span>
          )}

          {showDropdown && (
            <div className="dropdown">
              {isLoggedIn ? (
                <>
                  <Link to='/accounts' style={{color:"#d35400"}}>Records</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" style={{color:"#d35400"}}>Login</Link>
                  <Link to="/signup" style={{color:"#d35400"}}>Register</Link>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
export default Navbar
