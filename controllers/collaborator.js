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
collaboratorController.save = async (req, res) => {
  const { query } = req;
  const { userId, documentId } = query;
  try {
    if (userId && documentId) {
      const collaborator = new Collaborator({
        _id: userId,
        document: documentId,
        ...req.body
      });
      let user = await User.findById(userId).exec();
      if (!user) {
        res.status(400).json({ error: { message: 'No user found' } });
      } else {
        let document = await Document.findOne({ _id: documentId }).exec();
        if (!document) {
          res.status(400).json({ error: { message: 'No document found' } });
        } else {
          if (String(document.author) === String(req.user._id)) {
            if (document.collaborators.indexOf(userId) === -1) {
              document.collaborators.push(userId);
              await document.save();
              await collaborator.save();
              res.status(200).json({
                collaborator,
                message: 'Operation successful!'
              });
            } else {
              res.status(400).json({
                error: {
                  message: 'Collaborator for this document already exists'
                }
              });
            }
          } else {
            res.status(400).json({
              error: {
                message:
                  "You've tried to add a collaborator to a document you didn't create."
              }
            });
          }
        }
      }
    } else {
      res.status(400).json({
        error: { message: "You didn't provide userId &/or documentId" }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: { message: error.message }
    });
  }
};

// Update a collaborator
collaboratorController.update = async (req, res) => {
  try {
    let collaborator = await Collaborator.findById(req.params.id).exec();
    if (collaborator) {
      collaborator.user = req.body.user || collaborator.user;
      collaborator.read = req.body.read || collaborator.read;
      collaborator.write = req.body.write || collaborator.write;
      collaborator.admin = req.body.admin || collaborator.admin;
      await collaborator.save();
      res.status(200).json({
        collaborator: collaborator,
        message: 'Operation successful!'
      });
    } else {
      res.status(400).json({ message: 'No collaborator found' });
    }
  } catch (error) {
    res.status(400).json({
      error: { message: error.message }
    });
  }
};

// Delete a collaborator
collaboratorController.delete = async (req, res) => {
  const collaboratorId = req.params.id;
  try {
    let collaborator = await Collaborator.findById({
      _id: collaboratorId
    }).exec();
    if (collaborator) {
      let document = await Document.findById(collaborator.document).exec();
      if (!document) {
        res.status(400).json({ error: { message: 'No document found' } });
      } else {
        document.collaborators = document.collaborators.filter(id => {
          return String(id) !== collaboratorId;
        });
        await document.save();
        await Collaborator.deleteOne({ _id: collaboratorId });
        res.status(200).json({
          collaborator: 'Collaborator has been deleted',
          message: 'Operation successful!'
        });
      }
    } else {
      res.status(400).json({ error: { message: 'No collaborator found' } });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = collaboratorController;
