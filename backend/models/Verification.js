const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillName: { type: String, required: true },
  description: { type: String, required: true },
  proofLinks: [{ type: String }],
  proofFiles: [{ type: String }], // Paths to uploaded files
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNotes: { type: String },
  reviewedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Verification', verificationSchema);
