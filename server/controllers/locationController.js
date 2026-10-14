const LocationPage = require('../models/LocationPage');

// GET /api/locations (public)
exports.getLocations = async (req, res, next) => {
  try {
    const locations = await LocationPage.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: locations.length, data: locations });
  } catch (error) {
    next(error);
  }
};

// GET /api/locations/:slug (public)
exports.getLocationBySlug = async (req, res, next) => {
  try {
    const location = await LocationPage.findOne({ slug: req.params.slug, isActive: true });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location page not found' });
    }
    res.json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

// GET /api/locations/admin/all (admin)
exports.getAllLocationsAdmin = async (req, res, next) => {
  try {
    const locations = await LocationPage.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: locations.length, data: locations });
  } catch (error) {
    next(error);
  }
};

// POST /api/locations (admin)
exports.createLocation = async (req, res, next) => {
  try {
    const location = await LocationPage.create(req.body);
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

// PUT /api/locations/:id (admin)
exports.updateLocation = async (req, res, next) => {
  try {
    const location = await LocationPage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    res.json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/locations/:id (admin)
exports.deleteLocation = async (req, res, next) => {
  try {
    const location = await LocationPage.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    res.json({ success: true, message: 'Location deleted successfully' });
  } catch (error) {
    next(error);
  }
};
