const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const userRoutes = require('./user'); // Import the user routes
const songsRouter = require('./routes/songs'); // Importing songs routes

const app = express();
const PORT = 3000;

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql69',
  database: 'musicplayerdb',
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL database!');
});

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Use the user routes
app.use('/api/users', userRoutes);  // This will handle user-related requests

// Use the songs router for routes related to songs
app.use('/songs', songsRouter);

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello, Music Player!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
