import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import "./navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      {/* ===== DESKTOP NAVBAR ===== */}
      <div className="navbar desktop-nav">
        <h2 className="logo">Dairy Dashboard</h2>

        <div className="desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/overview">Overview</Link>
          <Link to="/animal">Animal</Link>
          <Link to="/milk">Milk</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/expense">Expense</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/profitloss">Profit/Loss</Link>
        </div>

        <MenuIcon className="menu-btn" onClick={toggleDrawer} />
      </div>

      {/* ===== MOBILE DRAWER ===== */}
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        <Link to="/" className="icon" onClick={closeDrawer}>
          <div className="icon-left">
            <HomeIcon className="nav-icon" />
            <span>Home</span>
          </div>
          <ChevronRightIcon className="nav-arrow" />
        </Link>

        <Link to="/overview" className="icon" onClick={closeDrawer}>
          <div className="icon-left">
            <AssessmentIcon className="nav-icon" />
            <span>Overview</span>
          </div>
          <ChevronRightIcon className="nav-arrow" />
        </Link>

        <Link to="/animal" className="icon" onClick={closeDrawer}>
          <div className="icon-left">
            <PetsIcon className="nav-icon" />
            <span>Animal</span>
          </div>
          <ChevronRightIcon className="nav-arrow" />
        </Link>

        <Link to="/milk" className="icon" onClick={closeDrawer}>
          <div className="icon-left">
            <LocalDrinkIcon className="nav-icon" />
            <span>Milk</span>
          </div>
          <ChevronRightIcon className="nav-arrow" />
        </Link>

        <Link to="/sales" className="icon" onClick={closeDrawer}>
          <div className="icon-left">
            <PointOfSaleIcon className="nav-icon" />
            <span>Sales</span>
          </div>
          <ChevronRightIcon className="nav-arrow" />
        </Link>

        <Link to="/expense" className="icon" onClick={closeDrawer}>
          <div className="icon-left">
            <MoneyOffIcon className="nav-icon" />
            <span>Expense</span>
          </div>
          <ChevronRightIcon className="nav-arrow" />
        </Link>

        <Link to="/inventory" className="icon" onClick={closeDrawer}>
          <div className="icon-left">
            <InventoryIcon className="nav-icon" />
            <span>Inventory</span>
          </div>
          <ChevronRightIcon className="nav-arrow" />
        </Link>

        <Link to="/profitloss" className="icon" onClick={closeDrawer}>
          <div className="icon-left">
            <AssessmentIcon className="nav-icon" />
            <span>Profit / Loss</span>
          </div>
          <ChevronRightIcon className="nav-arrow" />
        </Link>
      </div>

      {open && <div className="backdrop" onClick={closeDrawer}></div>}
    </>
  );
}

export default Navbar;
