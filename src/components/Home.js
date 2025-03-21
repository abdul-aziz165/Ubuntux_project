import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
      
        <img src="/images/uxlogo.png" alt="UbuntuX Logo" className="home-image" />
        <div className="text-content">
          <div className=".about-section h2"><h1>Welcome to UbuntuX</h1></div>
          <p>
            UbuntuX is a blockchain-powered educational game that merges entertainment, learning, and financial incentives.
          </p>
          <p>
            Africa's history is vast, diverse, and filled with untold stories. UbuntuX transforms history into an immersive, interactive experience that rewards players with digital assets on the blockchain.
          </p>
          <div className="button-group">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn">Sign Up</Link>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>About UbuntuX</h2>
        <p>UbuntuX is designed to make African history engaging, rewarding, and interactive.</p>
        <h3><i>Core features include:</i></h3>
        <ul>
          <li><strong>Interactive Storytelling:</strong> Embark on historical adventures, engaging with key moments, figures, and civilizations.</li>
          <li><strong>Quizzes & Puzzles:</strong> Fun challenges test players' knowledge and problem-solving skills.</li>
          <li><strong>Blockchain Rewards:</strong> Earn crypto tokens and NFTs for your in-game achievements.</li>
          <li><strong>Play-to-Earn Economy:</strong> A sustainable ecosystem where learning and financial incentives go hand in hand.</li>
          <li><strong>Cultural Preservation:</strong> Showcasing Africa’s rich heritage while making history more accessible.</li>
        </ul>
        <h3>Vision & Impact</h3>
        <p>
          UbuntuX is more than just a game—it’s a movement to educate, empower, and inspire. By integrating blockchain technology with history-based gameplay, the project aims to:
        </p>
        <ul>
          <li>✔ Make learning African history fun and interactive</li>
          <li>✔ Promote financial inclusion through blockchain rewards</li>
          <li>✔ Encourage cultural appreciation and knowledge sharing</li>
          <li>✔ Create a self-sustaining ecosystem where players benefit from their engagement</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
