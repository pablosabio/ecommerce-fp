// src/pages/Profile.jsx
import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Profile() {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="container mx-auto p-4 pt-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <div className="card bg-base-100 shadow-xl md:col-span-1">
          <div className="card-body items-center text-center">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile avatar" />
              </div>
            </div>
            <h2 className="card-title mt-4">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs mt-2">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-sm btn-outline">Edit Profile</button>
              <button className="btn btn-sm btn-outline btn-error" onClick={logout}>Logout</button>
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
                  <td>{user.name}</td>
                </tr>
                {/* Account ID */}
                <tr>
                  <td className="font-medium">Account ID</td>
                  <td className="font-mono text-xs">{user.id}</td>
                </tr>
                {/* Account Creation Date */}
                <tr>
                  <td className="font-medium">Member Since</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
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
              <button className="btn btn-outline btn-sm">
                Payment Methods
              </button>
              <button className="btn btn-outline btn-sm">
                Address Book
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Summary Card */}
      <div className="card bg-base-100 shadow-xl mt-8">
        <div className="card-body">
          <h2 className="card-title">Recent Orders</h2>
          <div className="divider my-1"></div>
          
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
                {/* This would come from an API call in a real app */}
                <tr className="hover">
                  <td className="font-mono text-xs">6819d75f8167355ecb0f68bc</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td>$149.99</td>
                  <td>
                    <span className="badge badge-success">Completed</span>
                  </td>
                  <td>
                    <Link to="/order/6819d75f8167355ecb0f68bc" className="btn btn-xs btn-outline">
                      View
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="card-actions justify-end mt-4">
            <Link to="/orders" className="btn btn-primary btn-sm">
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}