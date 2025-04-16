// src/pages/ProfilePage.jsx
import React, { useState } from 'react';

// Helper function to format date (you can customize the format)
const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    // Example format: January 15, 2024
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original string if formatting fails
  }
};

const ProfilePage = () => {
  // --- Mock User Data ---
  // In a real application, this data would likely come from an API call or authentication context
  const [user] = useState({
    id: 'user123',
    name: 'Pablo User', // Example Name
    email: 'pablo.user@example.com', // Example Email
    // Placeholder image - replace with actual user avatar URL
    avatarUrl: 'https://gravatar.com/avatar/0bd3af726464f06013bb51afad3dd943?s=400&d=robohash&r=x',
    joinDate: '2024-01-15', // Example join date
    location: 'Cologne, Germany', // Example location (optional)
    // You can add more profile fields here (e.g., bio, phone number)
  });

  // --- Event Handlers (Placeholder functions) ---
  const handleEditProfile = () => {
    alert('Redirecting to Edit Profile page...');
    // Add logic to navigate to an edit profile form/modal
  };

  const handleChangePassword = () => {
    alert('Opening Change Password modal/page...');
    // Add logic to show a change password form/modal
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
      // Add actual logout logic here (e.g., clear auth token, redirect to login)
    }
  };

  // --- Render Logic ---
  if (!user) {
    // Optional: Add a loading state if user data is fetched asynchronously
    return (
      <div className="container mx-auto p-8 text-center min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-lg loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 mt-16 md:mt-20">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
        My Profile
      </h1>

      {/* Main Profile Card */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body flex flex-col items-center md:flex-row md:items-start md:gap-8 p-6 md:p-8">

          {/* Avatar Section */}
          <div className="avatar mb-4 md:mb-0 flex-shrink-0">
            <div className="w-28 md:w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {/* Display user avatar or a default one */}
              <img src={user.avatarUrl || '/path/to/default-avatar.png'} alt={`${user.name}'s Avatar`} />
            </div>
          </div>

          {/* User Information & Actions Section */}
          <div className="flex-grow text-center md:text-left">
            {/* User Name */}
            <h2 className="text-2xl md:text-3xl font-semibold text-base-content">
              {user.name}
            </h2>

            {/* User Email */}
            <p className="text-base text-base-content/80 mt-1">
              {user.email}
            </p>

            {/* Optional: Location */}
            {user.location && (
              <p className="text-sm text-base-content/70 mt-3 flex items-center justify-center md:justify-start gap-1">
                {/* Optional: Add an icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.274 1.765 11.842 11.842 0 00.757.433.61.61 0 00.28.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                {user.location}
              </p>
            )}

            {/* Join Date */}
            <p className="text-sm text-base-content/60 mt-2">
              Member since: {formatDate(user.joinDate)}
            </p>

            {/* Divider */}
            <div className="divider my-4 md:my-6"></div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={handleEditProfile}
                className="btn btn-primary btn-sm"
              >
                Edit Profile
              </button>
              <button
                onClick={handleChangePassword}
                className="btn btn-outline btn-sm"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-sm text-error hover:bg-error/10"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Add other sections like Order History, Saved Addresses etc. here */}
      {/* Example:
      <div className="mt-8 card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <h3 className="card-title">Order History</h3>
          <p>Your recent orders will appear here...</p>
          <div className="card-actions justify-end">
            <button className="btn btn-link btn-sm">View All Orders</button>
          </div>
        </div>
      </div>
      */}

    </div>
  );
};

export default ProfilePage;