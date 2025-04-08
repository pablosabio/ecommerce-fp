import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50 pl-5 pr-5">
  {/* LEFT PART - LOGO */}
  <div className="navbar-start">
    <Link to="/" className="btn btn-ghost text-2xl font-extrabold inline-flex items-center gap-0">
      Quick<span className="text-[#FF9800]">Cart</span>
    </Link>
  </div>

  {/* CENTER, LINKS */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-lg font-medium">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/shop" >Shop</Link></li>
      <li><Link to="/about" >About Us</Link></li>
      <li><Link to="/contact">Contact Us</Link></li>
    </ul>
  </div>

  {/* RIGHT PART THEME CHANGER, BROWSER, CART, USER  */}
  <div className="navbar-end gap-3">
    {/* Change theme */}
    <label className="toggle text-base-content">
      <input type="checkbox" value="dark" className="theme-controller" />

      <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
      <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

    </label>

    {/* Browser */}
    <input
      type="text"
      placeholder="Search..."
      className="input input-bordered w-24 md:w-auto"
    />

    {/* Cart */}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0
              0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">8 products</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">
              <Link to="/cart">Go to cart </Link>
              </button>
          </div>
        </div>
      </div>
    </div>

    {/* User */}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><a>Log out</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}
