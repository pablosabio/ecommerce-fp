import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const shippingCost = subtotal > 100 ? 0 : 5.99;
  
  const taxRate = 0.07;
  const taxAmount = subtotal * taxRate;
  
  const totalAmount = subtotal + shippingCost + taxAmount;

  return (
    <div className="pt-24 min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Shopping Cart</h1>
          <p className="text-base-content/70">
            Review your items and proceed to checkout when you're ready
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center py-16">
              <div className="bg-base-200 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-base-content/70 max-w-md mx-auto mb-8">
                Looks like you haven't added any products to your cart yet. Explore our products and find something you like.
              </p>
              <Link to="/shop" className="btn btn-primary px-8">
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-8">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-bold">Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})</h2>
                <Link to="/shop" className="btn btn-sm btn-outline btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
              
              <div className="card bg-base-100 shadow-lg overflow-hidden border border-base-300">
                {/* Cart Item List */}
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`flex p-6 ${index !== cartItems.length - 1 ? 'border-b border-base-200' : ''}`}>
                    {/* Item Image */}
                    <div className="w-20 h-20 flex-shrink-0 bg-base-200 rounded mr-4">
                      {item.imageSrc && (
                        <img 
                          src={item.imageSrc} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded" 
                        />
                      )}
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-base-content/60 text-sm mb-3">
                            Unit price: ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-semibold md:text-right mb-3 md:mb-0">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      {/* Quantity Controls and Remove Button */}
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center">
                          <span className="text-sm text-base-content/70 mr-3">Quantity:</span>
                          <div className="flex items-center">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="btn btn-sm btn-square btn-ghost"
                              aria-label="Decrease quantity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="btn btn-sm btn-square btn-ghost"
                              aria-label="Increase quantity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-error hover:underline flex items-center cursor-pointer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary Section */}
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold mb-3">Order Summary</h2>
              <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Shipping</span>
                      {shippingCost > 0 ? (
                        <span>${shippingCost.toFixed(2)}</span>
                      ) : (
                        <span className="text-success">Free</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Tax ({(taxRate * 100).toFixed(0)}%)</span>
                      <span>${taxAmount.toFixed(2)}</span>
                    </div>
                    
                    {shippingCost > 0 && (
                      <div className="text-sm text-success italic">
                        Add ${(100 - subtotal).toFixed(2)} more for free shipping
                      </div>
                    )}
                    
                    <div className="divider my-2"></div>
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    
                    <button 
                      onClick={handleCheckout}
                      className="btn btn-primary btn-block"
                    >
                      Proceed to Checkout
                    </button>
                    
                    {/* Secure Checkout Notice */}
                    <div className="text-center">
                      <p className="text-xs text-base-content/60 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Secure checkout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Accepted Payment Methods - Simpler Version */}
              <div className="card bg-base-100 shadow-lg border border-base-300 mt-4">
                <div className="card-body p-6">
                  <h3 className="text-sm font-medium mb-3">We Accept</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-base-200 px-3 py-2 rounded">
                      <span className="font-medium">Visa</span>
                    </div>
                    <div className="bg-base-200 px-3 py-2 rounded">
                      <span className="font-medium">Mastercard</span>
                    </div>
                    <div className="bg-base-200 px-3 py-2 rounded">
                      <span className="font-medium">PayPal</span>
                    </div>
                    <div className="bg-base-200 px-3 py-2 rounded">
                      <span className="font-medium">Apple Pay</span>
                    </div>
                    <div className="bg-base-200 px-3 py-2 rounded">
                      <span className="font-medium">Google Pay</span>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}