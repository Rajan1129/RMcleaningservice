const Review = require('../models/Review');

// GET /api/reviews (public)
exports.getApprovedReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

// GET /api/reviews/admin/all (admin)
exports.getAllReviewsAdmin = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

// POST /api/reviews (admin or public)
exports.createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// PUT /api/reviews/:id (admin)
exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/reviews/:id (admin)
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};
