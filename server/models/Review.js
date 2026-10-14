const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    details: { type: String, trim: true, default: 'Local Resident' },
    timeAgo: { type: String, trim: true, default: 'Recently' },
    text: { type: String, required: true, trim: true },
    ownerResponse: { type: String, trim: true },
    isApproved: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
