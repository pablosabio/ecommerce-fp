// frontend/src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const { register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous errors
    setPasswordError('');
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    try {
      await register(
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.password
      );
      navigate('/profile'); // Redirect to profile page after registration
    } catch (err) {
      // Error is handled by the context
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen pt-16">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create an Account</h1>
          <p className="py-6">
            Join our community to enjoy a personalized shopping experience, track your orders, and access exclusive offers.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            {error && (
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <fieldset className="fieldset">
              <label className="label">First Name</label>
              <input 
                type="text" 
                name="first_name"
                className="input input-bordered w-full" 
                placeholder="John"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              
              <label className="label">Last Name</label>
              <input 
                type="text" 
                name="last_name"
                className="input input-bordered w-full" 
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              
              <label className="label">Email</label>
              <input 
                type="email" 
                name="email"
                className="input input-bordered w-full" 
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <label className="label">Password</label>
              <input 
                type="password" 
                name="password"
                className="input input-bordered w-full" 
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
              
              <label className="label">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                className="input input-bordered w-full" 
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              
              {passwordError && (
                <div className="mt-2 text-error text-sm">
                  {passwordError}
                </div>
              )}
              
              <button 
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Processing...
                  </>
                ) : 'Register'}
              </button>
              
              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account? 
                  <Link to="/login" className="link link-primary ml-1">
                    Login here
                  </Link>
                </p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;