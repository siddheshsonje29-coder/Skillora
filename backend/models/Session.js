const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  learner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skill: { type: String, required: true },
  credit_cost: { type: Number, required: true },
  duration_minutes: { type: Number, default: 60 },
  status: { type: String, enum: ['pending', 'accepted', 'active', 'completed', 'cancelled', 'no_show'], default: 'pending' },
  scheduled_at: { type: Date, required: true },
  started_at: { type: Date },
  ended_at: { type: Date },
  room_id: { type: String, unique: true, sparse: true },
  recording_url: { type: String },
  rating_by_learner: { type: Number, min: 1, max: 5 },
  rating_by_teacher: { type: Number, min: 1, max: 5 },
  feedback_by_learner: { type: String },
  feedback_by_teacher: { type: String },
  cancellation_reason: { type: String },
  cancelled_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  credit_transferred: { type: Boolean, default: false },
  chat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
