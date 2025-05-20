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
}).then(() => console.log('Connected to MongoDB'));

app.get('/', (req, res) => res.send('Portfolio Builder API'));

app.get('/api/portfolios/:userId', async (req, res) => {
  const portfolios = await Portfolio.find({ userId: req.params.userId });
  res.json(portfolios);
});

app.post('/api/portfolios', async (req, res) => {
  const portfolio = new Portfolio(req.body);
  await portfolio.save();
  res.json(portfolio);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));