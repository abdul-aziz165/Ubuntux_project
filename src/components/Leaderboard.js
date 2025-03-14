import React from "react";
import "./Leaderboard.css"; // Add styles

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <p>Top players based on their scores.</p>
      <ul>
        <li>1. User1 - 500 Points</li>
        <li>2. User2 - 450 Points</li>
        <li>3. User3 - 400 Points</li>
      </ul>
    </div>
  );
};

export default Leaderboard;
