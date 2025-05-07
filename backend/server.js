// backend/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

// Import Routes
import stripeRoutes from './routes/stripe.js';
import orderRoutes from './routes/orderRoutes.js';
import emailRouter from './routes/emailRoutes.js'; // <--- Import the new email router
import userRoutes from "./routes/userRoutes.js";
import connectDB from './config/db.js';

dotenv.config(); // Load environment variables first

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(cookieParser()); // Cookie parser for auth, sessions, etc.

// Use express.json for JSON parsing (with exception for Stripe webhook)
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api/stripe/webhook')) {
    next(); // Stripe webhook needs raw body, skip JSON parsing
  } else {
    express.json()(req, res, next); // Parse JSON for other routes
  }
});

// Routes
app.use('/api/stripe', stripeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/email', emailRouter);

// Base Route
app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});

// And the Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});