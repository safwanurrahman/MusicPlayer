import './assets/styles/LoginScreen.css';
import React, { useState } from "react";

function LoginScreen({ onLogin, onSwitchToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div id="login-screen" className="screen active">
      <form id="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <span className="link" onClick={onSwitchToSignup}>
            Sign up here.
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginScreen;
