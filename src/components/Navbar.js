import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate import
import "./Navbar.css"; // Import styles

function Navbar({ isAuthenticated, setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setAuth(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <img src="/images/uxlogonav.png" alt="UbuntuX Logo" className="nav-image" />
      <h3 className="logo">UbuntuX</h3>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li> 
        <li><Link to="/historycontent">Learn</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/convert">Convert Coins</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
            <li><Link to="/login" className="login-btn">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
