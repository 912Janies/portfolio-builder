const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' }, // Markdown content
  githubUrl: { type: String, default: '' }, // GitHub repo URL
  mediaUrl: { type: String, default: '' }, // Video or image URL
});

const PortfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  sections: [SectionSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);