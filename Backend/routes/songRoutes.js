// songRoutes.js
const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

// Add a new song to the playlist
router.post('/add', songController.addSong);


// Route to delete a song by ID
router.delete('/delete/:songId', songController.deleteSong);

module.exports = router;


