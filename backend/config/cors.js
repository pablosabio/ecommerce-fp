const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://placeholder-will-update-after-frontend-deploy.netlify.app', 'http://localhost:5173'] 
    : 'http://localhost:5173',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

export default corsOptions;