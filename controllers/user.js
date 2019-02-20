const mongoose = require('mongoose');
const User = require('../models/user');

const userController = {};

// Show list of users
userController.list = function(req, res) {
  User.find({}).exec(function(err, users) {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      res.status(200).json({ users, message: 'Operation successful!' });
    }
  });
};

// Show user by username
userController.show = function(req, res) {
  User.findOne({ username: req.params.username }).exec(function(err, user) {
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
userController.create = function(req, res) {
  // res.render('../views/users/create');
};

// Save new user
userController.save = function(req, res) {
  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      res.status(200).json({ user, message: 'Operation successful!' });
    }
  });
};

// Update an user
userController.update = function(req, res) {
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

// Delete an user
userController.delete = function(req, res) {
  User.remove({ username: req.params.username }, err => {
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

module.exports = userController;
