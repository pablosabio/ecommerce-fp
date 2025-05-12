// frontend/src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for making API requests
const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  // Add authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  // Merge options with defaults
  const config = {
    ...options,
    headers,
    credentials: 'include' // Include cookies
  };
  
  // Make the fetch request without unnecessary try/catch
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// User related API calls
export const userApi = {
  register: (userData) => fetchApi('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  
  login: (credentials) => fetchApi('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  
  logout: () => fetchApi('/users/logout', {
    method: 'POST'
  }),
  
  getCurrentUser: () => fetchApi('/users/me'),
  
  updateUser: (userData) => fetchApi('/users/me', {
    method: 'PUT',
    body: JSON.stringify(userData)
  }),
  
  uploadAvatar: (formData) => fetchApi('/users/me/avatar', {
    method: 'POST',
    headers: {}, // Remove content-type header, FormData will set it
    body: formData
  })
};

// Order related API calls
export const orderApi = {
  getUserOrders: () => fetchApi('/orders/my-orders'),
  
  getOrderById: (orderId) => fetchApi(`/orders/${orderId}`),
  
  createOrder: (orderData) => fetchApi('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  })
};

// Export all API services
export default {
  user: userApi,
  order: orderApi
};