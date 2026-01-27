import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import CartModal from "../Hero/CartModal/CartModal";

const ArrowLeft = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none">
    <path stroke="#000" strokeWidth="2" d="M15 6l-6 6 6 6" />
  </svg>
);

const ArrowRight = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none">
    <path stroke="#000" strokeWidth="2" d="M9 18l6-6-6-6" />
  </svg>
);

const IconUser = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none">
    <path
      stroke="#000"
      strokeWidth="2"
      d="M12 12a5 5 0 100-10 5 5 0 000 10zM2 22c0-4.418 3.582-8 8-8h4c4.418 0 8 3.582 8 8"
    />
  </svg>
);

const IconSearch = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none">
    <circle cx="10.5" cy="10.5" r="7.5" stroke="#000" strokeWidth="2" />
    <path stroke="#000" strokeWidth="2" d="M21 21l-5.2-5.2" />
  </svg>
);

const IconCart = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none">
    <path stroke="#000" strokeWidth="2" d="M6 6h15l-1.5 9h-13z" />
    <circle cx="9" cy="21" r="1.5" stroke="#000" strokeWidth="2" />
    <circle cx="18" cy="21" r="1.5" stroke="#000" strokeWidth="2" />
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // ✅ USER ICON CLICK
  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Orders");
    } else {
      navigate("/Login");
    }
  };

  // ✅ LOGO CLICK
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <header className="navbar">

        {/* PROMO BAR */}
        <div className="navbar__promo">
          <ArrowLeft />
          <span className="navbar__promo-text">
            FLAT 5% OFF ON PREPAID ORDERS OF UPTO 2 PAIRS
          </span>
          <ArrowRight />
        </div>

        {/* MAIN NAV */}
        <div className="navbar__main">

          {/* HAMBURGER */}
          <div className="navbar__hamburger" onClick={toggleMenu}>
            <span className={`line ${menuOpen ? "open1" : ""}`}></span>
            <span className={`line ${menuOpen ? "open2" : ""}`}></span>
            <span className={`line ${menuOpen ? "open3" : ""}`}></span>
          </div>

          {/* MENU */}
          <ul className={`navbar__menu ${menuOpen ? "active" : ""}`}>
            <li><a href="/Men">MEN</a></li>
            <li><a href="/Women">WOMEN</a></li>
            <li><a href="/Men">LAFATTIO</a></li>
            <li><a href="/Women">ASPEERIO</a></li>
            <li><a href="/Men">NEW YEAR SALE</a></li>
            <li><a href="/Women">GST SAVINGS SALE</a></li>
            <li><a href="/Men">STORES</a></li>
            <li><a href="/Women">EXCHANGE SUPPORT</a></li>
          </ul>

          {/* LOGO */}
          <div
            className="navbar__logo"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          >
            EGOSS
          </div>

          {/* ICONS */}
          <div className="navbar__icons">
            <div onClick={handleUserClick} style={{ cursor: "pointer" }}>
              <IconUser />
            </div>

            <IconSearch />

            <div onClick={() => setCartOpen(true)} style={{ cursor: "pointer" }}>
              <IconCart />
            </div>
          </div>
        </div>
      </header>

      {/* CART MODAL */}
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
