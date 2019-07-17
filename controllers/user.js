const User = require('../models/user');
const Collaborator = require('../models/collaborator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);

const userController = {};

// Show list of users
userController.list = (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      res.status(200).json({ users, message: 'Operation successful!' });
    }
  });
};

// Show user by username
userController.show = (req, res) => {
  User.findOne({ username: req.params.username }).exec((err, user) => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      if (user) {
        res.status(200).json({ user, message: 'Operation successful!' });
      } else {
        res.status(400).json({ message: 'No user found' });
      }
    }
  });
};

// Create new user
userController.create = (req, res) => {
  // res.render('../views/users/create');
};

// Save new user
userController.save = (req, res) => {
  var user = new User(req.body);

  user.save(err => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      res.status(200).json({ user, message: 'Operation successful!' });
    }
  });
};

// Update a user
userController.update = (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      if (user) {
        user.name = req.body.name || user.name;
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.save((err, newUser) => {
          if (err) {
            res.status(400).json({ err, message: 'Operation failed!' });
          } else {
            res
              .status(200)
              .json({ user: newUser, message: 'Operation successful!' });
          }
        });
      } else {
        res.status(400).json({ message: 'No user found' });
      }
    }
  });
};

// Delete a user
userController.delete = (req, res) => {
  User.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      res.status(200).json({
        user: 'User has been deleted',
        message: 'Operation successful!'
      });
    }
  });
};

// Login a user
userController.login = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      if (!user) {
        res
          .status(400)
          .json({ message: 'Authentication failed. User not found.' });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const token = jwt.sign(user.toJSON(), config.secret, {
              expiresIn: 604800
            });
            // return the information including token as JSON
            res.status(200).json({ success: true, token: 'JWT ' + token });
          } else {
            res
              .status(400)
              .json({ message: 'Authentication failed. Wrong password.' });
          }
        });
      }
    }
  });
};

module.exports = userController;
