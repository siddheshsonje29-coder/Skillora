const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String },
  type: { type: String, enum: ['text','file','code','image','system'], default: 'text' },
  file_url: { type: String },
  file_name: { type: String },
  code_language: { type: String },
  is_read: { type: Boolean, default: false },
  read_at: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
