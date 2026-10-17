const mongoose = require('mongoose');

// Singleton document holding editable business/contact info
const businessInfoSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'R M Home Cleaning' },
    tagline: { type: String, default: 'House Cleaning & Deep Cleaning Service' },
    phone: { type: String, default: '9646078122' },
    whatsapp: { type: String, default: '919646078122' },
    address: { type: String, default: 'Progressive Society, Sector 50, Chandigarh, 160047' },
    plusCode: { type: String, default: 'MPXX+HW Chandigarh' },
    hours: { type: String, default: 'Open 24 Hours' },
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 18 },
    serviceArea: { type: String, default: 'Sector 50 Chandigarh, Mohali, Panchkula & Tricity' },
    mapEmbedUrl: {
      type: String,
      default: 'https://www.google.com/maps?q=Progressive+Society,+Sector+50,+Chandigarh+160047&output=embed',
    },
    googleMapsUrl: {
      type: String,
      default: 'https://maps.google.com/?q=Progressive+Society,+Sector+50,+Chandigarh+160047',
    },
    googleReviewsUrl: { type: String, default: '' },
    website: { type: String, default: 'https://rmcleaningservice.in' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BusinessInfo', businessInfoSchema);
