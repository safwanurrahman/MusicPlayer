const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const userRoutes = require('./user'); 
const songsRouter = require('./songs');
const songControllerRouter = require('./controllers/songController');
const db = require("./config/db");
const app = express();
const PORT = 5000;


// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Use the user routes
app.use('/api/users', userRoutes);  

app.use('/songs', songsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
