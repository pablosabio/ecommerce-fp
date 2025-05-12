// backend/server.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import corsOptions from './config/cors.js';


// Import Routes
import stripeRoutes from './routes/stripe.js';
import orderRoutes from './routes/orderRoutes.js';
import emailRouter from './routes/emailRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import userRoutes from './routes/userRoutes.js';

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
app.use(express.json());

// Stripe webhook needs raw body, use middleware conditionally
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api/stripe/webhook')) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/email', emailRouter);


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