import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const addressSchema = new Schema(
  {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: { type: String, default: 'US' },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please provide your first name!'],
    },
    last_name: {
      type: String,
      required: [true, 'Please provide your last name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address!'],
      unique: [true, 'Email must be unique'],
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password!'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    profile_avatar: {
      type: String,
      default() {
        return `https://api.dicebear.com/7.x/thumbs/svg?seed=${this.email}&backgroundColor=FF6B35,FFBA86&backgroundType=gradientLinear`;
      },
    },
    address: {
      type: addressSchema,
      required: false,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
