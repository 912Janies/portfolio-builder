const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

router.post('/', async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.params.userId });
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;