// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
    credentials: 'include',
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const userApi = {
  register: (userData) =>
    fetchApi('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    fetchApi('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    fetchApi('/users/logout', {
      method: 'POST',
    }),

  getCurrentUser: () => fetchApi('/users/me'),

  updateUser: (userData) =>
    fetchApi('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  uploadAvatar: (formData) =>
    fetchApi('/users/me/avatar', {
      method: 'POST',
      headers: {},
      body: formData,
    }),
};

export const orderApi = {
  getUserOrders: () => fetchApi('/orders/my-orders'),

  getOrderById: (orderId) => fetchApi(`/orders/${orderId}`),

  createOrder: (orderData) =>
    fetchApi('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
};

export default {
  user: userApi,
  order: orderApi,
};
