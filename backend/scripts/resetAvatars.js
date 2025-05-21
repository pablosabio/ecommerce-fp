// backend/scripts/resetAvatars.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const resetAvatars = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database');

    // Reset all avatars to null
    const result = await User.updateMany({}, { profile_avatar: null });

    console.log(`Reset ${result.modifiedCount} user avatars to null`);
  } catch (error) {
    console.error('Error resetting avatars:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
};

resetAvatars();
