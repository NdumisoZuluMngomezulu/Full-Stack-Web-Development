const express = require('express'); //importing express framework to create a router for authentication routes
const router = express.Router();
const { signup, login } = require('../controllers/authController');
router.post('/signup', signup);
router.post('/login', login);
module.exports = router;