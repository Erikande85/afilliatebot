const express = require('express');
const router = express.Router();

// Mock data for MVP (no database needed)
const campaigns = [
  {
    id: "1",
    name: "Summer Sale 2026",
    client: "Acme Corp",
    url: "https://acme.com/summer",
    type: "sales",
    budget: 5000,
    spent: 2340,
    reward: 15,
    status: "active",
    createdAt: new Date("2026-01-15")
  },
  {
    id: "2",
    name: "New Product Launch",
    client: "TechStart",
    url: "https://techstart.io/product",
    type: "sales",
    budget: 10000,
    spent: 4500,
    reward: 25,
    status: "active",
    createdAt: new Date("2026-01-20")
  },
  {
    id: "3",
    name: "Holiday Promo",
    client: "ShopifyStore",
    url: "https://shopifystore.com/holiday",
    type: "sales",
    budget: 3000,
    spent: 3000,
    reward: 10,
    status: "completed",
    createdAt: new Date("2025-12-01")
  }
];

// Get all campaigns
router.get('/', (req, res) => {
  res.json(campaigns.filter(c => c.status === 'active'));
});

// Get single campaign
router.get('/:id', (req, res) => {
  const campaign = campaigns.find(c => c.id === req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
  res.json(campaign);
});

// Create campaign (client)
router.post('/', (req, res) => {
  const newCampaign = {
    id: String(campaigns.length + 1),
    ...req.body,
    spent: 0,
    status: 'active',
    createdAt: new Date()
  };
  campaigns.push(newCampaign);
  res.status(201).json(newCampaign);
});

// Update campaign
router.put('/:id', (req, res) => {
  const index = campaigns.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Campaign not found' });
  campaigns[index] = { ...campaigns[index], ...req.body };
  res.json(campaigns[index]);
});

module.exports = router;
