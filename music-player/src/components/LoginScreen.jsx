import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Using axios for API calls
import './assets/styles/LoginScreen.css'; // Ensure the correct path to your CSS file

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for submitting
  const [error, setError] = useState(""); // To capture errors during login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      setLoading(true); // Show loading indicator
      setError(""); // Reset error message

      try {
        // API call to login
        const response = await axios.post('http://localhost:5000/api/users/login', {
          username,
          password,
        });
        
        // Extract data from response
        const { token, message } = response.data;
        localStorage.setItem('authToken', token); // Save token to localStorage
        alert(message || `Welcome, ${username}!`); // Greet the user
        navigate("/music-player"); // Navigate to the music player page
      } catch (err) {
        console.error("Login failed", err.response?.data || err.message);
        // Set error based on backend response
        setError(err.response?.data?.error || "Login failed. Please try again.");
      } finally {
        setLoading(false); // Hide loading indicator once done
      }
    } else {
      setError("Please fill in both fields.");
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
