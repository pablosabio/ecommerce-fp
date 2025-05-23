const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://682f1afc4fab403ab204cf9c--quickcart-fp.netlify.app', 'http://localhost:5173'] 
    : 'http://localhost:5173',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

export default corsOptions;