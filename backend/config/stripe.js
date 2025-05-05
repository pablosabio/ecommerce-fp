// backend/config/stripe.js
import Stripe from 'stripe';
import dotenv from 'dotenv';

// Make sure dotenv is configured before using process.env
dotenv.config();

const secretKey = process.env.STRIPE_SECRET_KEY;
console.log("Secret Key available:", !!secretKey); // Will log true if key exists

/*if (!secretKey) {
  throw new Error('Stripe secret key is missing! Check your .env file.');
}*/

const stripe = new Stripe(secretKey);

export default stripe;