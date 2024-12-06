


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/api';
import './assets/styles/LoginScreen.css';  // Make sure this path is correct

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const data = await loginUser(username, password);
        alert(`Welcome, ${data.username || "User"}!`);
        navigate("/music-player");
      } catch (err) {
        alert(err); // Show error message from API
      }
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div id="login-screen">
      <form id="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
};

export default LoginScreen;
