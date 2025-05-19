// frontend/src/pages/OrderHistory.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getMyOrders } from '../services/orderService';

const OrderHistory = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // For order filtering

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getMyOrders(token);
        setOrders(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load your order history. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter orders based on active tab
  const filteredOrders = () => {
    switch (activeTab) {
      case 'processing':
        return orders.filter(order => !order.isPaid);
      case 'completed':
        return orders.filter(order => order.isPaid);
      case 'delivered':
        return orders.filter(order => order.isDelivered);
      default:
        return orders;
    }
  };

  // Get badge color based on order status
  const getStatusBadge = (order) => {
    if (!order.isPaid) {
      return 'badge-warning';
    } else if (order.isDelivered) {
      return 'badge-success';
    } else {
      return 'badge-info';
    }
  };

  // Get status text
  const getStatusText = (order) => {
    if (!order.isPaid) {
      return 'Processing';
    } else if (order.isDelivered) {
      return 'Delivered';
    } else {
      return 'Paid';
    }
  };

  return (
    <div className="pt-18 min-h-screen">
      {/* Hero Section */}
      <section className="bg-base-200 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Your Orders</h1>
          <p className="text-lg text-base-content/70 mb-6">
            View and track all your QuickCart purchases in one place.
          </p>
          
          {/* Order Stats Summary */}
          {!loading && !error && orders.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="stat bg-base-100 shadow rounded-lg p-4">
                <div className="stat-title">Total Orders</div>
                <div className="stat-value text-3xl">{orders.length}</div>
              </div>
              <div className="stat bg-base-100 shadow rounded-lg p-4">
                <div className="stat-title">Processing</div>
                <div className="stat-value text-3xl text-warning">
                  {orders.filter(order => !order.isPaid).length}
                </div>
              </div>
              <div className="stat bg-base-100 shadow rounded-lg p-4">
                <div className="stat-title">Completed</div>
                <div className="stat-value text-3xl text-info">
                  {orders.filter(order => order.isPaid).length}
                </div>
              </div>
              <div className="stat bg-base-100 shadow rounded-lg p-4">
                <div className="stat-title">Delivered</div>
                <div className="stat-value text-3xl text-success">
                  {orders.filter(order => order.isDelivered).length}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Order History Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="flex flex-col items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="mt-4 text-lg">Loading your order history...</p>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-error shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold">Error</h3>
                <div className="text-xs">{error}</div>
              </div>
              <button onClick={() => window.location.reload()} className="btn btn-sm">Try Again</button>
            </div>
          ) : orders.length === 0 ? (
            <div className="card bg-base-100 shadow-xl text-center py-16">
              <div className="card-body items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h2 className="card-title text-2xl mb-2">No Orders Yet</h2>
                <p className="mb-6 text-base-content/70">You haven't placed any orders with us yet.</p>
                <Link to="/shop" className="btn btn-primary">
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Filter Tabs */}
              <div className="tabs tabs-boxed bg-base-200 p-1 mb-6 inline-flex">
                <button 
                  className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All Orders
                </button>
                <button 
                  className={`tab ${activeTab === 'processing' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('processing')}
                >
                  Processing
                </button>
                <button 
                  className={`tab ${activeTab === 'completed' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('completed')}
                >
                  Completed
                </button>
                <button 
                  className={`tab ${activeTab === 'delivered' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('delivered')}
                >
                  Delivered
                </button>
              </div>

              {/* Order Cards - For Mobile */}
              <div className="grid grid-cols-1 gap-4 mb-8 md:hidden">
                {filteredOrders().map(order => (
                  <div key={order._id} className="card bg-base-100 shadow-xl">
                    <div className="card-body p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="card-title text-base">Order #{order._id.substring(order._id.length - 8)}</h3>
                          <p className="text-sm text-base-content/70">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className={`badge ${getStatusBadge(order)}`}>
                          {getStatusText(order)}
                        </div>
                      </div>
                      
                      <div className="divider my-2"></div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Items:</span>
                          <span className="text-sm">{order.orderItems.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Total:</span>
                          <span className="text-sm font-bold">${order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="card-actions justify-end mt-3">
                        <Link to={`/order/${order._id}`} className="btn btn-primary btn-sm">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Table - For Desktop */}
              <div className="overflow-x-auto shadow-lg rounded-lg hidden md:block">
                <table className="table w-full">
                  <thead className="bg-base-200">
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders().map(order => (
                      <tr key={order._id} className="hover">
                        <td className="font-mono text-xs">{order._id}</td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>{order.orderItems.length} item(s)</td>
                        <td className="font-semibold">${order.totalPrice.toFixed(2)}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(order)}`}>
                            {getStatusText(order)}
                          </span>
                        </td>
                        <td>
                          <Link 
                            to={`/order/${order._id}`} 
                            className="btn btn-primary btn-sm"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrderHistory;