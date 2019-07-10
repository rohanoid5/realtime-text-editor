const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  collaborators: [{ type: Schema.Types.ObjectId, ref: 'Collaborator' }],
  title: { type: String, required: true },
  content: { type: String, default: '' },
  updated_at: { type: Date },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);
