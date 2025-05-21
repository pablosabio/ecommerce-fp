import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.STRIPE_SECRET_KEY;
console.log('Secret Key available:', !!secretKey);

const stripe = new Stripe(secretKey);

export default stripe;
