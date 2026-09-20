const mongoose = require('mongoose');

const creditTxSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  balance_after: { type: Number, required: true },
  type: { type: String, enum: ['earned','spent','bonus','penalty','purchase','refund','admin_adjust'], required: true },
  description: { type: String, required: true },
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  razorpay_payment_id: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('CreditTransaction', creditTxSchema);
