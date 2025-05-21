// backend/scripts/dropIndex.js
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

// Drop the problematic index
const dropIndex = async () => {
  try {
    const conn = await connectDB();
    const db = conn.connection.db;

    console.log('Accessing orders collection...');

    // Check if the collection exists
    const collections = await db.listCollections({ name: 'orders' }).toArray();

    if (collections.length === 0) {
      console.log('Orders collection does not exist. Nothing to fix.');
      return;
    }

    // Get all indexes
    const indexes = await db.collection('orders').indexes();
    console.log('Current indexes:');
    indexes.forEach((index) => {
      console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
    });

    // Find the problematic index
    const problematicIndex = indexes.find(
      (index) =>
        index.key && (index.key.paymentIntentId === 1 || index.key.stripePaymentIntentId === 1)
    );

    if (problematicIndex) {
      console.log(`\nFound problematic index: ${problematicIndex.name}`);

      // Drop the index
      console.log(`Dropping index ${problematicIndex.name}...`);
      await db.collection('orders').dropIndex(problematicIndex.name);
      console.log('Index dropped successfully.');

      // Verify the index was dropped
      const newIndexes = await db.collection('orders').indexes();
      console.log('\nRemaining indexes:');
      newIndexes.forEach((index) => {
        console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
      });
    } else {
      console.log('\nNo problematic index found. Your collection should be fine.');
    }

    console.log('\nOperation completed.');
  } catch (error) {
    console.error('Error dropping index:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
};

// Run the function
dropIndex();

/*
To run this script:
1. Save it in your backend/scripts folder
2. Run: node scripts/dropIndex.js
*/
