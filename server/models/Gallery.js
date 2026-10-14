const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    category: {
      type: String,
      enum: [
        'Full Home Cleaning',
        'Kitchen Cleaning',
        'Bathroom Cleaning',
        'Sofa & Carpet',
        'Floor Polishing',
        'Glass & Window Cleaning',
        'Water Tank Cleaning',
        'Commercial Cleaning',
      ],
      required: true,
    },
    imageUrl: { type: String, required: true },
    beforeImageUrl: { type: String },
    afterImageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
