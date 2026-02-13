const mongoose = require('mongoose');

const clawbotSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  earnedUSDC: { type: Number, default: 0 },
  earnedCrabCash: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Clawbot', clawbotSchema);
