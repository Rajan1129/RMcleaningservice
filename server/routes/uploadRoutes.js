const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Define destination directories
const clientUploadsDir = path.resolve(__dirname, '../../client/public/uploads');
const serverUploadsDir = path.resolve(__dirname, '../public/uploads');

// Ensure upload directories exist
[clientUploadsDir, serverUploadsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, clientUploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const base = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    cb(null, `${base}-${unique}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|avif|svg|gif/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  const mime = file.mimetype;
  if (allowed.test(ext) || mime.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, PNG, WebP, AVIF, SVG) are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max
});

// @route POST /api/upload (admin only - multipart/form-data)
router.post('/', protect, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    const filename = req.file.filename;

    // Also mirror to server/public/uploads for static server fallback
    try {
      const serverTarget = path.join(serverUploadsDir, filename);
      fs.copyFileSync(req.file.path, serverTarget);
    } catch (copyErr) {
      console.warn('Failed to mirror upload to server uploads directory:', copyErr.message);
    }

    const publicUrl = `/uploads/${filename}`;
    return res.status(201).json({
      success: true,
      filename,
      imageUrl: publicUrl,
      size: req.file.size,
    });
  });
});

// @route POST /api/upload/base64 (admin only - handles drag/drop canvas or dataURL)
router.post('/base64', protect, async (req, res) => {
  try {
    const { dataUrl, filename: originalName = 'upload.jpg' } = req.body;
    if (!dataUrl || !dataUrl.includes('base64,')) {
      return res.status(400).json({ success: false, message: 'Invalid base64 image data' });
    }

    const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ success: false, message: 'Invalid data URL format' });
    }

    const ext = `.${matches[1].replace('jpeg', 'jpg')}`;
    const buffer = Buffer.from(matches[2], 'base64');
    const base = path
      .basename(originalName, path.extname(originalName))
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const uniqueName = `${base || 'upload'}-${Date.now()}-${Math.round(Math.random() * 1e4)}${ext}`;

    const clientPath = path.join(clientUploadsDir, uniqueName);
    const serverPath = path.join(serverUploadsDir, uniqueName);

    fs.writeFileSync(clientPath, buffer);
    try {
      fs.writeFileSync(serverPath, buffer);
    } catch (e) {}

    return res.status(201).json({
      success: true,
      filename: uniqueName,
      imageUrl: `/uploads/${uniqueName}`,
      size: buffer.length,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
