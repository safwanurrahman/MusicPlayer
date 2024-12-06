const express = require('express');
const router = express.Router();
const db = require("./config/db");

// Route to check if the user route is working
router.get('/', (req, res) => {
  res.send('User route works!');
});

// POST route to create a user
router.post('/create', (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // First, check if the username already exists
  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      console.error('Database error: ', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      // If user exists, send an error message
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Query to insert the new user into the database
    const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(insertUserQuery, [username, password], (err, results) => {
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
});

// POST route to handle user login
router.post('/login', (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Query to check if the user exists in the database
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err.message);
      return res.status(500).json({ error: 'Failed to login' });
    }

    if (results.length > 0) {
      // Login successful
      res.status(200).json({ message: 'Login successful', userId: results[0].id });
    } else {
      // Login failed
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

module.exports = router; // Export the router to be used in server.js
