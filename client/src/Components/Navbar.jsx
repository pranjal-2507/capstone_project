import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import "../Styles/Navbar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
          
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("id");
      localStorage.removeItem("profile");

      toast.success("You have successfully logged out. We hope to see you again soon!");
      navigate("/");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="navbar-container">
      <div className="nav">
        <div className="img">
          <NavLink to={"/"} aria-label="Home">
            <img className="imglogo" src={logo} alt="ifinance-logo" />
          </NavLink>
        </div>
        
        {/* Hamburger Menu */}
        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`tags ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          
          <NavLink className="nav" to={"/dashboard"} onClick={closeMobileMenu}>
            <p className="tag">Dashboard</p>
          </NavLink>
          <NavLink className="nav" to={"/friends"} onClick={closeMobileMenu}>
            <p className="tag">Friends</p>
          </NavLink>
          <NavLink className="nav" to={"/aboutus"} onClick={closeMobileMenu}>
            <p className="tag">About us</p>
          </NavLink>
          {isLoggedIn ? (
            <div className="auth-section">
              <button 
                className="logout" 
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                <span className="logout-icon">&#10140;</span>
                Logout
              </button>
              <NavLink to={"/profile"} onClick={closeMobileMenu}>
                <div className="photo-wrapper">
                  <img 
                    className="photo" 
                    src={localStorage.getItem("profile")} 
                    alt="Profile" 
                  />
                </div>
              </NavLink>
            </div>
          ) : (
            <NavLink className="nav" to={"/login"} onClick={closeMobileMenu}>
              <button className="login">Login</button>
            </NavLink>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Navbar;