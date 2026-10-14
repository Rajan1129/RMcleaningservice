const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryStats,
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// Limit public enquiry submissions to reduce spam/abuse
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

router.post(
  '/',
  enquiryLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone')
      .customSanitizer((val) => {
        if (!val) return '';
        let cleaned = String(val).replace(/[\s\-\(\)\.]/g, '');
        if (cleaned.startsWith('+91')) cleaned = cleaned.slice(3);
        else if (cleaned.startsWith('91') && cleaned.length === 12) cleaned = cleaned.slice(2);
        else if (cleaned.startsWith('0') && cleaned.length === 11) cleaned = cleaned.slice(1);
        return cleaned;
      })
      .matches(/^[6-9]\d{9}$/)
      .withMessage('Enter a valid 10-digit Indian phone number'),
    body('service').trim().notEmpty().withMessage('Please select a service'),
    body('location').optional().trim(),
    body('preferredDate').optional().trim(),
    body('message').optional().isLength({ max: 1000 }),
  ],
  validate,
  createEnquiry
);

router.get('/stats/summary', protect, getEnquiryStats);
router.get('/', protect, getEnquiries);
router.get('/:id', protect, getEnquiryById);
router.patch('/:id', protect, updateEnquiry);
router.delete('/:id', protect, deleteEnquiry);

module.exports = router;
