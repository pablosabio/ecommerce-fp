// backend/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Import Routes
import stripeRoutes from './routes/stripe.js';
import orderRoutes from './routes/orderRoutes.js';
import emailRouter from './routes/emailRoutes.js'; // <--- Import the new email router
import connectDB from './config/db.js';

dotenv.config(); // Load environment variables first


const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();

// Middleware
app.use(cors()); // Enable CORS

// Use express.json for JSON parsing (with exception for Stripe webhook)
app.use((req, res, next) => {
  // Make sure the check matches the start of the path more precisely
  if (req.originalUrl.startsWith('/api/stripe/webhook')) {
    next(); // Stripe webhook needs raw body, skip JSON parsing
  } else {
    express.json()(req, res, next); // Parse JSON for other routes
  }
});

// --- Routes ---
app.use('/api/stripe', stripeRoutes);
app.use('/api/orders', orderRoutes);
// --- Register Email Route ---
// Any request starting with /api/email will be routed to emailRouter
app.use('/api/email', emailRouter); // <--- Use the new email router

// Base Route
app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});