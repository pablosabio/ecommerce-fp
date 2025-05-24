// backend/config/cors.js
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? [
          process.env.CORS_ORIGIN, // Your main Netlify domain
          'https://6830363b1c5feb979e33ec48--quickcart-fp.netlify.app', // Your current deploy
          'https://main--quickcart-fp.netlify.app', // Main branch
          'https://deploy-preview-*--quickcart-fp.netlify.app', // Deploy previews pattern
          'http://localhost:5173' // Keep for local testing
        ].filter(Boolean) // Remove any undefined values
      : [
          'http://localhost:5173',
          'http://localhost:3000',
          'http://127.0.0.1:5173'
        ];

    // Check if origin matches any allowed origins (including wildcard for deploy previews)
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        // Handle wildcard patterns for deploy previews
        const pattern = allowedOrigin.replace('*', '.*');
        return new RegExp(pattern).test(origin);
      }
      return allowedOrigin === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

export default corsOptions;