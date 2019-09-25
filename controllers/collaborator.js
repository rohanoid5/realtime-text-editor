const mongoose = require('mongoose');
const Types = mongoose.Types;
const Collaborator = require('../models/collaborator');
const User = require('../models/user');
const Document = require('../models/document');

const collaboratorController = {};

// Show list of collaborators
collaboratorController.list = (req, res) => {
  Collaborator.find({}).exec((err, collaborator) => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      res.status(200).json({ collaborator, message: 'Operation successful!' });
    }
  });
};

// Show collaborator by _id
collaboratorController.show = (req, res) => {
  Collaborator.findOne({ _id: req.params.id }).exec((err, collaborator) => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      if (collaborator) {
        res
          .status(200)
          .json({ collaborator, message: 'Operation successful!' });
      } else {
        res.status(400).json({ message: 'No collaborator found' });
      }
    }
  });
};

// Save new collaborator
collaboratorController.save = (req, res) => {
  const { query } = req;
  const { userId, documentId } = query;
  if (query && userId) {
    User.findById(userId)
      .exec()
      .then(user => {
        if (!user) {
          throw new Error('Invalid user_id provided');
        } else {
          if (query && documentId) {
            return Document.findOne({ _id: documentId }).exec();
          } else {
            throw new Error("You didn't provide a document Id");
          }
        }
      })
      // .catch(err => err)
      .then(document => {
        if (!document) {
          throw new Error('Invalid document Id provided');
        } else {
          if (String(document.author) === String(req.user._id)) {
            if (document.collaborators.indexOf(userId) === -1) {
              document.collaborators.push(userId);
              return document.save();
            } else {
              throw new Error('Collaborator for this document already exists');
            }
          } else {
            throw new Error(
              "You've tried to add a collaborator to a document you didn't create."
            );
          }
        }
      })
      // .catch(err => err)
      .then(() => {
        let collaborator = new Collaborator({
          _id: userId,
          document: documentId,
          ...req.body
        });
        return collaborator.save();
      })
      .then(collaborator => {
        res.status(200).json({
          collaborator,
          message: 'Operation successful!'
        });
      })
      .catch(err => {
        res.status(400).json({ err, message: 'Operation failed!' });
      });
  } else {
    res.status(400).json({ message: "You didn't provide a user Id" });
  }
};

// Update a collaborator
collaboratorController.update = (req, res) => {
  Collaborator.findById(req.params.id)
    .exec()
    .then(collaborator => {
      if (collaborator) {
        collaborator.user = req.body.user || collaborator.user;
        collaborator.read = req.body.read || collaborator.read;
        collaborator.write = req.body.write || collaborator.write;
        collaborator.admin = req.body.admin || collaborator.admin;
        return collaborator.save();
      } else {
        res.status(400).json({ message: 'No collaborator found' });
      }
    })
    .then(collaborator => {
      res.status(200).json({
        collaborator: collaborator,
        message: 'Operation successful!'
      });
    })
    .catch(err => res.status(400).json({ err, message: 'Operation failed!' }));
};

// Delete a collaborator
collaboratorController.delete = (req, res) => {
  const collaboratorId = req.params.id;
  Collaborator.findById({ _id: collaboratorId })
    .exec()
    .then(collaborator => {
      if (!collaborator) {
        res.status(400).json({ message: 'No collaborator found' });
      } else {
        return Document.findById(collaborator.document).exec();
      }
    })
    .then(document => {
      document.collaborators = document.collaborators.filter(id => {
        return String(id) !== collaboratorId;
      });
      return document.save();
    })
    .then(() => {
      return Collaborator.deleteOne({ _id: collaboratorId });
    })
    .then(() => {
      res.status(200).json({
        collaborator: 'Collaborator has been deleted',
        message: 'Operation successful!'
      });
    })
    .catch(err => res.status(400).json({ err, message: 'Operation failed!' }));
};

module.exports = collaboratorController;
