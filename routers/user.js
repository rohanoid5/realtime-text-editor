const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

// Get all users
router.get('/', (req, res) => {
  user.list(req, res);
});

// Get a single user
router.get('/:username', (req, res) => {
  user.show(req, res);
});

// Save a user
router.post('/', (req, res) => {
  user.save(req, res);
});

// Edit a user
router.post('/:username', function(req, res) {
  user.update(req, res);
});

// Delete a user
router.delete('/:username', function(req, res, next) {
  user.delete(req, res);
});

module.exports = router;
