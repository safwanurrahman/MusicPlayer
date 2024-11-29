const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL connection setup (Make sure to connect to the same database)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql69',
  database: 'musicplayerdb'
});

// Create User Route
router.post('/create', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error creating user:', err.message);
      res.status(500).json({ error: 'Failed to create user' });
    } else {
      res.json({ message: 'User created successfully', userId: results.insertId });
    }
  });
});

module.exports = router;
