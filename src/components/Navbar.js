import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";
import "./Navbar.css";

function Navbar({ isAuthenticated, onLogout, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the onLogout function passed from App.js
    navigate("/login");
  };

  const connectWallet = async () => {
    console.log("Checking for MetaMask..."); // Debugging step

    if (typeof window.ethereum !== "undefined") {
      try {
        console.log("MetaMask detected!"); // Debugging step
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const walletAddress = accounts[0];

        console.log("Connected Wallet:", walletAddress);

        // Retrieve the logged-in username from the user prop
        const username = user?.username;

        if (!username) {
          alert("Please log in first!");
          return;
        }

        // Send wallet to database
        const response = await axios.post("http://localhost/ubuntux/update-wallet.php", {
          username: username,
          wallet: walletAddress,
        });

        if (response.data.success) {
          alert("Wallet connected successfully!");
        } else {
          alert("Failed to save wallet: " + response.data.message);
        }
      } catch (error) {
        console.error("Wallet connection failed:", error);
        alert("Wallet connection failed! See console for details.");
      }
    } else {
      console.log("MetaMask not detected!"); // Debugging step
      alert("MetaMask is not installed. Please install it.");
    }
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
        <li><Link to="/convert">Convert points</Link></li>
        <li><Link to="/profiles">Profile</Link></li>
        {isAuthenticated ? (
          <>
            <button onClick={connectWallet} className="connect-wallet-button">
              Connect Wallet
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
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