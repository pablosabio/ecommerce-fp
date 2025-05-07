// backend/scripts/testDbConnection.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../models/Order.js';

dotenv.config();

const testDbConnection = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Test if models are working
    const orderCount = await Order.countDocuments();
    console.log(`Database has ${orderCount} orders`);
    
    console.log('Connection test successful!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('MongoDB connection closed');
  }
};

// Run the test
testDbConnection();

/*
Run the script with Node:
   node scripts/testDbConnection.js
*/