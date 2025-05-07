// backend/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import stripeRoutes from './routes/stripe.js';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

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



//not sure if I should use this here
//app.use(bodyParser.urlencoded({ extended: true }));


//And not sure about this
//app.use(cookieParser());



// Routes
app.use('/api/stripe', stripeRoutes);

//I want to add also this
//for userRoutes
app.use('/api/users', userRoutes);




// Create and export the User model
/*const UsersModel = model("User", userSchema);
export default UsersModel;
 app.use('/api/users', userRoutes);
 app.use('/api/products', productRoutes);
 app.use('/api/orders', orderRoutes);*/

// Basic route
app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});


// And the Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});