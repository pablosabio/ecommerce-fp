// src/components/Cart.jsx
import React, { useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="w-14 h-14 bg-gray-200 rounded-md">
                            {item.imageSrc ? (
                              <img className='w-full h-full object-cover rounded-md"' src={item.imageSrc} alt={item.name} />
                            ) : (
                              <div className="bg-gray-200 w-full h-full"></div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <div className="flex items-center">
                        <button 
                          className="btn btn-sm btn-square" 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          className="btn btn-sm btn-square" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-ghost" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between mt-8">
            <div className="mb-4 md:mb-0">
              <Link to="/shop" className="btn btn-outline">Continue Shopping</Link>
            </div>
            
            <div className="card w-full md:w-80 bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Order Summary</h2>
                <div className="flex justify-between py-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between py-2 font-bold border-t">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button 
                  className="btn btn-primary btn-block"
                  onClick={handleCheckout}
                  >
                    Proceed to Checkout
                    </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}