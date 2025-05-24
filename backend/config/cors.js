// backend/config/cors.js - More flexible CORS config
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (process.env.NODE_ENV === 'production') {
      // More flexible patterns for Netlify domains
      const allowedPatterns = [
        /^https:\/\/.*--quickcart-fp\.netlify\.app$/, // Any deploy of your app
        /^https:\/\/quickcart-fp\.netlify\.app$/, // Production domain (if you set custom domain)
        /^https:\/\/main--quickcart-fp\.netlify\.app$/, // Main branch
        /^http:\/\/localhost:5173$/, // Local development
        /^http:\/\/localhost:3000$/, // Alternative local port
        /^http:\/\/127\.0\.0\.1:5173$/, // Alternative localhost
      ];

      // Check if origin matches any allowed pattern
      const isAllowed = allowedPatterns.some(pattern => pattern.test(origin));

      if (isAllowed) {
        console.log(`CORS allowed origin: ${origin}`);
        callback(null, true);
      } else {
        console.log(`CORS blocked origin: ${origin}`);
        console.log('Allowed patterns:', allowedPatterns.map(p => p.toString()));
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // Development - allow common local origins
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173'
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

export default corsOptions;