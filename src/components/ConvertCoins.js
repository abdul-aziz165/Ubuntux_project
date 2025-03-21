import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./ConvertCoins.css"; // Add styles

const ConvertCoins = ({ user }) => {
  const [score, setScore] = useState(100); // Example: User starts with 100 points
  const [points, setPoints] = useState(0);
  const [ubxCoins, setUbxCoins] = useState(0);

  const convertPointsToUBX = () => {
    const conversionRate = 0.1; // Example: 1 point = 0.1 UBX

    if (points <= 0) {
      alert("Please enter a valid number of points.");
      return;
    }

    if (points > score) {
      alert("You don't have enough points to convert!");
      return;
    }

    const convertedCoins = points * conversionRate;
    setScore((prevScore) => prevScore - points); // Deduct points from score
    setUbxCoins((prevCoins) => prevCoins + convertedCoins); // Add converted UBX
    alert(`Converted ${points} points to ${convertedCoins} UBX Coins!`);
    setPoints(0); // Reset input field
  };

  /*
  const convertPointsToUBXWithWeb3 = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const contractAddress = "0xD07e05c09658877fD46BBb46030F1A564FC2B325"; // Replace with your contract address
      const abi = [ Your contract ABI ];

      const contract = new web3.eth.Contract(abi, contractAddress);

      try {
        await contract.methods.convertPoints(points).send({ from: accounts[0] });
        alert("Points converted to UBX coins successfully!");
        const balance = await contract.methods.getBalance().call({ from: accounts[0] });
        setUbxCoins(balance);
      } catch (error) {
        console.error("Conversion failed:", error);
        alert("Conversion failed! See console for details.");
      }
    } else {
      alert("MetaMask is not installed. Please install it.");
    }
  };
  */

  return (
    <div className="convert-container">
      <h2>Convert Your Coins</h2>
      <p>Your Total Score: <strong>{score}</strong></p> {/* Display user's score */}
      <p>Exchange your earned tokens for rewards.</p>
      <div className="input-group">
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))} // Ensure number input
          placeholder="Enter points to convert"
        />
        <button onClick={convertPointsToUBX}>Convert Now</button>
      </div>
      <p>Your UBX Coins: {ubxCoins}</p>
    </div>
  );
};

export default ConvertCoins;
