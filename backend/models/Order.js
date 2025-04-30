// backend/models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // This assumes you have a Product model
    required: false // Making it false for now since we're storing metadata from Stripe
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  productId: {
    type: String, // This would be the id from your frontend product data
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This assumes you have a User model
    required: false // Making it optional for now for guest checkout
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: { type: String, default: 'US' }
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'Stripe'
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  stripePaymentIntentId: {
    type: String,
    unique: true, // This helps prevent duplicate payments
    sparse: true // This allows null values
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;