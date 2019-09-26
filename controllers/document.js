const Document = require('../models/document');
const Collaborator = require('../models/collaborator');

const documentController = {};

// Show list of documents for an author
documentController.list = (req, res) => {
  Document.find({ author: req.user._id }).exec((err, document) => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      res.status(200).json({ document, message: 'Operation successful!' });
    }
  });
};

// Show document by _id for an author
documentController.show = (req, res) => {
  Document.findOne({ _id: req.params.id, author: req.user._id }).exec(
    (err, document) => {
      if (err) {
        res.status(400).json({ err, message: 'Operation failed!' });
      } else {
        if (document) {
          res.status(200).json({ document, message: 'Operation successful!' });
        } else {
          res.status(400).json({ message: 'No document found' });
        }
      }
    }
  );
};

// Save new document
documentController.save = (req, res) => {
  let document = new Document({
    author: req.user._id,
    collaborators: [],
    ...req.body
  });
  document.save(err => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      res.status(200).json({ document, message: 'Operation successful!' });
    }
  });
};

// Update a document
documentController.update = (req, res) => {
  Document.findById({ _id: req.params.id }, (err, document) => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      if (document) {
        document.author = req.body.author || document.author;
        if (req.body.collaborators) {
          Array.isArray(req.body.collaborators)
            ? (document.collaborators = document.collaborators.concat(
                req.body.collaborators
              ))
            : document.collaborators.push(req.body.collaborators);
        }
        document.collaborators =
          req.body.collaborators || document.collaborators;
        document.title = req.body.title || document.title;
        document.content = req.body.content || document.content;
        document.updated_at = Date.now();
        document.save((err, newDocument) => {
          if (err) {
            res.status(400).json({ err, message: 'Operation failed!' });
          } else {
            res.status(200).json({
              document: newDocument,
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

// Delete a document
documentController.delete = (req, res) => {
  Document.findOneAndDelete({ _id: req.params.id }, (err, document) => {
    if (err) {
      res.status(400).json({ err, message: 'Operation failed!' });
    } else {
      Collaborator.deleteMany({ _id: { $in: document.collaborators } }, err => {
        if (err) {
          res.status(400).json({ err, message: 'Operation failed!' });
        } else {
          res.status(200).json({
            document: 'Document has been deleted',
            message: 'Operation successful!'
          });
        }
      });
    }
  });
};

module.exports = documentController;
