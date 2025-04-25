// src/services/stripe.js
const API_URL = 'http://localhost:5000/api';

export const createPaymentIntent = async (amount, metadata = {}) => {
  try {
    const response = await fetch(`${API_URL}/stripe/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, metadata }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};