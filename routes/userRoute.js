const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

// user register endpoint

router.post('/register',registerUser)

// user login endpoint

router.post('/login',loginUser)

// current user endpoint

router.get('/current',validateToken, currentUser)

module.exports = router;