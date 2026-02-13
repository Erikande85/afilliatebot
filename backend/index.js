require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const campaignRoutes = require('./routes/campaigns');
const clawbotRoutes = require('./routes/clawbots');
const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/clawbots', clawbotRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to MongoDB (if URI provided)
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('No MONGODB_URI provided - running without database');
}

app.listen(PORT, () => {
  console.log(`DAAN Backend running on port ${PORT}`);
});
