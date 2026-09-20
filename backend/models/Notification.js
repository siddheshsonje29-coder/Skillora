const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['session_request','session_accepted','session_cancelled','credit_received','badge_earned','match_found','rating_received','system'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String },
  is_read: { type: Boolean, default: false },
  metadata: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
