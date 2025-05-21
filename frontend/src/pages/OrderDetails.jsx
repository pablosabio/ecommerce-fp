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
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge class
  const getStatusBadge = () => {
    if (!order) return '';

    if (!order.isPaid) {
      return 'badge-warning';
    } else if (order.isDelivered) {
      return 'badge-success';
    } else {
      return 'badge-info';
    }
  };

  // Get status text
  const getStatusText = () => {
    if (!order) return '';

    if (!order.isPaid) {
      return 'Processing';
    } else if (order.isDelivered) {
      return 'Delivered';
    } else {
      return 'Paid';
    }
  };

  if (loading) {
    return (
      <div className="pt-18 flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-18 container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="alert alert-error shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold">Error</h3>
            <div className="text-xs">{error}</div>
          </div>
          <button onClick={() => window.location.reload()} className="btn btn-sm">
            Try Again
          </button>
        </div>
        <div className="text-center mt-8">
          <Link to="/orders" className="btn btn-primary">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-18 container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="card bg-base-100 shadow-xl text-center py-12">
          <div className="card-body items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-base-content/30 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="card-title text-2xl mb-2">Order Not Found</h2>
            <p className="mb-6 text-base-content/70">
              The order you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/orders" className="btn btn-primary">
              View Your Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-18 min-h-screen">
      {/* Hero Section with Order Summary */}
      <section className="bg-base-200 py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <Link to="/orders" className="btn btn-ghost btn-sm mb-2 pl-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Orders
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold">Order Details</h1>
              <p className="text-sm text-base-content/70">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className={`badge badge-lg ${getStatusBadge()}`}>{getStatusText()}</div>
            </div>
          </div>

          {/* Order ID and Payment Info Banner */}
          <div className="bg-base-100 p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <span className="text-sm text-base-content/70">Order ID:</span>
                <span className="ml-2 font-mono">{order._id}</span>
              </div>
              <div className="mt-2 sm:mt-0">
                {order.isPaid ? (
                  <div className="text-sm text-success flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Paid on {formatDate(order.paidAt)}
                  </div>
                ) : (
                  <div className="text-sm text-warning flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Payment pending
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Order Items and Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items Card */}
              <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body p-5">
                  <h2 className="card-title text-xl mb-4">Order Items</h2>

                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center border-b border-base-200 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex-1 mb-2 sm:mb-0">
                          <h3 className="font-semibold">{item.name}</h3>
                          <div className="flex justify-between sm:justify-start mt-1">
                            <span className="text-sm text-base-content/70">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm text-base-content/70 sm:ml-4">
                              Price: ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            ${(item.quantity * item.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="divider my-4"></div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${order.itemsPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${order.shippingPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${order.taxPrice.toFixed(2)}</span>
                    </div>
                    <div className="divider my-2"></div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Status Card */}
              <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body p-5">
                  <h2 className="card-title text-xl mb-4">Delivery Status</h2>

                  <div className="space-y-2">
                    {order.isDelivered ? (
                      <div className="alert alert-success">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <h3 className="font-bold">Delivered</h3>
                          <div className="text-xs">
                            Your order was delivered on {formatDate(order.deliveredAt)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="alert alert-info">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="stroke-current shrink-0 w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <div>
                          <h3 className="font-bold">Processing</h3>
                          <div className="text-xs">Your order is being prepared for shipping</div>
                        </div>
                      </div>
                    )}

                    {/* Order Timeline */}
                    <div className="my-4 py-2">
                      <ul className="steps steps-vertical">
                        <li className="step step-primary">Order Placed</li>
                        <li className={`step ${order.isPaid ? 'step-primary' : ''}`}>
                          Payment Confirmed
                        </li>
                        <li
                          className={`step ${order.isPaid && !order.isDelivered ? 'step-primary' : ''}`}
                        >
                          Processing
                        </li>
                        <li className={`step ${order.isDelivered ? 'step-primary' : ''}`}>
                          Delivered
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Customer and Shipping Info */}
            <div className="space-y-6">
              {/* Shipping Information Card */}
              <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body p-5">
                  <h2 className="card-title text-xl mb-4">Shipping Information</h2>

                  {order.shippingAddress ? (
                    <div className="space-y-1">
                      <p className="font-semibold">{order.shippingAddress.name || 'Customer'}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                        {order.shippingAddress.postalCode}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  ) : (
                    <p className="text-base-content/70">No shipping information available</p>
                  )}

                  <div className="divider my-3"></div>

                  <h3 className="font-semibold">Shipping Method</h3>
                  <p className="text-base-content/70">
                    {order.shippingPrice > 0 ? 'Standard Shipping' : 'Free Shipping'}
                  </p>
                </div>
              </div>

              {/* Payment Information Card */}
              <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body p-5">
                  <h2 className="card-title text-xl mb-4">Payment Information</h2>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold">Payment Method</h3>
                      <p className="text-base-content/70">{order.paymentMethod}</p>
                    </div>

                    {order.isPaid && order.paymentResult ? (
                      <div>
                        <h3 className="font-semibold">Transaction Details</h3>
                        <p className="text-sm">
                          Transaction ID:{' '}
                          <span className="font-mono">{order.paymentResult.id}</span>
                        </p>
                        <p className="text-sm">Status: {order.paymentResult.status}</p>
                        {order.paymentResult.email_address && (
                          <p className="text-sm">Email: {order.paymentResult.email_address}</p>
                        )}
                      </div>
                    ) : (
                      <div className="alert alert-warning">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        <span>Payment pending</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Customer Support Card */}
              <div className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body p-5">
                  <h2 className="card-title text-xl mb-4">Need Help?</h2>

                  <div className="space-y-3">
                    <p className="text-base-content/70">
                      Have questions about your order or need assistance?
                    </p>
                    <Link to="/contact" className="btn btn-primary btn-block">
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
