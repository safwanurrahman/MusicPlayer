// import './assets/styles/SignupScreen.css';
// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// import { signupUser } from '../services/api';

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const data = await signupUser(username, password);
//     alert('Signup successful');
//     navigate('/'); // Redirect to login screen on success
//   } catch (error) {
//     alert(error);
//   }
// };

// function SignupScreen() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!username || !password || !confirmPassword) {
//       alert("Please fill in all fields.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }
//     onSignup();
//   };
//   const SwitchToLogin = () =>{
//     navigate("/");
//   }

//   return (
//     <div id="signup-screen" className="screen active">
//       <form id="signup-form" onSubmit={handleSubmit}>
//         <h2>Signup</h2>
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
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Signup</button>
//         <p>
//           Already have an account?{" "}
//           <span className="link" onClick={SwitchToLogin}>
//             Log in here.
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default SignupScreen;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from '../services/api';
import './assets/styles/SignupScreen.css';

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    try {
      const data = await signupUser(username, password);
      alert(`Welcome, ${data.username || "User"}!`);
      navigate("/music-player");
    } catch (err) {
      alert(err); // Show error message from API
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
