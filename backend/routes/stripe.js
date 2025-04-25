// backend/routes/stripe.js
import express from 'express';
import * as stripeController from '../controllers/stripeController.js';
import bodyParser from 'body-parser';

const router = express.Router();

// Create payment intent route
router.post('/create-payment-intent', stripeController.createPaymentIntent);

// Webhook route - use raw body parser for Stripe webhooks
router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  stripeController.handleWebhookEvents
);

export default router;