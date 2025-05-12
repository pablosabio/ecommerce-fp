
import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { cartItems, subtotal } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  
  // Brand color constant for consistency
  const BRAND_COLOR = "text-orange-500"; // Brand orange color
  const BRAND_BG = "bg-orange-500"; // Brand orange background

  // Check if the current path matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Monitor window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50 px-3 md:px-5 transition-all duration-200">
      {/* LEFT PART - LOGO AND BURGER MENU */}
      <div className="navbar-start">
        {/* Hamburger menu (only visible on small screens) */}
        <div className="lg:hidden mr-2">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-sm rounded-btn" aria-label="Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 animate-fadeIn">
              {isMobile && isSearchOpen ? null : (
                <>
                  <li>
                    <Link to="/" className={isActive('/') ? `font-bold ${BRAND_COLOR}` : ""}>
                      Home
                      {isActive('/') && <span className={`absolute bottom-0 left-0 w-full h-0.5 ${BRAND_BG}`}></span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop" className={isActive('/shop') ? `font-bold ${BRAND_COLOR}` : ""}>
                      Shop
                      {isActive('/shop') && <span className={`absolute bottom-0 left-0 w-full h-0.5 ${BRAND_BG}`}></span>}
                    </Link>
                  </li>
                  <li>
                    <details>
                      <summary>Categories</summary>
                      <ul className="p-2 bg-base-100">
                        <li><Link to="/category/audio">Audio</Link></li>
                        <li><Link to="/category/computers">Computers</Link></li>
                        <li><Link to="/category/smartphones">Smartphones</Link></li>
                        <li><Link to="/category/accessories">Accessories</Link></li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <Link to="/about" className={isActive('/about') ? `font-bold ${BRAND_COLOR}` : ""}>
                      About Us
                      {isActive('/about') && <span className={`absolute bottom-0 left-0 w-full h-0.5 ${BRAND_BG}`}></span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className={isActive('/contact') ? `font-bold ${BRAND_COLOR}` : ""}>
                      Contact Us
                      {isActive('/contact') && <span className={`absolute bottom-0 left-0 w-full h-0.5 ${BRAND_BG}`}></span>}
                    </Link>
                  </li>
                </>
              )}
              {/* Search input for mobile when menu is open */}
              {isMobile && (
                <div className="p-2">
                  <div className="form-control">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
        
        {/* Logo with enhanced contrast */}
        <Link to="/" className="btn btn-ghost text-2xl font-extrabold inline-flex items-center gap-0 hover:bg-base-200 transition-colors">
          Quick<span className="text-orange-500 font-black">Cart</span>
        </Link>
      </div>

      {/* CENTER - HORIZONTAL LINKS (only visible on large screens) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-medium">
          <li>
            <Link 
              to="/" 
              className={`hover:bg-base-200 transition-colors ${isActive('/') ? `font-semibold relative ${BRAND_COLOR}` : ''}`}
            >
              Home
              {isActive('/') && <span className={`absolute bottom-0 left-0 w-full h-0.5 ${BRAND_BG}`}></span>}
            </Link>
          </li>
          <li>
            <Link 
              to="/shop" 
              className={`hover:bg-base-200 transition-colors ${isActive('/shop') ? `font-semibold relative ${BRAND_COLOR}` : ''}`}
            >
              Shop
              {isActive('/shop') && <span className={`absolute bottom-0 left-0 w-full h-0.5 ${BRAND_BG}`}></span>}
            </Link>
          </li>
          <li>
            <details>
              <summary className="hover:bg-base-200 transition-colors">Categories</summary>
              <ul className="p-2 bg-base-100 shadow rounded-box z-[1] animate-fadeIn">
                <li><Link to="/category/audio" className="hover:bg-base-200">Audio</Link></li>
                <li><Link to="/category/computers" className="hover:bg-base-200">Computers</Link></li>
                <li><Link to="/category/smartphones" className="hover:bg-base-200">Smartphones</Link></li>
                <li><Link to="/category/accessories" className="hover:bg-base-200">Accessories</Link></li>
              </ul>
            </details>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`hover:bg-base-200 transition-colors ${isActive('/about') ? `font-semibold relative ${BRAND_COLOR}` : ''}`}
            >
              About Us
              {isActive('/about') && <span className={`absolute bottom-0 left-0 w-full h-0.5 ${BRAND_BG}`}></span>}
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`hover:bg-base-200 transition-colors ${isActive('/contact') ? `font-semibold relative ${BRAND_COLOR}` : ''}`}
            >
              Contact Us
              {isActive('/contact') && <span className={`absolute bottom-0 left-0 w-full h-0.5 ${BRAND_BG}`}></span>}
            </Link>
          </li>
        </ul>
      </div>

      {/* RIGHT PART - THEME CHANGER, SEARCH, CART, USER */}
      <div className="navbar-end gap-2 md:gap-3">
        {/* Theme toggle with tooltip */}
        <div className="tooltip tooltip-bottom" data-tip="Toggle theme">
          <label className="swap swap-rotate">
            <input type="checkbox" value="dark" className="theme-controller" />
            <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        {/* Search - Expandable on mobile */}
        {/* Search - Only visible on desktop */}
          {!isMobile && (
            <div className="form-control">
              <input
                type="text"
                placeholder="Search products..."
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
          )}

        {/* Cart with preview - now with orange ring matching user icon */}
        <div className="dropdown dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost btn-circle tooltip tooltip-bottom" 
            data-tip="Cart"
            aria-label="Shopping cart"
          >
            <div className="indicator w-10 h-10 flex items-center justify-center rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0
                  0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className={`badge badge-sm indicator-item ${BRAND_BG} text-white`}>
                
                {cartItems.reduce((total, item) => total + item.quantity, 0)}

              </span>
            </div>
          </div>
          <div tabIndex={0} className="card dropdown-content z-[1] mt-3 shadow bg-base-100 rounded-box w-72 animate-fadeIn">
            <div className="card-body p-4">
              <span className="text-lg font-bold">
                Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)
                </span>
              
              {/* Mini cart preview */}
              <div className="max-h-64 overflow-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            {cartItems.slice(0, 3).map(item => (
              <div key={item.id} className="flex items-center gap-2 py-2 border-b">
                <div className="w-10 h-10 bg-gray-200 rounded-md flex-shrink-0">
                  {item.imageSrc && <img src={item.imageSrc} alt={item.name} className="w-full h-full object-cover rounded-md" />}
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            
            {cartItems.length > 3 && (
              <div className="text-xs text-center mt-2 text-gray-500">
                + {cartItems.length - 3} more items
              </div>
            )}
          </>
        )}
      </div>

              
              <div className="mt-3">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span className={`font-semibold ${BRAND_COLOR}`}>
                    ${subtotal.toFixed(2)}
                    </span>
                </div>
                <div className="card-actions justify-end">
                  <Link to="/cart" className={`btn ${BRAND_BG} text-white hover:bg-orange-600 btn-block border-none`}>
                    View Cart & Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
{/* User */}
<div className="dropdown dropdown-end">
  <div 
    tabIndex={0} 
    role="button" 
    className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" 
    data-tip={isAuthenticated ? `${user.first_name} ${user.last_name}` : "Account"}
    aria-label="User account"
  >
    <div className="w-10 rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2">
      {isAuthenticated ? (
        user.profile_avatar ? (
          // User has a custom avatar
          <img
            alt={`${user.first_name}'s profile`}
            src={user.profile_avatar}
          />
        ) : (
          // User is authenticated but has no custom avatar, use Robohash
          <img 
            alt={`${user.first_name}'s avatar`} 
            src={`https://robohash.org/${user.last_name || user.first_name}`} 
          />
        )
      ) : (
        // Not authenticated, show user icon
        <div className="bg-white w-full h-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
    </div>
  </div>
  <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow animate-fadeIn">
    {isAuthenticated ? (
      // Show these options only when user is logged in
      <>
        <li className="menu-title pb-0">
          <span className="text-sm opacity-60">Welcome, {user.first_name}!</span>
        </li>
        <li>
          <Link to="/profile" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/orders" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Orders
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
        </li>
        <div className="divider my-1"></div>
        <li>
          <button 
            onClick={logout}
            className={`${BRAND_COLOR} flex items-center gap-2`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log out
          </button>
        </li>
      </>
    ) : (
      // When not logged in, only show Login and Register options
      <>
        <li>
          <Link to="/login" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Register
          </Link>
        </li>
      </>
    )}
  </ul>
</div>

      </div>
    </div>
  )
}