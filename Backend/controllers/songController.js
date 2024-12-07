/// songController.js
const db = require('../config/db');  // Assuming you have a db.js file to connect to MySQL

// Add a new song to the playlist
exports.addSong = (req, res) => {
  const { title, artist, duration, releaseYear, songURL } = req.body;

  if (!title || !artist) {
    return res.status(400).json({ error: 'Title and Artist are required' });
  }

  const songDuration = duration || null;
  const songReleaseYear = releaseYear || null;
  const songSongURL = songURL || null;

  const query = 'INSERT INTO Song (Title, Artist, Duration, ReleaseYear, SongURL) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, artist, songDuration, songReleaseYear, songSongURL], (err, results) => {
    if (err) {
      console.error('Error adding song:', err.message);
      return res.status(500).json({ error: 'Failed to add song' });
    }

    res.status(201).json({
      message: 'Song added successfully',
      songId: results.insertId,
      song: { title, artist, duration: songDuration, releaseYear: songReleaseYear, songURL: songSongURL },
    });
  });
};

// Delete a song from the playlist based on title or other unique identifiers
exports.deleteSong = (req, res) => {
  const { title, songID } = req.body;

 // Delete a song based on songID
exports.deleteSong = (req, res) => {
  const { songID } = req.params;  // Get songID from the URL

  // Validate input (Ensure songID is provided)
  if (!songID) {
    return res.status(400).json({ error: 'Song ID is required to delete' });
  }

  // Query to delete the song based on songID
  const query = 'DELETE FROM Song WHERE SongID = ?';

  db.query(query, [songID], (err, results) => {
    if (err) {
      console.error('Error deleting song:', err.message);
      return res.status(500).json({ error: 'Failed to delete song' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.status(200).json({
      message: 'Song deleted successfully',
      songID: songID,  // Returning the ID of the deleted song
    });
  });
};
}