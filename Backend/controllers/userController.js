const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const db = require('../config/db');
const jwt = require("jsonwebtoken");

// Login user
const loginUser = (req, res) => {
  const { username, password } = req.body;
  console.log(username + password);

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const query = 'SELECT * FROM user WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Error during login:', err.message);
      return res.status(500).json({ error: 'Failed to login' });
    }
    console.log(results[0]);
    if (results.length > 0) {
      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.Password);
      if (isMatch) {
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id, username: user.username }, "JWT_SECRET", { expiresIn: '1h' });

        res.status(200).json({ 
          message: 'Login successful', 
          token 
        });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
}

// Register user
const registerUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const checkUserQuery = 'SELECT * FROM user WHERE username = ?';
    db.query(checkUserQuery, [username], async (err, results) => {
      if (err) {
        console.error('Database error: ', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const insertUserQuery = 'INSERT INTO user (username, Password) VALUES (?, ?)';
      db.query(insertUserQuery, [username, hashedPassword], (err, results) => {
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
  } catch (error) {
    console.error('Error during user creation:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

module.exports = { loginUser, registerUser };
