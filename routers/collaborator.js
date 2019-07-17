const express = require('express');
const router = express.Router();
const collaborator = require('../controllers/collaborator');
const passport = require('passport');
const util = require('../util');
const getToken = util.getToken;
require('../config/passport')(passport);

// Get all collaborators
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      collaborator.list(req, res);
    } else {
      res.status(400).send({ message: 'Unauthorized request.' });
    }
  }
);

// Get a single collaborator
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      collaborator.show(req, res);
    } else {
      res.status(400).send({ message: 'Unauthorized request.' });
    }
  }
);

// Save a collaborator
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      collaborator.save(req, res);
    } else {
      res.status(400).send({ message: 'Unauthorized request.' });
    }
  }
);

// Edit a collaborator
router.post('/:id', passport.authenticate('jwt', { session: false }), function(
  req,
  res
) {
  const token = getToken(req.headers);
  if (token) {
    collaborator.update(req, res);
  } else {
    res.status(400).send({ message: 'Unauthorized request.' });
  }
});

// Delete a collaborator
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    const token = getToken(req.headers);
    if (token) {
      collaborator.delete(req, res);
    } else {
      res.status(400).send({ message: 'Unauthorized request.' });
    }
  }
);

module.exports = router;
