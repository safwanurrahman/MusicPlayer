const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require("./config/db");

router.get('/', (req, res) => {
  res.send('User route works!');
});

// POST route to create a user
router.post('/create', (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Query to insert user into the database
  const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, results) => {
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

// POST route to handle user login
router.post('/login', (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Query to check if the user exists in the database
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
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

// GET route to get all users (optional)
router.get('/allusers', (req, res) => {
  const query = 'SELECT * FROM user';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(results); // Return all users
  });
});

module.exports = router; // Export the router to be used in server.js
