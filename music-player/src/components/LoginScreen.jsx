// import './assets/styles/LoginScreen.css';
// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// import { loginUser } from '../services/api';

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const data = await loginUser(username, password);
//     alert('Login successful');
//     navigate('/music-player'); // Redirect to music player on success
//   } catch (error) {
//     alert(error);
//   }
// };

// function LoginScreen() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
  
//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username && password) {
//       onLogin();
//     } else {
//       alert("Please fill in both fields.");
//     }
//   };
//   const SwitchToSignup = () =>{
//     navigate("/signup");
//   }
//   return (
//     <div id="login-screen" className="screen active">
//       <form id="login-form" onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <input
//           type="text"
//           placeholder="Enter Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//         <p>
//           Don't have an account?{" "}
//           <span className="link" onClick={SwitchToSignup}>
//             Sign up here.
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default LoginScreen;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from '../services/api';
// import './assets/styles/LoginScreen.css';

// const LoginScreen = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (username && password) {
//       try {
//         const data = await loginUser(username, password);
//         alert(`Welcome, ${data.username || "User"}!`);
//         navigate("/music-player");
//       } catch (err) {
//         alert(err); // Show error message from API
//       }
//     } else {
//       alert("Please fill in both fields.");
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <a href="/signup">Sign up here</a>
//       </p>
//     </div>
//   );
// };

// export default LoginScreen;


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
