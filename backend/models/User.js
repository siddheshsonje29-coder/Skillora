const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, sparse: true, lowercase: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String, select: false },
  googleId: { type: String, sparse: true },
  avatar: { type: String, default: '' },
  bio: { type: String, maxLength: 300 },
  college: { type: String },
  role: { type: String, enum: ['learner', 'teacher', 'both'], default: 'both' },
  plan: { type: String, enum: ['free', 'premium', 'pro'], default: 'free' },
  planExpiresAt: { type: Date },
  razorpaySubscriptionId: { type: String },

  skills_offered: [{
    name: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'expert'], default: 'beginner' },
    creditValue: { type: Number, default: 10 },
    sessionsCompleted: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 }
  }],

  skills_wanted: [{ type: String }],
  language_preference: { type: String, enum: ['english', 'hindi', 'marathi'], default: 'english' },

  credits: { type: Number, default: 50 },
  credits_earned: { type: Number, default: 0 },
  credits_spent: { type: Number, default: 0 },

  rating: { type: Number, default: 0 },
  rating_count: { type: Number, default: 0 },
  trust_score: { type: Number, default: 60, min: 0, max: 100 },

  sessions_completed: { type: Number, default: 0 },
  sessions_taught: { type: Number, default: 0 },
  completion_rate: { type: Number, default: 100 },

  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],

  availability: [{
    day: { type: String, enum: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
    slots: [{ start: String, end: String }]
  }],

  is_verified: { type: Boolean, default: false },
  is_phone_verified: { type: Boolean, default: false },
  is_banned: { type: Boolean, default: false },
  ban_reason: { type: String },

  refresh_token: { type: String, select: false },
  otp: { type: String, select: false },
  otp_expires: { type: Date, select: false },

  last_active: { type: Date, default: Date.now },
  streak: { type: Number, default: 0 },
  last_session_date: { type: Date },

  notifications_enabled: { type: Boolean, default: true },
  email_notifications: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
