// src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous errors
    setPasswordError('');
    
    // Basic validation
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    try {
      await register(name, email, password);
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
              <label className="label">Full Name</label>
              <input 
                type="text" 
                className="input input-bordered w-full" 
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              
              <label className="label">Email</label>
              <input 
                type="email" 
                className="input input-bordered w-full" 
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <label className="label">Password</label>
              <input 
                type="password" 
                className="input input-bordered w-full" 
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <label className="label">Confirm Password</label>
              <input 
                type="password" 
                className="input input-bordered w-full" 
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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