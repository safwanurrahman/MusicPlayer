const mysql = require('mysql2');

    // MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql69', // Replace with your database password
  database: 'musicplayerdb',
});

// Function to get all songs from the database
const getSongs = (req, res) => {
  // SQL query to fetch all songs
  const query = 'SELECT * FROM songs';
  
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching songs from the database',
      });
    }
    
    // Send the fetched songs as a JSON response
    res.status(200).json({
      success: true,
      songs: results,  // 'results' contains the songs from the database
    });
  });
};

// Function to add a new song to the database
const addSong = (req, res) => {
  const { title, artist } = req.body;

  // Validate input
  if (!title || !artist) {
    return res.status(400).json({
      success: false,
      message: 'Title and artist are required',
    });
  }

  // SQL query to insert a new song into the database
  const query = 'INSERT INTO songs (title, artist) VALUES (?, ?)';

  connection.query(query, [title, artist], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error adding song to the database',
      });
    }

    // Respond with success and the newly added song
    res.status(201).json({
      success: true,
      message: 'Song added successfully',
      song: {
        id: results.insertId, // The id generated for the new song
        title: title,
        artist: artist,
      },
    });
  });
};

module.exports = {
  addSong,
  getSongs,
};
