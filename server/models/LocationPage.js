const mongoose = require('mongoose');

const locationPageSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    metaTitle: { type: String, required: true, trim: true },
    metaDescription: { type: String, required: true, trim: true },
    heroTitle: { type: String, required: true, trim: true },
    heroSubtitle: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    heroImage: { type: String, default: '/images/hero-man-cleaning-window.jpg' },
    localities: [{ type: String, trim: true }],
    priceTiers: [
      {
        label: { type: String, trim: true },
        price: { type: String, trim: true },
        note: { type: String, trim: true },
      },
    ],
    customFaqs: [
      {
        question: { type: String, trim: true },
        answer: { type: String, trim: true },
      },
    ],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LocationPage', locationPageSchema);
