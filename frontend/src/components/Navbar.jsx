// Updated Navbar.jsx with enhanced styling
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { cartItems, subtotal } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Brand color constants for consistency
  const BRAND_COLOR = "text-orange-500";
  const BRAND_BG = "bg-orange-500";
  const BRAND_HOVER = "hover:bg-orange-600";

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    
      <div className="navbar bg-base-100 shadow-md fixed top-0 z-50 px-3 md:px-5 transition-all duration-300">
        {/* LEFT PART - LOGO AND BURGER MENU */}
        <div className="navbar-start">
          {/* Hamburger menu (only visible on small screens) */}
          <div className="lg:hidden mr-2">
            <button 
              onClick={toggleMenu}
              className={`btn btn-ghost btn-sm rounded-btn ${isMenuOpen ? 'bg-base-200' : ''}`} 
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen 
                    ? "M6 18L18 6M6 6l12 12" 
                    : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
            
            {/* Mobile menu dropdown */}
            <div 
              className={`menu menu-sm dropdown-content mt-3 p-4 shadow-lg bg-base-100 rounded-box w-60 absolute top-full left-0 transition-all duration-300 origin-top-left ${
                isMenuOpen 
                  ? 'scale-100 opacity-100 z-50' 
                  : 'scale-95 opacity-0 -z-10'
              }`}
            >
              <form onSubmit={handleSearchSubmit} className="w-full mb-4">
                <div className="form-control relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="input input-bordered w-full pr-10 focus:border-orange-500 transition-colors duration-300"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button 
                    type="submit" 
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
              
              <ul className="space-y-0">
                <li>
                  <Link 
                    to="/" 
                    className={`block py-2 px-3 rounded-lg transition-colors duration-200 ${isActive('/') 
                      ? `font-bold ${BRAND_COLOR} bg-orange-50 dark:bg-orange-900/10` 
                      : 'hover:bg-base-200'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/shop" 
                    className={`block py-2 px-3 rounded-lg transition-colors duration-200 ${isActive('/shop') 
                      ? `font-bold ${BRAND_COLOR} bg-orange-50 dark:bg-orange-900/10` 
                      : 'hover:bg-base-200'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Shop
                  </Link>
                </li>
{/* Categories dropdown - with arrow fix */}
{/* Categories dropdown - aggressive arrow fix */}
<li className="relative py-0 my-0" style={{ margin: 0 }}>
  <button 
    onClick={(e) => {
      const detailsElement = e.currentTarget.nextSibling;
      if (detailsElement) {
        detailsElement.open = !detailsElement.open;
      }
    }}
    className="w-full text-left flex justify-between items-center py-2 px-3 rounded-lg hover:bg-base-200 cursor-pointer"
  >
    <span>Categories</span>
    <svg 
      className="h-4 w-4" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  <details className="!list-none" style={{ marginTop: 0 }}>
    <summary className="hidden"></summary>
    <ul className="mt-1 ml-4 space-y-0">
      <li>
        <Link 
          to="/category/audio" 
          className="block py-2 px-3 rounded-lg hover:bg-base-200 transition-colors duration-200"
          onClick={() => setIsMenuOpen(false)}
        >
          Audio
        </Link>
      </li>
      <li>
        <Link 
          to="/category/computers" 
          className="block py-2 px-3 rounded-lg hover:bg-base-200 transition-colors duration-200"
          onClick={() => setIsMenuOpen(false)}
        >
          Computers
        </Link>
      </li>
      <li>
        <Link 
          to="/category/smartphones" 
          className="block py-2 px-3 rounded-lg hover:bg-base-200 transition-colors duration-200"
          onClick={() => setIsMenuOpen(false)}
        >
          Smartphones
        </Link>
      </li>
      <li>
        <Link 
          to="/category/accessories" 
          className="block py-2 px-3 rounded-lg hover:bg-base-200 transition-colors duration-200"
          onClick={() => setIsMenuOpen(false)}
        >
          Accessories
        </Link>
      </li>
    </ul>
  </details>
</li>

                <li>
                  <Link 
                    to="/about" 
                    className={`block py-2 px-3 rounded-lg transition-colors duration-200 ${isActive('/about') 
                      ? `font-bold ${BRAND_COLOR} bg-orange-50 dark:bg-orange-900/10` 
                      : 'hover:bg-base-200'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className={`block py-2 px-3 rounded-lg transition-colors duration-200 ${isActive('/contact') 
                      ? `font-bold ${BRAND_COLOR} bg-orange-50 dark:bg-orange-900/10` 
                      : 'hover:bg-base-200'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Logo with enhanced styling */}
          <Link 
            to="/" 
            className="btn btn-ghost text-2xl font-extrabold inline-flex items-center gap-0 hover:bg-base-200 transition-colors px-2 normal-case"
          >
            <span className="relative">
              Quick<span className={`${BRAND_COLOR} font-black`}>Cart</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </span>
          </Link>
        </div>

        {/* CENTER - HORIZONTAL LINKS (only visible on large screens) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-medium">
            <li>
              <Link 
                to="/" 
                className={`hover:bg-base-200 transition-all duration-200 ${
                  isActive('/') 
                    ? `font-semibold relative ${BRAND_COLOR} after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:${BRAND_BG}` 
                    : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/shop" 
                className={`hover:bg-base-200 transition-all duration-200 ${
                  isActive('/shop') 
                    ? `font-semibold relative ${BRAND_COLOR} after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:${BRAND_BG}` 
                    : ''
                }`}
              >
                Shop
              </Link>
            </li>
            <li>
              <details className="dropdown">
                <summary className="hover:bg-base-200 transition-all duration-200">Categories</summary>
                <ul className="p-2 bg-base-100 shadow-lg rounded-box z-[1] w-48 animate-fadeIn">
                  <li>
                    <Link to="/category/audio" className="hover:bg-base-200 transition-colors duration-200">Audio</Link>
                  </li>
                  <li>
                    <Link to="/category/computers" className="hover:bg-base-200 transition-colors duration-200">Computers</Link>
                  </li>
                  <li>
                    <Link to="/category/smartphones" className="hover:bg-base-200 transition-colors duration-200">Smartphones</Link>
                  </li>
                  <li>
                    <Link to="/category/accessories" className="hover:bg-base-200 transition-colors duration-200">Accessories</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`hover:bg-base-200 transition-all duration-200 ${
                  isActive('/about') 
                    ? `font-semibold relative ${BRAND_COLOR} after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:${BRAND_BG}` 
                    : ''
                }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`hover:bg-base-200 transition-all duration-200 ${
                  isActive('/contact') 
                    ? `font-semibold relative ${BRAND_COLOR} after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:${BRAND_BG}` 
                    : ''
                }`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* RIGHT PART - THEME CHANGER, SEARCH, CART, USER */}
        <div className="navbar-end gap-2 md:gap-3">
          {/* Theme toggle with tooltip */}
          <div className="tooltip tooltip-bottom" data-tip="Toggle theme">
            <label className="swap swap-rotate btn btn-ghost btn-circle text-base-content">
              <input type="checkbox" value="dark" className="theme-controller" />
              <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>

          {/* Improved Search - Only visible on desktop */}
          {!isMobile && (
            <form onSubmit={handleSearchSubmit} className="form-control relative">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered md:w-auto input-sm md:input-md pr-8 rounded-lg transition-all duration-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          )}

          {/* Enhanced Cart with preview */}
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle tooltip tooltip-bottom relative group" data-tip="Cart" aria-label="Shopping cart">
              <div className="indicator flex items-center justify-center rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-orange-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className={`badge badge-sm indicator-item ${BRAND_BG} text-white border-none animate-bounce-once`}>
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </div>
            </button>
            <div tabIndex={0} className="card dropdown-content z-[1] mt-3 shadow-lg bg-base-100 rounded-box w-80 animate-fadeIn">
              <div className="card-body p-4">
                <span className="text-lg font-bold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)
                </span>
                <div className="max-h-72 overflow-auto scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p>Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      {cartItems.slice(0, 3).map(item => (
                        <div key={item.id} className="flex items-center gap-3 py-3 border-b hover:bg-base-100/50 transition-colors rounded-lg p-2">
                          <div className="w-14 h-14 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                            {item.imageSrc && (
                              <img 
                                src={item.imageSrc} 
                                alt={item.name} 
                                className="w-full h-full object-cover" 
                              />
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium text-sm">{item.name}</p>
                            <div className="flex justify-between items-center">
                              <p className="text-xs text-gray-500">{item.quantity} × ${item.price.toFixed(2)}</p>
                              <p className="text-sm font-medium text-orange-500">${(item.quantity * item.price).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {cartItems.length > 3 && (
                        <div className="text-xs text-center mt-2 text-gray-500 italic">
                          + {cartItems.length - 3} more items
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center font-medium">
                    <span>Subtotal:</span>
                    <span className={`text-lg ${BRAND_COLOR}`}>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="card-actions justify-end">
                    <Link 
                      to="/cart" 
                      className={`btn ${BRAND_BG} ${BRAND_HOVER} text-white border-none btn-block shadow-md hover:shadow-lg transition-all`}
                    >
                      View Cart & Checkout
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced User Profile */}
          <div className="dropdown dropdown-end">
         <button 
  tabIndex={0}
  className="btn btn-ghost btn-circle tooltip tooltip-bottom group"
  data-tip={isAuthenticated ? `${user.first_name} ${user.last_name}` : "Account"}
  aria-label="User account"
>
  {isAuthenticated ? (
    /* Logged in - styled profile photo with subtle shadow */
    <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex items-center justify-center">
      {user.profile_avatar ? (
        <img 
          alt={`${user.first_name}'s profile`}
          src={user.profile_avatar}
          className="w-full h-full object-fill"
          style={{
            objectPosition: 'center',
            width: '100%',
            height: '100%'
          }}
        />
      ) : (
        /* Using DiceBear's thumbs style */
        <img 
          alt={`${user.first_name}'s avatar`}
          src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.email}&backgroundColor=FF6B35,FFBA86&backgroundType=gradientLinear`}
          className="w-full h-full"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            display: 'block'
          }}
        />
      )}
    </div>
  ) : (
    /* Not logged in - clean icon */
    <div className="w-10 h-10 flex items-center justify-center text-base-content hover:text-orange-500 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  )}
</button>
            {/* Find the user avatar button in your Navbar and replace it with this */}


            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-3 shadow-lg animate-fadeIn">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 border-b border-base-200 mb-2">
                    <p className="text-sm opacity-60">Welcome back</p>
                    <p className="font-semibold text-lg">{user.first_name} {user.last_name}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                  </div>
                  <li>
                    <Link to="/profile" className="flex items-center gap-2 py-2 hover:bg-base-200 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="flex items-center gap-2 py-2 hover:bg-base-200 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="flex items-center gap-2 py-2 hover:bg-base-200 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      className={`flex items-center gap-2 py-2 ${BRAND_COLOR} hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-lg w-full text-left`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <div className="px-4 py-3 border-b border-base-200 mb-2">
                    <p className="font-semibold text-lg">Welcome</p>
                    <p className="text-sm text-gray-500">Sign in to access your account</p>
                  </div>
                  <li>
                    <Link 
                      to="/login" 
                      className="flex items-center gap-2 py-2 hover:bg-base-200 rounded-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="flex items-center gap-2 py-2 hover:bg-base-200 rounded-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      
      {/* Add CSS for custom animations */}
      <style jsx>{`
        @keyframes bounce-once {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-once {
          animation: bounce-once 0.5s ease-in-out;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #fbd38d;
          border-radius: 20px;
        }
      `}</style>
    </>
  );
}