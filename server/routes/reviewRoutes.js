const express = require('express');
const {
  getApprovedReviews,
  getAllReviewsAdmin,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getApprovedReviews);
router.get('/admin/all', protect, getAllReviewsAdmin);
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
