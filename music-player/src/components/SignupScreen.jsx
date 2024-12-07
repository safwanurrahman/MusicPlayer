import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import './assets/styles/SignupScreen.css';

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Send POST request to the backend using Axios
      const response = await axios.post("http://localhost:5000/api/users/register", {
        username,
        password,
      });

      // Handle success
      alert(`Welcome, ${response.data.userId ? username : "User"}!`);
      navigate("/music-player"); // Redirect to the music player page
    } catch (err) {
      // Handle error
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const SwitchToLogin = () => {
    navigate("/");
  };

  return (
    <div id="signup-screen" className="screen active">
      <form id="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
        <p>
          Already have an account?{" "}
          <span className="link" onClick={SwitchToLogin}>
            Log in here.
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupScreen;
