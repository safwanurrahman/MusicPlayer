import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/api';
import './assets/styles/LoginScreen.css';  // Ensure the correct path to your CSS file

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for submitting
  const [error, setError] = useState(""); // To capture errors during login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const data = await loginUser(username, password); // Get login response
        localStorage.setItem('authToken', data.token); // Save token to localStorage
        navigate("/music-player"); // Navigate to music player page
      } catch (err) {
        console.error("Login failed", err);
        alert("Login failed. Please try again.");
      }
    }
  };

    setLoading(true); // Show loading indicator
    try {
      const data = await loginUser(username, password);
      // Check if the response contains a valid username or message
      const usernameToDisplay = data.username || data.message || "User"; // Default to "User" if no username is found
      alert(`Welcome, ${usernameToDisplay}!`);
      navigate("/music-player");
    } catch (err) {
      setError(err.message || "An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // Hide loading indicator once done
    }
  };

  return (
    <div id="login-screen">
      <form id="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>} {/* Show error message */}
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading} // Disable input fields during loading
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading} // Disable input fields during loading
        />
        <button type="submit" disabled={loading}> {/* Disable button while loading */}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
};

export default LoginScreen;
