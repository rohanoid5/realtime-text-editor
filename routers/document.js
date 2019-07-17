const express = require('express');
const router = express.Router();
const document = require('../controllers/document');
const passport = require('passport');
const util = require('../util');
const getToken = util.getToken;
require('../config/passport')(passport);

// Get all documents
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      document.list(req, res);
    } else {
      res.status(400).send({ message: 'Unauthorized request.' });
    }
  }
);

// Get a single document
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      document.show(req, res);
    } else {
      res.status(400).send({ message: 'Unauthorized request.' });
    }
  }
);

// Save a document
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      document.save(req, res);
    } else {
      res.status(400).send({ message: 'Unauthorized request.' });
    }
  }
);

// Edit a document
router.post('/:id', passport.authenticate('jwt', { session: false }), function(
  req,
  res
) {
  const token = getToken(req.headers);
  if (token) {
    document.update(req, res);
  } else {
    res.status(400).send({ message: 'Unauthorized request.' });
  }
});

// Delete a document
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    const token = getToken(req.headers);
    if (token) {
      document.delete(req, res);
    } else {
      res.status(400).send({ message: 'Unauthorized request.' });
    }
  }
);

module.exports = router;
