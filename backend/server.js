// backend/server.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import corsOptions from './config/cors.js';
// Add this import for body-parser
import bodyParser from 'body-parser';

// Import Routes
import stripeRoutes, { webhookHandler } from './routes/stripe.js';
import orderRoutes from './routes/orderRoutes.js';
import emailRouter from './routes/emailRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Load env variables
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());

// Use express.json() for all routes except the Stripe webhook
app.use((req, res, next) => {
  if (req.originalUrl === '/api/stripe/webhook') {
    // For Stripe webhook, use raw body
    next();
  } else {
    // For everything else, parse JSON
    express.json()(req, res, next);
  }
});

// Special handling for Stripe webhook route
app.post('/api/stripe/webhook', bodyParser.raw({ type: 'application/json' }), webhookHandler);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);
// Use stripe routes for all paths except webhook (handled above)
app.use(
  '/api/stripe',
  (req, res, next) => {
    if (req.path !== '/webhook') {
      next();
    }
  },
  stripeRoutes
);
app.use('/api/orders', orderRoutes);
app.use('/api/email', emailRouter);
app.use('/api/products', productRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
