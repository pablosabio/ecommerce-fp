// In frontend/src/pages/Settings.jsx
import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const SettingsPage = () => {
  // Keep existing states and add new ones for profile image
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordStatus, setPasswordStatus] = useState('');
  
  // New states for profile image
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Get user context
  const { user, token, updateUserDetails } = useContext(AuthContext);

  // Password handlers (keep existing ones)
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

const handleChangePasswordSubmit = async (e) => {
  e.preventDefault();
  setPasswordStatus('');

  // Client-side validation
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    setPasswordStatus('Error: New passwords do not match.');
    return;
  }
  if (passwordData.newPassword.length < 6) {
    setPasswordStatus('Error: New password must be at least 6 characters long.');
    return;
  }

  try {
    // Show loading state
    setPasswordStatus('Processing...');
    
    // Make API call to update password
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

    // Password updated successfully
    setPasswordStatus('Success: Password updated successfully.');
    
    // Clear form fields
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

  // NEW - Profile image handlers
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus('Error: Image size should not exceed 5MB');
        return;
      }
      
      // Check file type
      if (!file.type.match('image.*')) {
        setUploadStatus('Error: Please select an image file');
        return;
      }
      
      // Preview the image
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
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
        Settings
      </h1>

      <div className="space-y-8">
        {/* NEW - Profile Image Section */}
        <div className="card bg-base-100 shadow-lg border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">
              Profile Picture
            </h2>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Current Avatar */}
              <div className="flex flex-col items-center">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview" />
                    ) : user?.profile_avatar ? (
                      <img src={user.profile_avatar} alt="Current avatar" />
                    ) : (
                      <img src={`https://robohash.org/${user?.last_name || 'user'}`} alt="Default avatar" />
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
                      <span className="label-text">Select a new profile picture</span>
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="file-input file-input-bordered w-full"
                    />
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
                    className="btn btn-primary"
                    disabled={isUploading || !avatarPreview}
                  >
                    {isUploading ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Uploading...
                      </>
                    ) : 'Update Profile Picture'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings Section - Keep your existing password change section */}
        <div className="card bg-base-100 shadow-lg border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">
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