const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // Optional: For password hashing

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
  db.query(query, [username], async (err, results) => {
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



