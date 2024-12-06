const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userController');

// POST /users/login
router.post('/login', loginUser);

// POST /users/register
router.post('/register', registerUser);

module.exports = router;
