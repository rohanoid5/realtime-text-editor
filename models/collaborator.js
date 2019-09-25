const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollaboratorSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'User' },
  document: { type: Schema.Types.ObjectId, ref: 'Document' },
  read: { type: Boolean, required: true, default: false },
  write: { type: Boolean, required: true, default: false },
  admin: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('Collaborator', CollaboratorSchema);
