// frontend/src/pages/OrderDetails.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../services/orderService';
import { AuthContext } from '../contexts/AuthContext';

const OrderDetails = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id, token);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 pt-24 max-w-4xl flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 pt-24 max-w-4xl">
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to="/orders" className="btn btn-primary">Back to Orders</Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto p-4 pt-24 max-w-4xl">
        <div className="alert alert-warning shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Order not found.</span>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to="/orders" className="btn btn-primary">Back to Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-24 max-w-4xl">
      <Link to="/orders" className="btn btn-ghost btn-sm mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Orders
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>
      <p className="text-sm text-gray-500 mb-6">Order ID: {order._id}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Shipping Information */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-lg">Shipping Information</h2>
            <div className="divider my-1"></div>
            {order.shippingAddress ? (
              <div>
                <p><strong>Name:</strong> {order.shippingAddress.name}</p>
                <p><strong>Address:</strong> {order.shippingAddress.address}</p>
                <p><strong>City:</strong> {order.shippingAddress.city}</p>
                <p><strong>State:</strong> {order.shippingAddress.state}</p>
                <p><strong>Postal Code:</strong> {order.shippingAddress.postalCode}</p>
                <p><strong>Country:</strong> {order.shippingAddress.country}</p>
              </div>
            ) : (
              <p>No shipping information available</p>
            )}
            
            {order.isDelivered ? (
              <div className="alert alert-success mt-4 text-sm">
                Delivered on {formatDate(order.deliveredAt)}
              </div>
            ) : (
              <div className="alert alert-warning mt-4 text-sm">
                Not yet delivered
              </div>
            )}
          </div>
        </div>
        
        {/* Payment Information */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-lg">Payment Information</h2>
            <div className="divider my-1"></div>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            
            {order.isPaid ? (
              <div className="alert alert-success mt-4 text-sm">
                Paid on {formatDate(order.paidAt)}
              </div>
            ) : (
              <div className="alert alert-error mt-4 text-sm">
                Not paid
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Order Items */}
      <div className="card bg-base-100 shadow-xl border border-base-300 mb-8">
        <div className="card-body">
          <h2 className="card-title text-lg">Order Items</h2>
          <div className="divider my-1"></div>
          
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Item</th>
                  <th className="text-right">Quantity</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="text-right">{item.quantity}</td>
                    <td className="text-right">${item.price.toFixed(2)}</td>
                    <td className="text-right">${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-lg">Order Summary</h2>
          <div className="divider my-1"></div>
          
          <div className="flex justify-between py-2">
            <span>Items:</span>
            <span>${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Shipping:</span>
            <span>${order.shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Tax:</span>
            <span>${order.taxPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 font-bold">
            <span>Total:</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;