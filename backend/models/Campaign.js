const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ['sales', 'leads', 'clicks', 'impressions'], required: true },
  budget: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  reward: { type: Number, required: true },
  status: { type: String, enum: ['active', 'paused', 'completed'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);
