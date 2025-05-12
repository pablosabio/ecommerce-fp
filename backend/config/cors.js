// backend/config/cors.js
const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
  };
  
  export default corsOptions;