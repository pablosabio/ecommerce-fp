import express from 'express';
import * as stripeController from '../controllers/stripeController.js';

const router = express.Router();

router.post('/create-payment-intent', stripeController.createPaymentIntent);

export const webhookHandler = stripeController.handleWebhookEvents;

export default router;
