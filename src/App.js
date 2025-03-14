import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home"; 
import HistoryContent from "./components/HistoryContent";
import Quiz from "./components/Quiz";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";
import ConvertCoins from "./components/ConvertCoins";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setAuth={setIsAuthenticated} /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/historycontent" element={isAuthenticated ? <HistoryContent /> : <Navigate to="/login" />} />
        <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={isAuthenticated ? <Leaderboard /> : <Navigate to="/login" />} />
        <Route path="/convert" element={isAuthenticated ? <ConvertCoins /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
