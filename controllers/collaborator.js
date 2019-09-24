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
  let collaboratorId = new Types.ObjectId();
  let { query } = req;
  if (query && query.userId) {
    User.findById(query.userId)
      .exec()
      .then(user => {
        if (!user) {
          res.status(400).json({ message: 'Invalid user_id provided' });
        } else {
          if (query && query.document) {
            return Document.findOne({ _id: query.document }).exec();
          } else {
            res
              .status(400)
              .json({ message: "You didn't provide a document Id" });
          }
        }
      })
      .then(document => {
        if (!document) {
          res.status(400).json({ message: 'Invalid document Id provided' });
        } else {
          if (document.collaborators.indexOf(collaboratorId) === -1) {
            document.collaborators.push(collaboratorId);
            return document.save();
          } else {
            res
              .status(400)
              .json({
                message: 'Collaborator for this document already exists'
              });
          }
        }
      })
      .then(() => {
        let collaborator = new Collaborator({
          _id: collaboratorId,
          user: query.userId,
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

// collaboratorController.save = (req, res) => {
//   User.findById(req.body.user, (err, user) => {
//     if (err) {
//       res.status(400).json({ err, message: 'Operation failed!' });
//     } else {
//       if (user) {
//         Collaborator.findOne({ user: user._id }, (err, foundCollaborator) => {
//           if (err) {
//             res.status(400).json({ err, message: 'Operation failed!' });
//           } else {
//             if (foundCollaborator) {
//               res
//                 .status(400)
//                 .json({ message: 'Collaborator with same id already exists' });
//             } else {
//               let collaborator = new Collaborator({
//                 _id: new Types.ObjectId(),
//                 user: user._id,
//                 ...req.body
//               });
//               if (req.query && req.query.document) {
//                 Document.findOne(
//                   { _id: req.query.document },
//                   (err, foundDocument) => {
//                     if (err) {
//                       res
//                         .status(400)
//                         .json({ err, message: 'Operation failed!' });
//                     } else {
//                       if (!foundDocument) {
//                         res
//                           .status(400)
//                           .json({ message: 'Invalid document Id provided' });
//                       } else {
//                         foundDocument.collaborators.push(collaborator._id);
//                         foundDocument.save(err => {
//                           if (err) {
//                             res
//                               .status(400)
//                               .json({ err, message: 'Operation failed!' });
//                           } else {
//                             collaborator.save(err => {
//                               if (err) {
//                                 res
//                                   .status(400)
//                                   .json({ err, message: 'Operation failed!' });
//                               } else {
//                                 res.status(200).json({
//                                   collaborator,
//                                   message: 'Operation successful!'
//                                 });
//                               }
//                             });
//                           }
//                         });
//                       }
//                     }
//                   }
//                 );
//               } else {
//                 res
//                   .status(400)
//                   .json({ message: "You didn't provide a document Id" });
//               }
//             }
//           }
//         });
//       } else {
//         res.status(400).json({ message: 'Invalid user_id provided' });
//       }
//     }
//   });
// };

// Update a collaborator
collaboratorController.update = (req, res) => {
  Collaborator.findById({ _id: req.params.id }, (err, collaborator) => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      if (collaborator) {
        collaborator.user = req.body.user || collaborator.user;
        collaborator.read = req.body.read || collaborator.read;
        collaborator.write = req.body.write || collaborator.write;
        collaborator.admin = req.body.admin || collaborator.admin;
        collaborator.save((err, newCollaborator) => {
          if (err) {
            res.status(400).json({ err, message: 'Operation failed!' });
          } else {
            res.status(200).json({
              collaborator: newCollaborator,
              message: 'Operation successful!'
            });
          }
        });
      } else {
        res.status(400).json({ message: 'No collaborator found' });
      }
    }
  });
};

// Delete a collaborator
collaboratorController.delete = (req, res) => {
  Collaborator.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      res.status(200).json({
        collaborator: 'Collaborator has been deleted',
        message: 'Operation successful!'
      });
    }
  });
};

module.exports = collaboratorController;
