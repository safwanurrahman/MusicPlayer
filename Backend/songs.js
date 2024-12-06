const express = require('express');
const mysql = require('mysql2');
const db = require("./config/db");
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Songs route works!');
});

module.exports = router;


// Fetch all songs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM songs');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching songs:', error.message);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

// Add a new song
router.post('/', async (req, res) => {
  const { title, artist, album } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO songs (title, artist, album) VALUES (?, ?, ?)',
      [title, artist, album]
    );
    res.status(201).json({ message: 'Song added successfully', songId: result.insertId });
  } catch (error) {
    console.error('Error adding song:', error.message);
    res.status(500).json({ error: 'Failed to add song' });
  }
});

// Update a song
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, artist, album } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE songs SET title = ?, artist = ?, album = ? WHERE id = ?',
      [title, artist, album, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json({ message: 'Song updated successfully' });
  } catch (error) {
    console.error('Error updating song:', error.message);
    res.status(500).json({ error: 'Failed to update song' });
  }
});

// Delete a song
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM songs WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error('Error deleting song:', error.message);
    res.status(500).json({ error: 'Failed to delete song' });
  }
});

module.exports = router;
