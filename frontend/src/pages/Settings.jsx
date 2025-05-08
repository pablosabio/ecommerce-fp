// src/pages/SettingsPage.jsx
import React, { useState } from 'react'; // useEffect is no longer needed here

const SettingsPage = () => {
  // --- Mock state for change password form ---
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordStatus, setPasswordStatus] = useState('');

  // Password input fields change handler
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Change password form submission handler (mock)
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordStatus(''); // Clear previous message

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus('Error: New passwords do not match.');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordStatus('Error: New password must be at least 6 characters long.');
      return;
    }
    // Here you can add logic to call the backend to change the password
    console.log('Attempting to change password (mock):', passwordData);
    setPasswordStatus('Success: Password change request submitted (mock).');
    // Clear fields after a "successful" (mock) attempt
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };


  return (
    <div className="container mx-auto p-4 md:p-8 mt-16 md:mt-20 min-h-screen"> {/* Ensure page height */}
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
        Settings
      </h1>

      <div className="space-y-8"> {/* Space between settings cards (if you add other sections later) */}

        {/* --- Account Settings Section --- */}
        <div className="card bg-base-100 shadow-lg border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">
              {/* <FiUser className="mr-2" /> Example of using an icon */}
              Account Settings
            </h2>
            {/* Change password form (simplified example) */}
            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <p className="text-lg font-medium">Change Password</p>
              <div className="form-control">
                <label className="label" htmlFor="currentPassword">
                  <span className="label-text">Current Password</span>
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="input input-bordered w-full"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="newPassword">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="input input-bordered w-full"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="confirmPassword">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="input input-bordered w-full"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm">
                {/* <FiLock className="mr-2" /> Example of using an icon */}
                Update Password
              </button>
              {passwordStatus && (
                <p className={`mt-2 text-sm ${passwordStatus.includes('Error') ? 'text-error' : 'text-success'}`}>
                  {passwordStatus}
                </p>
              )}
            </form>
          </div>
        </div>



      </div>
    </div>
  );
};

export default SettingsPage;