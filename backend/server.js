// backend/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import stripeRoutes from './routes/stripe.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Basic route
app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});