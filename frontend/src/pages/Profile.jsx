import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Profile() {
  const { user, token, isAuthenticated, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;

      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/orders/my-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, token]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto p-4 pt-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <div className="card bg-base-100 shadow-xl md:col-span-1">
          <div className="card-body items-center text-center">
            {/* Profile Avatar Section */}
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user.profile_avatar ? (
                  <img src={user.profile_avatar} alt={`${user.first_name}'s avatar`} />
                ) : (
                  <img
                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.email}&backgroundColor=FF6B35,FFBA86&backgroundType=gradientLinear`}
                    alt={`${user.first_name}'s avatar`}
                  />
                )}
              </div>
            </div>
            <h2 className="card-title mt-4">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs mt-2">Member since {formatDate(user.createdAt)}</p>
            <div className="card-actions justify-center mt-4">
              <Link to="/settings" className="btn btn-sm btn-outline">
                Edit Profile
              </Link>
              <button className="btn btn-sm btn-outline btn-error" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Account Details Card */}
        <div className="card bg-base-100 shadow-xl md:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Account Details</h2>
            <div className="divider my-1"></div>

            <table className="table w-full">
              <tbody>
                {/* Email */}
                <tr>
                  <td className="font-medium">Email</td>
                  <td>{user.email}</td>
                </tr>
                {/* Name */}
                <tr>
                  <td className="font-medium">Full Name</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                </tr>
                {/* Account ID */}
                <tr>
                  <td className="font-medium">Account ID</td>
                  <td className="font-mono text-xs">{user._id}</td>
                </tr>
                {/* Account Creation Date */}
                <tr>
                  <td className="font-medium">Member Since</td>
                  <td>{formatDate(user.createdAt)}</td>
                </tr>
                {/* Role */}
                <tr>
                  <td className="font-medium">Account Type</td>
                  <td className="capitalize">{user.role}</td>
                </tr>
              </tbody>
            </table>

            <div className="divider my-2">Settings</div>

            <div className="flex flex-wrap gap-2">
              <Link to="/settings" className="btn btn-outline btn-sm">
                Account Settings
              </Link>
              <Link to="/orders" className="btn btn-outline btn-sm">
                Order History
              </Link>
              <button className="btn btn-outline btn-sm">Payment Methods</button>
              <Link to="/addresses" className="btn btn-outline btn-sm">
                Address Book
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Card */}
      <div className="card bg-base-100 shadow-xl mt-8">
        <div className="card-body">
          <h2 className="card-title">Recent Orders</h2>
          <div className="divider my-1"></div>

          {loading ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">You haven't placed any orders yet.</p>
              <Link to="/shop" className="btn btn-primary mt-4">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 3).map((order) => (
                    <tr key={order._id} className="hover">
                      <td className="font-mono text-xs">{order._id}</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? (
                          <span className="badge badge-success">Paid</span>
                        ) : (
                          <span className="badge badge-warning">Processing</span>
                        )}
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`} className="btn btn-xs btn-outline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {orders.length > 0 && (
            <div className="card-actions justify-end mt-4">
              <Link to="/orders" className="btn btn-primary btn-sm">
                View All Orders
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
