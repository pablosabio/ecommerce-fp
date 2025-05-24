// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'https://quickcart-api.onrender.com/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from local storage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken || null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save user and token to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }

    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const register = async (first_name, last_name, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This allows cookies to be sent
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
        }),
      });

      // First check if the response is valid before trying to parse JSON
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Registration failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setUser(data.data.user);
      setToken(data.data.token);

      return data.data.user;
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This allows cookies to be sent
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser(data.data.user);
      setToken(data.data.token);

      return data.data.user;
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  // Check if token is still valid (can be used on app load)
  const checkAuthStatus = useCallback(async () => {
    if (!token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        setUser(null);
        setToken(null);
        return false;
      }

      const data = await response.json();
      setUser(data.data);
      return true;
    } catch (err) {      // eslint-disable-line no-unused-vars

      setUser(null);
      setToken(null);
      return false;
    }
  }, [token]);

  // Check authentication status on mount
  useEffect(() => {
    if (token) {
      checkAuthStatus();
    }
  }, [token, checkAuthStatus]);

  const updateUserDetails = async (userData) => {
    // if we received updated user data directly, just update the state
    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    }

    // if we didn't receive updated user data, fetch it from the server
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to get updated user data');
      }

      const data = await response.json();
      setUser(data.data);
      localStorage.setItem('user', JSON.stringify(data.data));
      return data.data;
    } catch (err) {
      console.error('Error updating user details:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        checkAuthStatus,
        updateUserDetails,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
