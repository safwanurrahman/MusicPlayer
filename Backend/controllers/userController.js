const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const db = require('../config/db');

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Query to check if the user exists
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user.id, username: user.username });
  });
};

// Register user
const registerUser = (req, res) => {
  const { username, password, email } = req.body;

  // Validate input
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  connection.query(query, [username, hashedPassword, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(201).json({ message: 'User registered successfully' });
  });
};

module.exports = { loginUser, registerUser };
