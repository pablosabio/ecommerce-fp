// src/pages/Checkout.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../services/stripe';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51R1Npr03HVAw8BZ90VVjhIR6riUdbntCelVXlsZPXoeS1SdYSCNxgsyi3ZhVK3VMPwfLP74z561GwxX2KDoLRxTW00HFrLhTj9');

const CheckoutForm = () => {

  const { cartItems, subtotal, clearCart } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // Track current step
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' or 'error'
  const [orderId, setOrderId] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Get payment intent when page loads
  useEffect(() => {
    const getPaymentIntent = async () => {
      try {
        // Create metadata with order items
        const metadata = {
          products: JSON.stringify(
            cartItems.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity
            }))
          )
        };
        
        const { clientSecret } = await createPaymentIntent(subtotal, metadata);
        setClientSecret(clientSecret);
      } catch (err) {
        console.error('Error getting payment intent:', err);
        setError('Failed to initialize payment. Please try again.');
      }
    };

    if (cartItems.length > 0) {
      getPaymentIntent();
    }
  }, [cartItems, subtotal]);

  // Calculate order summary
  const shipping = 5.99; // Fixed shipping cost
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  // Handle address form submission and move to payment step
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    
    // Validate shipping info
    const requiredFields = ['name', 'email', 'address', 'city', 'state', 'zipCode'];
    for (const field of requiredFields) {
      if (!shippingInfo[field]) {
        setError(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    setError(null);
    setCurrentStep(2); // Move to payment step
  };

  // Handle payment form submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Process payment
    const cardElement = elements.getElement(CardElement);
    
    try {
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: shippingInfo.name,
              email: shippingInfo.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.zipCode,
              },
            },
          },
        }
      );
  
      setIsProcessing(false);
  
      if (paymentError) {
        setError(paymentError.message);
        setPaymentStatus('error');
      } else if (paymentIntent.status === 'succeeded') {
        setOrderId(paymentIntent.id);
        setPaymentStatus('success');
        setCurrentStep(3);
      }
    } catch (err) {
      console.error("Unexpected error during payment:", err);
      setIsProcessing(false);
      setError('There was a problem processing your payment. Please try again.');
    }
  };
  // Return to billing step
  const goToBillingStep = () => {
    setCurrentStep(1);
    setError(null);
  };
  // Navigate to home after completed order
  const goToHome = () => {
    clearCart();
    navigate('/');
  };
  // Step 1: Billing Address
  const renderBillingAddressStep = () => (
    <form onSubmit={handleAddressSubmit} className="space-y-6">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-xl flex items-center gap-2 mb-6">
            <span className="badge badge-primary badge-lg">1</span>
            Billing Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                className="input input-bordered input-md w-full focus:input-primary"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                className="input input-bordered input-md w-full focus:input-primary"
                required
              />
            </div>
            <div className="form-control col-span-1 md:col-span-2 w-full">
              <label className="label pb-2">
                <span className="label-text font-medium">Street Address</span>
              </label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className="input input-bordered input-md w-full focus:input-primary"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text font-medium">City</span>
              </label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                className="input input-bordered input-md w-full focus:input-primary"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="form-control w-full">
                <label className="label pb-2">
                  <span className="label-text font-medium">State</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  className="input input-bordered input-md w-full focus:input-primary"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label pb-2">
                  <span className="label-text font-medium">ZIP Code</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleInputChange}
                  className="input input-bordered input-md w-full focus:input-primary"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Order Summary */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Order Summary</h2>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name} × {item.quantity}</td>
                    <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="divider my-2"></div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-base">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Tax (7%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="divider my-2"></div>
            
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
  
      {/* Error Message */}
      {error && (
        <div className="alert alert-error shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
  
      {/* Continue to Payment Button */}
      <button
        type="submit"
        className="btn btn-primary btn-block btn-lg"
      >
        Continue to Payment
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </form>
  );
  // Step 2: Payment Information
  const renderPaymentStep = () => (

    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-xl flex items-center gap-2">
            <span className="badge badge-primary badge-lg">2</span>
            Payment Information
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Card Details</span>
            </label>
            <div className="border rounded-lg p-5 bg-base-200/50 focus-within:border-primary transition-colors">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: 'currentColor',
                      '::placeholder': {
                        color: '#9ca3af',
                      },
                    },
                    invalid: {
                      color: '#ef4444',
                    },
                  },
                }}
              />
            </div>
            <div className="mt-2 flex items-center text-sm text-base-content/70">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure payment processing by Stripe
            </div>
          </div>
          
          {/* Billing Summary */}
          <div className="mt-6">
            <h3 className="font-medium mb-2">Billing Address</h3>
            <div className="bg-base-200 p-3 rounded-lg">
              <p>{shippingInfo.name}</p>
              <p>{shippingInfo.email}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-xl">Order Summary</h2>
          
          <div className="space-y-1">
            <div className="flex justify-between text-base">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Tax (7%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="divider my-2"></div>
            
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Back and Submit Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={goToBillingStep}
          className="btn btn-outline sm:flex-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Billing
        </button>
        <button
          type="submit"
          className="btn btn-primary sm:flex-1"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="loading loading-spinner"></span>
              Processing...
            </>
          ) : (
            <>
              Pay ${total.toFixed(2)}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );

  // Step 3: Order Confirmation
  const renderConfirmationStep = () => {
    return (
    <div className="space-y-6">
      {paymentStatus === 'success' ? (
        <div className="card bg-base-100 shadow-xl border border-success">
          <div className="card-body text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-success/20 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-success mb-2">Order Successful!</h2>
            <p className="text-lg mb-3">Your order has been placed and is being processed.</p>
            <p className="mb-4">Order ID: <span className="font-mono bg-base-200 px-2 py-1 rounded">{orderId}</span></p>
            <p>An email confirmation has been sent to <strong>{shippingInfo.email}</strong></p>
            
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-2">Shipping to:</h3>
              <div className="bg-base-200 p-4 rounded-lg inline-block text-left">
                <p>{shippingInfo.name}</p>
                <p>{shippingInfo.address}</p>
                <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl border border-error">
          <div className="card-body text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-error/20 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-error mb-2">Payment Failed</h2>
            <p className="text-lg mb-4">{error || "There was a problem processing your payment."}</p>
            <p>Please try again or use a different payment method.</p>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-xl">Order Summary</h2>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name} × {item.quantity}</td>
                    <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="divider my-2"></div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-base">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Tax (7%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="divider my-2"></div>
            
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {paymentStatus === 'error' ? (
          <button
            type="button"
            onClick={goToBillingStep}
            className="btn btn-outline btn-error sm:flex-1"
          >
            Try Again
          </button>
        ) : null}
        <button
          type="button"
          onClick={goToHome}
          className="btn btn-primary sm:flex-1"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
  };

  // Render current step
  const renderCurrentStep = () => {

    switch (currentStep) {
      case 1:
        return renderBillingAddressStep();
      case 2:
        return renderPaymentStep();
      case 3:
        return renderConfirmationStep();
      default:
        return renderBillingAddressStep();
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="steps steps-vertical md:steps-horizontal w-full mb-4">
        <div className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Billing</div>
        <div className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Payment</div>
        <div className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Confirmation</div>
      </div>
      
      {renderCurrentStep()}
    </div>
  );
};

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Checkout
      </h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;