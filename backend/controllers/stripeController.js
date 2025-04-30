// backend/controllers/stripeController.js
import stripe from '../config/stripe.js';
import Order from '../models/Order.js';

// Create a payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert dollars to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client secret
    res.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
};

// Handle webhook events from Stripe
export const handleWebhookEvents = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!endpointSecret) {
    return res.status(400).send('Webhook secret is not set');
  }
  
  let event;

  try {
    // Verify the event came from Stripe
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle specific event types
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  } catch (error) {
    console.error(`Error processing webhook: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// Handle successful payments
const handlePaymentIntentSucceeded = async (paymentIntent) => {
  console.log('PaymentIntent was successful:', paymentIntent.id);
  
  try {
    // Check if we already have an order for this payment intent
    const existingOrder = await Order.findOne({ 
      stripePaymentIntentId: paymentIntent.id 
    });

    if (existingOrder) {
      console.log(`Order already exists for PaymentIntent: ${paymentIntent.id}`);
      
      // If the order exists but isn't marked as paid, update it
      if (!existingOrder.isPaid) {
        existingOrder.isPaid = true;
        existingOrder.paidAt = new Date();
        existingOrder.paymentResult = {
          id: paymentIntent.id,
          status: paymentIntent.status,
          update_time: new Date().toISOString(),
          email_address: paymentIntent.receipt_email || ''
        };
        await existingOrder.save();
        console.log(`Updated existing order: ${existingOrder._id}`);
      }
      
      return;
    }

    // Get the items from the payment intent metadata
    let orderItems = [];
    let itemsPrice = 0;
    
    if (paymentIntent.metadata && paymentIntent.metadata.products) {
      try {
        const products = JSON.parse(paymentIntent.metadata.products);
        
        // Transform products to orderItems
        orderItems = products.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price || 0, // Fallback to 0 if price isn't available
          productId: item.id
        }));

        // Calculate itemsPrice (if price is available in metadata)
        itemsPrice = orderItems.reduce((sum, item) => 
          sum + (item.price * item.quantity), 0);
      } catch (error) {
        console.error('Error parsing products from metadata:', error);
      }
    }

    // Calculate the total (we have this in cents from Stripe)
    const totalPrice = paymentIntent.amount / 100;
    const taxPrice = totalPrice * 0.07; // Assuming 7% tax
    const shippingPrice = 5.99; // Default shipping price

    // Create a new order
    const newOrder = new Order({
      orderItems,
      stripePaymentIntentId: paymentIntent.id,
      paymentMethod: 'Stripe',
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: new Date(),
      paymentResult: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        update_time: new Date().toISOString(),
        email_address: paymentIntent.receipt_email || ''
      }
    });

    // Save the billing address if available in metadata
    if (paymentIntent.shipping) {
      newOrder.shippingAddress = {
        name: paymentIntent.shipping.name,
        address: paymentIntent.shipping.address.line1,
        city: paymentIntent.shipping.address.city,
        state: paymentIntent.shipping.address.state,
        postalCode: paymentIntent.shipping.address.postal_code,
        country: paymentIntent.shipping.address.country
      };
    }

    const savedOrder = await newOrder.save();
    console.log(`New order created: ${savedOrder._id}`);
  } catch (error) {
    console.error('Error handling successful payment:', error);
    throw error;
  }
};

// Handle failed payments
const handlePaymentIntentFailed = async (paymentIntent) => {
  console.log('Payment failed:', paymentIntent.id);
  
  // You could create an order with a failed status or log the failed payment
  // This is optional but helps with tracking failed payments
  try {
    // Check if we already have an order for this payment intent
    const existingOrder = await Order.findOne({ 
      stripePaymentIntentId: paymentIntent.id 
    });

    if (existingOrder) {
      // Update the existing order to reflect the failure
      existingOrder.isPaid = false;
      existingOrder.paymentResult = {
        id: paymentIntent.id,
        status: 'failed',
        update_time: new Date().toISOString(),
        email_address: paymentIntent.receipt_email || ''
      };
      await existingOrder.save();
      console.log(`Updated existing order as failed: ${existingOrder._id}`);
    }
    
    // You can add additional failure handling logic here if needed
  } catch (error) {
    console.error('Error handling failed payment:', error);
    throw error;
  }
};