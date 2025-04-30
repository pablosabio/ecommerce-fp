// src/services/stripe.js
const API_URL = 'http://localhost:5000/api';

export const createPaymentIntent = async (amount, metadata = {}) => {
  try {
    // Make sure amount is a number and properly formatted
    const formattedAmount = typeof amount === 'string' 
      ? parseFloat(amount) 
      : amount;
    
    // Ensure metadata is properly formatted
    const formattedMetadata = {
      ...metadata,
      // If products is an array, ensure it's stringified properly
      ...(metadata.products && Array.isArray(metadata.products) 
        ? { products: JSON.stringify(metadata.products) } 
        : {})
    };

    const response = await fetch(`${API_URL}/stripe/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        amount: formattedAmount, 
        metadata: formattedMetadata
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};