const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    benefits: [{ type: String, trim: true }],
    suitableFor: [{ type: String, trim: true }],
    process: [{ type: String, trim: true }],
    icon: { type: String, default: 'Sparkles' },
    image: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
