import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import HistoryContent from "./components/HistoryContent";
import HistoryDetail from "./components/HistoryDetail";
import Quiz from "./components/Quiz";
import Navbar from "./components/Navbar";
import Profiles from "./components/Profiles"; 

//import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";
import ConvertCoins from "./components/ConvertCoins";

import Web3 from "web3"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Update localStorage when isAuthenticated or user changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
    localStorage.setItem("user", JSON.stringify(user));
  }, [isAuthenticated, user]);

  // Function to handle login
  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUser({ username }); // Save the user object
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear the user object
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };
  

const web3 = new Web3("http://127.0.0.1:8545/"); // Hardhat Network runs on port 8545
const contractAddress = "0xD07e05c09658877fD46BBb46030F1A564FC2B325";
const contractABI = [/* Paste the ABI from artifacts/UBXCoin.json */];

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Example: Convert points to UBX coins
const convertPoints = async (points) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.convertPoints(points).send({ from: accounts[0] });
    console.log("Points converted!");
};

// Example: Get UBX coin balance
const getBalance = async () => {
    const accounts = await web3.eth.getAccounts();
    const balance = await contract.methods.getBalance().call({ from: accounts[0] });
    console.log("UBX Coin Balance:", balance);
};
  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout} // Pass the onLogout function
        user={user}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/historycontent" />
            ) : (
              <Login setAuth={setIsAuthenticated} onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/historycontent" />
            ) : (
              <Signup onSignup={handleLogin} />
            )
          }
        />
        <Route
          path="/historycontent"
          element={
            isAuthenticated ? (
              <HistoryContent />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/history/:index"
          element={
            isAuthenticated ? (
              <HistoryDetail />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/quiz"
          element={
            isAuthenticated ? (
              <Quiz user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
  path="/profile"
  element={
    isAuthenticated ? (
      <Profiles />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

        <Route
          path="/leaderboard"
          element={
            isAuthenticated ? (
              <Leaderboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/convert"
          element={
            isAuthenticated ? (
              <ConvertCoins user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;