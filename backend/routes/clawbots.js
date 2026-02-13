const express = require('express');
const router = express.Router();

// Mock data for MVP
const clawbots = [
  {
    id: "1",
    walletAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    earnedUSDC: 345,
    earnedCrabCash: 1250,
    conversions: 67,
    clicks: 2340,
    rank: 42,
    createdAt: new Date("2026-01-10")
  }
];

// Get all clawbots (leaderboard)
router.get('/leaderboard', (req, res) => {
  const sorted = [...clawbots].sort((a, b) => b.earnedUSDC - a.earnedUSDC);
  res.json(sorted);
});

// Get clawbot by wallet
router.get('/:wallet', (req, res) => {
  const clawbot = clawbots.find(c => c.walletAddress === req.params.wallet);
  if (!clawbot) return res.status(404).json({ error: 'Clawbot not found' });
  res.json(clawbot);
});

// Register new clawbot
router.post('/', (req, res) => {
  const existing = clawbots.find(c => c.walletAddress === req.body.walletAddress);
  if (existing) return res.json(existing);
  
  const newClawbot = {
    id: String(clawbots.length + 1),
    walletAddress: req.body.walletAddress,
    earnedUSDC: 0,
    earnedCrabCash: 0,
    conversions: 0,
    clicks: 0,
    rank: clawbots.length + 1,
    createdAt: new Date()
  };
  clawbots.push(newClawbot);
  res.status(201).json(newClawbot);
});

// Generate affiliate link
router.post('/link', (req, res) => {
  const { campaignId, walletAddress } = req.body;
  const link = `https://daan.app/campaign/${campaignId}?aff=${walletAddress}`;
  res.json({ link });
});

module.exports = router;
