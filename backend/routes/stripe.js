// backend/routes/stripe.js
import express from 'express';
import * as stripeController from '../controllers/stripeController.js';

const router = express.Router();

// Create payment intent route
router.post('/create-payment-intent', stripeController.createPaymentIntent);

// We're handling the webhook route at the server.js level now
// but we still need to export the handler
export const webhookHandler = stripeController.handleWebhookEvents;

export default router;