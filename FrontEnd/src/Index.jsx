import React from "react";
import ReactDOM from "react-dom/client"; // For React 18+
import App from "./App"; // Import the App component
import "./assets/styles/index.css"; // Optional: Global styles if you have a base CSS

// Create a root element where the React app will be rendered
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the root div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
