require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const faqRoutes = require('./routes/faqRoutes');
const businessInfoRoutes = require('./routes/businessInfoRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();

connectDB();

// Security & core middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// General API rate limiter
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use('/api', apiLimiter);

// Health check
app.get('/api/health', (req, res) => res.json({ success: true, message: 'API is running' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/business-info', businessInfoRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/upload', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
