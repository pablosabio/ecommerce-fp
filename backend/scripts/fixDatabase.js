// backend/scripts/fixDatabase.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup proper __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Fix the database
const fixDatabase = async () => {
  try {
    const conn = await connectDB();
    const db = conn.connection.db;
    
    console.log('Checking database collections...');
    const collections = await db.listCollections().toArray();
    
    // Find the orders collection
    const ordersCollection = collections.find(c => c.name === 'orders');
    
    if (!ordersCollection) {
      console.log('No orders collection found. Nothing to fix.');
      return;
    }
    
    // Step 1: Check existing indexes
    console.log('\nChecking indexes on orders collection...');
    const indexes = await db.collection('orders').indexes();
    
    console.log('Current indexes:');
    indexes.forEach(index => {
      console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
    });
    
    // Step 2: Find and fix the problematic index
    const problematicIndex = indexes.find(index => 
      index.key && index.key.paymentIntentId === 1 && index.unique
    );
    
    if (problematicIndex) {
      console.log(`\nFound problematic index: ${problematicIndex.name}`);
      
      // Drop the problematic index
      console.log('Dropping the problematic index...');
      await db.collection('orders').dropIndex(problematicIndex.name);
      console.log('Index dropped successfully.');
      
      // Create a new sparse unique index
      console.log('Creating new sparse unique index...');
      await db.collection('orders').createIndex(
        { paymentIntentId: 1 }, 
        { unique: true, sparse: true }
      );
      console.log('New index created successfully.');
    } else {
      console.log('\nNo problematic index found.');
      
      // Create the correct index if it doesn't exist
      console.log('Creating/ensuring proper sparse unique index...');
      await db.collection('orders').createIndex(
        { paymentIntentId: 1 }, 
        { unique: true, sparse: true }
      );
    }
    
    // Step 3: Check for duplicate null paymentIntentId values
    console.log('\nChecking for orders with null paymentIntentId...');
    const nullOrders = await db.collection('orders')
      .find({ paymentIntentId: null })
      .toArray();
    
    console.log(`Found ${nullOrders.length} orders with null paymentIntentId`);
    
    if (nullOrders.length > 1) {
      console.log('Multiple orders with null paymentIntentId found. This will cause problems.');
      console.log('Fixing by removing paymentIntentId field from these orders...');
      
      // Keep the first one as is, update the rest to remove the field
      for (let i = 1; i < nullOrders.length; i++) {
        await db.collection('orders').updateOne(
          { _id: nullOrders[i]._id },
          { $unset: { paymentIntentId: "" } }
        );
      }
      
      console.log(`Fixed ${nullOrders.length - 1} orders by removing the null paymentIntentId field.`);
    }
    
    // Step 4: Verify the fix
    console.log('\nVerifying the fix...');
    const newIndexes = await db.collection('orders').indexes();
    console.log('Updated indexes:');
    newIndexes.forEach(index => {
      console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
    });
    
    console.log('\nDatabase fix completed successfully!');
  } catch (error) {
    console.error('Error fixing database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
};

// Run the fix
fixDatabase();

/*
To run this script:
1. Save it in your backend/scripts folder
2. Run: node scripts/fixDatabase.js
*/