const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // Optional: For password hashing

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql69',
  database: 'musicplayerdb',
});

// POST route to authorize login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
   //^ Destructure username and password from request body^

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Query to check if the user exists
  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Error during login:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      // If no user is found
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = results[0]; // User data from the database

    // Optional: Check hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // login.js



// Function to get user profile based on username
function getProfile(username) {
  // Simulate fetching user profile
  const user = users.find(user => user.username === username);
  if (user) {
      return {
          success: true,
          profile: {
              name: user.name,
              email: user.email,
              age: user.age,
          },
      };
  } else {
      return {
          success: false,
          message: "User not found",
      };
  }
}

    // Login successful, send response
    res.status(200).json({
      message: 'Login successful',
      userId: user.id,
      username: user.username,
    });
  });
});

module.exports = router;
module.exports = { getProfile };


// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql2');
// const bcrypt = require('bcrypt'); // For password hashing
// const jwt = require('jsonwebtoken'); // For JWT
// const SECRET_KEY = 'your_secret_key'; // Replace with a secure key

// // MySQL database connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'mysql69',
//   database: 'musicplayerdb',
// });

// // POST route to authorize login and issue JWT
// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Validate input
//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required' });
//   }

//   // Query to check if the user exists
//   const query = 'SELECT * FROM users WHERE username = ?';
//   connection.query(query, [username], async (err, results) => {
//     if (err) {
//       console.error('Error during login:', err.message);
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     if (results.length === 0) {
//       // If no user is found
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     const user = results[0]; // User data from the database

//     // Verify the hashed password using bcrypt
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         userId: user.id,
//         username: user.username,
//       },
//       SECRET_KEY,
//       { expiresIn: '1h' } // Token valid for 1 hour
//     );

//     // Login successful, send token in response
//     res.status(200).json({
//       message: 'Login successful',
//       token: token,
//     });
//   });
// });

// // Middleware to verify JWT
// function authenticateToken(req, res, next) {
//   const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
//   if (!token) {
//     return res.status(401).json({ error: 'Access denied, token missing' });
//   }

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid token' });
//     }
//     req.user = user; // Attach user info to the request
//     next();
//   });
// }

// // Route to get user profile using JWT
// router.get('/profile', authenticateToken, (req, res) => {
//   const query = 'SELECT id, username, name, email FROM users WHERE id = ?';
//   connection.query(query, [req.user.userId], (err, results) => {
//     if (err) {
//       console.error('Error fetching profile:', err.message);
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json({ profile: results[0] });
//   });
// });

// module.exports = router;
