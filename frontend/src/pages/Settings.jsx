import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const SettingsPage = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordStatus, setPasswordStatus] = useState('');
  
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  const { user, token, updateUserDetails } = useContext(AuthContext);

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

const handleChangePasswordSubmit = async (e) => {
  e.preventDefault();
  setPasswordStatus('');

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    setPasswordStatus('Error: New passwords do not match.');
    return;
  }
  if (passwordData.newPassword.length < 6) {
    setPasswordStatus('Error: New password must be at least 6 characters long.');
    return;
  }

  try {
    setPasswordStatus('Processing...');
    
    const response = await fetch('http://localhost:5000/api/users/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update password');
    }

    setPasswordStatus('Success: Password updated successfully.');
    
    
    setPasswordData({ 
      currentPassword: '', 
      newPassword: '', 
      confirmPassword: '' 
    });
  } catch (error) {
    console.error('Error updating password:', error);
    setPasswordStatus(`Error: ${error.message || 'Failed to update password'}`);
  }
};

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus('Error: Image size should not exceed 5MB');
        return;
      }
      
      if (!file.type.match('image.*')) {
        setUploadStatus('Error: Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      setUploadStatus('');
    }
  };
  
  const handleImageUpload = async (e) => {
    e.preventDefault();
    
    if (!fileInputRef.current?.files?.length) {
      setUploadStatus('Error: Please select an image to upload');
      return;
    }
    
    setIsUploading(true);
    setUploadStatus('');
    
    try {
      const formData = new FormData();
      formData.append('profile_image', fileInputRef.current.files[0]);
      
      const response = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload image');
      }
      
      // Update the user context with the new avatar
      if (updateUserDetails && typeof updateUserDetails === 'function') {
        updateUserDetails(data.data);
      }
      
      setUploadStatus('Success: Profile picture updated successfully');
      // Clear the file input
      fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus(`Error: ${error.message || 'Failed to upload image'}`);
    } finally {
      setIsUploading(false);
    }
  };


return (
  <div className="container mx-auto p-4 md:p-8 mt-16 md:mt-20 min-h-screen">
    {/* Page Header Section */}
    <div className="text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Account Settings</h1>
      <p className="text-base-content/70 max-w-xl mx-auto">
        Manage your profile, security preferences, and account details
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1">
        <div className="card bg-base-100 shadow-xl border border-base-200 sticky top-24">
          <div className="card-body p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="avatar mb-4">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" />
                  ) : user?.profile_avatar ? (
                    <img src={user.profile_avatar} alt="Current avatar" />
                  ) : (
                    <img 
                      src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.email || 'default'}&backgroundColor=FF6B35,FFBA86&backgroundType=gradientLinear`} 
                      alt="Default avatar" 
                    />
                  )}
                </div>
              </div>
              <h2 className="text-xl font-bold">{user?.first_name} {user?.last_name}</h2>
              <p className="text-sm text-base-content/60">{user?.email}</p>
            </div>
            
            <div className="divider my-2"></div>
            
            <ul className="menu bg-base-200 rounded-box w-full">
              <li className="menu-title">
                <span>Settings</span>
              </li>
              <li><a className="active">Profile</a></li>
              <li><a>Security</a></li>
              <li><a>Notifications</a></li>
              <li><a>Payment Methods</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="lg:col-span-2 space-y-8">
        {/* Profile Image Section */}
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-xl flex items-center gap-2 mb-6">
              <div className="bg-orange-500/10 w-8 h-8 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Profile Picture
            </h2>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar Preview */}
              <div className="flex flex-col items-center">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview" className="object-cover" />
                    ) : user?.profile_avatar ? (
                      <img src={user.profile_avatar} alt="Current avatar" className="object-cover" />
                    ) : (
                      <img 
                        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.email || 'default'}&backgroundColor=FF6B35,FFBA86&backgroundType=gradientLinear`} 
                        alt="Default avatar" 
                      />
                    )}
                  </div>
                </div>
                <p className="text-sm mt-2 text-center">
                  {avatarPreview ? "Preview" : "Current Avatar"}
                </p>
              </div>
              
              {/* Upload Form */}
              <div className="flex-1">
                <form onSubmit={handleImageUpload} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Select a new profile picture</span>
                    </label>
                    <div className="flex">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                      />
                    </div>
                    <label className="label">
                      <span className="label-text-alt">Max file size: 5MB. Supported formats: JPG, PNG, GIF</span>
                    </label>
                  </div>
                  
                  {uploadStatus && (
                    <div className={`mt-2 text-sm ${uploadStatus.includes('Error') ? 'text-error' : 'text-success'}`}>
                      {uploadStatus}
                    </div>
                  )}
       <button
  type="submit"
  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-orange-500 border-b-4 border-orange-700 text-white font-medium transition-all duration-300 hover:bg-orange-600 hover:translate-y-[1px] hover:border-b-2 disabled:opacity-60 disabled:cursor-not-allowed"
  disabled={isUploading || !avatarPreview}
>
  {isUploading ? (
    <>
      <span className="loading loading-spinner loading-xs mr-2"></span>
      Uploading...
    </>
  ) : 'Update Profile Picture'}
</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-xl flex items-center gap-2 mb-6">
              <div className="bg-orange-500/10 w-8 h-8 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              Security Settings
            </h2>
            
            {/* Change password form */}
            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label" htmlFor="currentPassword">
                  <span className="label-text font-medium">Current Password</span>
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="input input-bordered w-full focus:border-orange-500 transition-colors"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="newPassword">
                  <span className="label-text font-medium">New Password</span>
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="input input-bordered w-full focus:border-orange-500 transition-colors"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="confirmPassword">
                  <span className="label-text font-medium">Confirm New Password</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="input input-bordered w-full focus:border-orange-500 transition-colors"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <div className="card-actions">
              <button 
  type="submit" 
  className="btn bg-orange-500 border-b-4 border-orange-700 text-white font-medium transition-all duration-300 hover:bg-orange-600 hover:translate-y-[1px] hover:border-b-2"
>
  Update Password
</button>
              </div>
              {passwordStatus && (
                <div className={`mt-2 text-sm ${passwordStatus.includes('Error') ? 'text-error' : 'text-success'} bg-base-200 p-3 rounded-lg`}>
                  {passwordStatus}
                </div>
              )}
            </form>
          </div>
        </div>
        
        {/* Email Preferences Section */}
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-xl flex items-center gap-2 mb-6">
              <div className="bg-orange-500/10 w-8 h-8 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              Email Preferences
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <div>
                  <h3 className="font-medium">Order Confirmations</h3>
                  <p className="text-sm text-base-content/70">Receive emails for order updates and shipping information</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <div>
                  <h3 className="font-medium">Promotional Emails</h3>
                  <p className="text-sm text-base-content/70">Get notified about special offers and discounts</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <div>
                  <h3 className="font-medium">Product Updates</h3>
                  <p className="text-sm text-base-content/70">Receive news about new products and features</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" />
              </div>
            </div>
            
            <div className="card-actions mt-4">
            <button 
  className="btn bg-orange-500 border-b-4 border-orange-700 text-white font-medium transition-all duration-300 hover:bg-orange-600 hover:translate-y-[1px] hover:border-b-2"
>
  Save Preferences
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);





};

export default SettingsPage;