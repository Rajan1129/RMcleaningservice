const express = require('express');
const {
  getLocations,
  getLocationBySlug,
  getAllLocationsAdmin,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getLocations);
router.get('/admin/all', protect, getAllLocationsAdmin);
router.get('/:slug', getLocationBySlug);
router.post('/', protect, createLocation);
router.put('/:id', protect, updateLocation);
router.delete('/:id', protect, deleteLocation);

module.exports = router;
