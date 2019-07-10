const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollaboratorSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  read: { type: Boolean, required: true, default: false },
  write: { type: Boolean, required: true, default: false },
  admin: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('Collaborator', CollaboratorSchema);
