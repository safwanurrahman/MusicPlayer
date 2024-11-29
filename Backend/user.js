// user.js (inside Backend folder)

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql69',
  database: 'musicplayerdb',
});

// POST route to create a user
router.post('/create', (req, res) => {
  const { username, password } = req.body;  // Destructure username and password from request body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Query to insert user into the database
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error creating user:', err.message);
      return res.status(500).json({ error: 'Failed to create user' });
    }
    res.status(201).json({
      message: 'User created successfully',
      userId: results.insertId,
    });
  });
});

// GET route to get all users (optional)
router.get('/', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(results); // Return all users
  });
});

module.exports = router;  // Export the router to be used in server.js
