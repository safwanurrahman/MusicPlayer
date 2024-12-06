import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import MusicPlayer from "./components/MusicPlayer";
// import "./assets/styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route for Login Screen */}
          <Route path="/" element={<LoginScreen />} />

          {/* Route for Signup Screen */}
          <Route path="/signup" element={<SignupScreen />} />
    
          {/* Route for Music Player */}
          <Route path="/music-player" element={<MusicPlayer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

