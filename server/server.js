const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Portfolio = require('./models/Portfolio');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/portfoliobuilder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Portfolio Builder API');
});

// Get all portfolios for a user
app.get('/api/portfolios', async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: 'test-user' });
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch portfolios' });
  }
});

// Create a new portfolio
app.post('/api/portfolios', async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save portfolio' });
  }
});

// Update an existing portfolio
app.put('/api/portfolios/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update portfolio' });
  }
});

// Delete a portfolio
app.delete('/api/portfolios/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json({ message: 'Portfolio deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete portfolio' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));