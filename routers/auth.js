const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

// Signup a new user
router.post('/signup', (req, res) => {
  user.save(req, res);
});

// Login a new user
router.post('/signin', (req, res) => {
  user.login(req, res);
});

module.exports = router;
