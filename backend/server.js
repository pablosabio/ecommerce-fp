// backend/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import stripeRoutes from './routes/stripe.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();

// Middleware
app.use(cors());

// Parse JSON bodies for all routes except /stripe/webhook
app.use((req, res, next) => {
  if (req.originalUrl === '/stripe/webhook') {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

// Routes
app.use('/api/stripe', stripeRoutes);
// Add other routes when created
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});