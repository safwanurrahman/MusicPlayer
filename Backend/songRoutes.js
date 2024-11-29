const express = require('express');
const router = express.Router();
const { addSong, getSongs } = require('../controllers/songController');

// Define Routes
router.post('/add', addSong); // POST /songs/add
router.get('/', getSongs);    // GET /songs/

module.exports = router;
