const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const passport = require('passport');
require('../config/passport')(passport);

// Get all users
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      user.list(req, res);
    } else {
      res.status(400).send({ message: 'Unauthorized request.' });
    }
  }
);

// Get a single user
router.get(
  '/:username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      user.show(req, res);
    } else {
      res.status(400).send({ message: 'Unauthorized request.' });
    }
  }
);

// Save a user
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      user.save(req, res);
    } else {
      res.status(400).send({ message: 'Unauthorized request.' });
    }
  }
);

// Edit a user
router.post('/:username', function(req, res) {
  const token = getToken(req.headers);
  if (token) {
    user.update(req, res);
  } else {
    res.status(400).send({ message: 'Unauthorized request.' });
  }
});

// Delete a user
router.delete('/:username', function(req, res, next) {
  if (token) {
    user.delete(req, res);
  } else {
    res.status(400).send({ message: 'Unauthorized request.' });
  }
});

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
