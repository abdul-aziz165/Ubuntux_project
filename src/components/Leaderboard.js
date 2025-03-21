import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([
    { rank: 1, username: "Kwame", country: "Ghana", score: 9500 },
    { rank: 2, username: "Amina", country: "Nigeria", score: 8900 },
    { rank: 3, username: "Thabo", country: "South Africa", score: 8400 },
    { rank: 4, username: "Fatou", country: "Senegal", score: 7800 },
    { rank: 5, username: "Jelani", country: "Kenya", score: 7200 },
    { rank: 6, username: "Nia", country: "Tanzania", score: 6700 },
    { rank: 7, username: "Chidi", country: "Nigeria", score: 6100 },
    { rank: 8, username: "Zola", country: "South Africa", score: 5500 },
    { rank: 9, username: "Rans", country: "Ghana", score: 4900 },
    { rank: 10, username: "Adama", country: "Mali", score: 4300 },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="leaderboard-container">
      {/* Balloons Animation */}
      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          className="balloon"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: "100vh", opacity: 1 }}
          transition={{
            duration: Math.random() * 5 + 3, // Random falling speed
            repeat: Infinity, // Keep falling
            delay: Math.random() * 2, // Random delay
          }}
        />
      ))}

      <h1 className="leaderboard-title">Leaderboard</h1>
      <p className="leaderboard-description">Top players based on their scores.</p>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Leaderboard Table */}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Country</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} className={index < 3 ? `top-${index + 1}` : ""}>
              <td>{user.rank}</td>
              <td>{user.username}</td>
              <td>{user.country}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;