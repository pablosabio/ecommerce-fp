// backend/server.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import connectDB from './config/db.js';
import corsOptions from './config/cors.js';
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

if (process.env.NODE_ENV === 'production') {
  app.use(helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin" // Allow cross-origin resource loading
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "*", "data:", "blob:"], // Allow images from any origin
        connectSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  }));
  app.use(compression());
}

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

// Temporary route to fix existing profile URLs
app.get('/api/fix-profiles', async (req, res) => {
  try {
    const User = (await import('./models/User.js')).default;
    const users = await User.find({
      profile_avatar: { $regex: 'localhost:5000' }
    });
    
    for (const user of users) {
      user.profile_avatar = user.profile_avatar.replace(
        'http://localhost:5000', 
        'https://quickcart-api.onrender.com'
      );
      await user.save();
    }
    
    res.json({ 
      message: `Fixed ${users.length} user profiles`,
      fixedUsers: users.length,
      updatedUsers: users.map(u => ({ id: u._id, newUrl: u.profile_avatar }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD these new debug routes
app.get('/api/debug', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
    hasJwtSecret: !!process.env.JWT_SECRET,
    hasMongoUri: !!process.env.MONGODB_URI,
    baseUrl: process.env.BASE_URL,
    port: process.env.PORT,
    corsOrigin: process.env.CORS_ORIGIN,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test-cors', (req, res) => {
  res.json({
    message: 'CORS test successful',
    origin: req.headers.origin,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
  });
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
