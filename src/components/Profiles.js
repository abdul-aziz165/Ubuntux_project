import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profiles = ({ user }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [score, setScore] = useState(0);
  const [ubxCoins, setUbxCoins] = useState(0);
  const [profilePicture, setProfilePicture] = useState("default-avatar.png");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.username) {
      navigate("/login");
    } else {
      fetchProfile(storedUser.username);
      fetchUbxCoins(storedUser.walletAddress);
    }
  }, [navigate]);

  const fetchProfile = async (username) => {
    try {
      const response = await axios.post("http://localhost/get-profile.php", { username });
      if (response.data.success) {
        setUsername(username);
        setEmail(response.data.email);
        setWalletAddress(response.data.wallet_address);
        setScore(response.data.score);
        setProfilePicture(response.data.profile_picture || "default-avatar.png");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchUbxCoins = async (walletAddress) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contractAddress = "0xD07e05c09658877fD46BBb46030F1A564FC2B325";
      const abi = [/* Your contract ABI */];
      const contract = new web3.eth.Contract(abi, contractAddress);
      try {
        const balance = await contract.methods.getBalance().call({ from: walletAddress });
        setUbxCoins(balance);
      } catch (error) {
        console.error("Error fetching UBX coins:", error);
      }
    }
  };

  const handleSave = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    try {
      await axios.post("http://localhost/update-wallet.php", {
        username: storedUser.username,
        wallet: walletAddress,
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating wallet:", error);
    }
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-header">
        <img src={profilePicture} alt="Profile" className="profile-picture" />
        <input type="file" accept="image/*" onChange={handleProfilePictureUpload} className="upload-btn" />
      </div>
      <div className="profile-details">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Score:</strong> {score}</p>
        <p><strong>UBX Coins:</strong> {ubxCoins}</p>
        {editMode ? (
          <div className="edit-mode">
            <label>Wallet Address:</label>
            <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <p><strong>Wallet Address:</strong> {walletAddress}</p>
        )}
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Profiles;
