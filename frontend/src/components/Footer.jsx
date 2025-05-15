// frontend/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 pt-12 pb-6">
      {/* Main Footer Content */}
      <div className="flex justify-center">
        <div className="w-5/6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Column */}
            <div className="flex flex-col">
              <Link to="/" className="text-3xl font-extrabold mb-4 inline-flex items-center">
                Quick<span className="text-orange-500 font-black">Cart</span>
              </Link>
              
              <p className="text-base-content/70 mb-4">
                Your trusted destination for premium tech products at competitive prices. Fast shipping, exceptional service.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-4 mt-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/shop" className="hover:text-orange-500 transition-colors">Shop All</Link></li>
                <li><Link to="/category/audio" className="hover:text-orange-500 transition-colors">Audio</Link></li>
                <li><Link to="/category/computers" className="hover:text-orange-500 transition-colors">Computers</Link></li>
                <li><Link to="/category/smartphones" className="hover:text-orange-500 transition-colors">Smartphones</Link></li>
                <li><Link to="/category/accessories" className="hover:text-orange-500 transition-colors">Accessories</Link></li>
                <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
                <li><Link to="/shipping" className="hover:text-orange-500 transition-colors">Shipping & Returns</Link></li>
                <li><Link to="/faq" className="hover:text-orange-500 transition-colors">FAQ</Link></li>
                <li><Link to="/warranty" className="hover:text-orange-500 transition-colors">Warranty</Link></li>
                <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Tech Street, Berlin, Germany</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+49 79 1234 5678</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>supportquickcart@proton.me</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Monday-Friday: 9am-6pm CET</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="mb-8 pb-8 border-b border-base-300">
            <h3 className="text-lg font-bold mb-4 uppercase">Payment Methods</h3>
            <div className="flex flex-wrap gap-3">
              {/* Icons for payment methods */}
              <div className="bg-white h-8 w-12 rounded shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5" viewBox="0 0 576 512">
                  <path fill="#FF5F00" d="M492.4 220.8c-8.9-24.1-12.8-31.9-1.9-48.7C507.3 136.2 468 125 468 125H334.9c-18.7 0-32 13.3-32 32v306.4c0 18.6 13.3 32 32 32H468c0 0 34.9-8.7 62-32c14.8-12.9 8.9-27.2 0-43.9S492.4 220.8 492.4 220.8z" opacity="0.75"/>
                  <path fill="#EB001B" d="M380.9 125h-127c-18.6 0-32 13.3-32 32v306.4c0 18.6 13.3 32 32 32h127c18.7 0 32-13.3 32-32V157c0-18.7-13.3-32-32-32z" opacity="0.75"/>
                  <path fill="#F79E1B" d="M159.1 125C62.4 125 31 209.4 31 285.6s31.4 160.5 128.1 160.5h87.7v-226c0-18.7-13.3-32-32-32h-55.7z" opacity="0.75"/>
                </svg>
              </div>
              <div className="bg-white h-8 w-12 rounded shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4" viewBox="0 0 576 512">
                  <path fill="#0079BE" d="M470.1 231.3s-7.6 35.9-10.2 45.7c-15.4 71.1-155.6 215.3-164.9 224.7-9.3 9.3-20.6 0-20.6 0s-30.9-31-127.1-195.2H41.7L52 288c0 17.9 14.5 32.4 32.4 32.4h45.2c5.8 0 11.1-3.2 13.9-8.3 42.6-78.8 130.9-200.5 130.9-200.5 0-.2 75.5 210.2 76.6 213.7 1.9 6.1 7.5 10.1 13.9 10.1h57.2c17.9 0 32.4-14.5 32.4-32.4l21.3-205.6h-84.8z" opacity="0.75"/>
                </svg>
              </div>
              <div className="bg-white h-8 w-12 rounded shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6" viewBox="0 0 576 512">
                  <path fill="#FFB600" d="M186.3 258.2c0 12.2-9.7 21.8-22 21.8-9.6 0-16-5.7-16-15 0-12.2 9.8-22 21.8-22 9.7 0 16.2 5.7 16.2 15.2zm-105.5-7c-9.6 0-16.2 5.8-16.2 15 0 12.2 9.8 22 21.8 22 12.3 0 22-9.6 22-21.8 0-9.3-6.4-15-16-15h-11.6zm-69 32.3v4.1c0 15.4 10.7 25.4 30.7 25.4 11.2 0 19.6-2 26.6-4.8v-15.4c-7.4 3.3-14.3 4.8-22.5 4.8-7.6 0-11.9-2.9-11.9-8 0-5.3 4.3-8.3 11.9-8.3 7.6 0 14.6 1.3 22.5 4.8v-15.5c-6.5-2.9-14.8-4.8-26.6-4.8-20 0-30.7 10.1-30.7 25.5v-8.2zM372.8 62.4h-39.2v4.8c13 5.5 20.7 11.3 23.2 20.8h16V62.4zM306.8 62.4h-39.1V68c13 5.5 20.7 11.3 23.2 20.8h15.9V62.4zm-187.7 9.8c10.7 0 20.7 5.6 25.7 14.3h16.1c-5.2-15.2-19.9-26.3-41.7-26.3-23.9 0-41.3 14.7-41.3 34.6 0 21 19.5 33.8 45.9 33.8 10.7 0 20.4-1.6 28.9-4.5v-17.2c-8.3 3.5-17.9 5.3-29.2 5.3-14.8 0-23.9-6.1-23.9-16 0-10.2 9.6-16.1 24.3-17.7 0 0-3.8-6.3-3.8-6.3zM145.9 56c-16.2 0-27.4 8.3-29.2 21.8h16.1c.8-4.5 5.7-7.2 12.9-7.2 8.3 0 12.9 3.7 12.9 10.4 0 5-3 7.7-9.1 7.7h-10.2v12.5h10.2c8.4 0 10.9 3 10.9 8.2 0 6.7-5.2 10.9-14.1 10.9-7.5 0-13.4-2.7-14.7-7.7h-16.2c1.8 13.6 13.8 22.1 30.3 22.1 18.8 0 31.3-9.6 31.3-24.1 0-10.5-6.2-17.1-16.2-17.9 8.5-1.8 14.5-7.8 14.5-16.9 0-13.1-11.4-22.1-29.2-22.1h-.2zm43.6-40v90h39.1v-90H189.5zm150.5 25.9h3.5v-12.8h-3.5zM219 56c-16.2 0-27.4 8.3-29.2 21.8h16.1c.8-4.5 5.7-7.2 12.9-7.2 8.3 0 12.9 3.7 12.9 10.4 0 5-3 7.7-9.1 7.7h-10.2v12.5h10.2c8.4 0 10.9 3 10.9 8.2 0 6.7-5.2 10.9-14.1 10.9-7.5 0-13.4-2.7-14.7-7.7h-16.3c1.8 13.6 13.8 22.1 30.3 22.1 18.8 0 31.3-9.6 31.3-24.1 0-10.5-6.2-17.1-16.2-17.9 8.5-1.8 14.4-7.8 14.4-16.9 0-13.1-11.3-22.1-29.1-22.1H219zm229.4 116.3c0-6.9-5.6-10.9-16.2-10.9-9.1 0-16 .9-22.3 3v2.9c6.4-1.2 13.9-1.9 21.1-1.9 6.5 0 9.9 2.1 9.9 5.7 0 3.3-2.2 5.1-7.9 5.1h-12.9c-12.1 0-18.2 4.5-18.2 13.3 0 9.1 5.1 13.9 17.1 13.9 5.6 0 10.4-.7 14.1-2v-3.1c-4.2.7-8.4 1.1-13.2 1.1-8.2 0-10.3-2.9-10.3-8.3 0-6 3.8-8.6 13.1-8.6h12.9c8.4 0 12.9-3.5 12.9-10.3l-.1.1zm-213.4 0c0-6.9-5.6-10.9-16.2-10.9-9.1 0-16 .9-22.3 3v2.9c6.4-1.2 13.9-1.9 21.1-1.9 6.5 0 9.9 2.1 9.9 5.7 0 3.3-2.2 5.1-7.8 5.1h-12.9c-12.1 0-18.2 4.5-18.2 13.3 0 9.1 5.1 13.9 17.1 13.9 5.6 0 10.4-.7 14.1-2v-3.1c-4.2.7-8.4 1.1-13.2 1.1-8.2 0-10.3-2.9-10.3-8.3 0-6 3.8-8.6 13.1-8.6h12.9c8.4 0 12.9-3.5 12.9-10.3h-.2v.1zm87.6 15.9c0-20.4-31.7-11-31.7-22.5 0-4.5 3.5-6.9 12.4-6.9 5.3 0 11.1.7 16.3 2.1v-3.1c-4.7-1.3-10.9-2-16.9-2-11.1 0-16.6 3.8-16.6 10.2 0 14.9 31.7 9 31.7 21.8 0 4.9-4 7.6-12.4 7.6-8 0-14.7-1.7-19.4-4.1v3.5c3.4 2 11.2 3.7 18.5 3.7 12.1-.1 18.1-4.1 18.1-10.3zm40.7-21.6c8.7 0 13.6 5.7 13.6 15.3 0 8.8-5.5 14.2-13.6 14.2-9.1 0-14.9-5.1-14.9-14.2 0-8.1 6.9-15.3 14.9-15.3zm0-3.2c-11.7 0-18.8 7.8-18.8 18.5 0 11.4 6.4 17.6 18.8 17.6 9.6 0 17.5-6.9 17.5-17.7 0-10.8-6.5-18.5-17.5-18.5v.1zm-40 .5h1.7l21.9 35.3h7l-21.9-35.3h-8.7zM156.4 41.9h-3.7V56h3.7v-14.1zm11-1.1c-4.5 0-6.5 3.4-6.5 7.9v7.3h13.1V49c-.1-5.3-2.3-8.2-6.6-8.2zm-.1 3c2.3 0 3.1 1.7 3.1 4.2v4.9H164v-4.5c0-3.2 1.2-4.7 3.3-4.7v.1zm-25.4-3c-4.5 0-6.5 3.4-6.5 7.9v7.3h13.1V49c0-5.3-2.3-8.2-6.6-8.2zm-.1 3c2.3 0 3.1 1.7 3.1 4.2v4.9h-6.4v-4.5c0-3.2 1.2-4.7 3.3-4.7v.1zm-24.3 9.2h8.5c0-6.9-3.1-10.1-9.2-10.1-5.8 0-9.4 3.4-9.4 8.5 0 11.7 16.7 7.5 16.7 14.4 0 2.6-2.2 4.2-5.8 4.2-2.9 0-5.3-1.2-5.7-4.2h-8.5c0 7.4 5.3 10.9 13.8 10.9 7.9 0 13.3-3.4 13.3-10.7 0-11.3-16.6-8.2-16.6-14.4 0-2.3 1.6-3.5 5-3.5 2.8-.1 4.9 1.5 4.9 4.9zm-34-12.2v15c0 5.8 3.2 8.9 9.5 8.9 1.5 0 3.3-.3 4.5-.7V59c-.8.3-2.2.5-3.4.5-2.8 0-3.9-1.1-3.9-3.8V46.4h7.3v-5.5h-7.3v-6.9l-6.7 2.2v4.7H78v5.5h4.5v-.1z" opacity="0.75"/>
                </svg>
              </div>
              <div className="bg-white h-8 w-12 rounded shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5" viewBox="0 0 576 512">
                  <path fill="#003087" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM223.4 143.9c0-40.4 16.8-70.1 56.9-70.1 41.1 0 56.9 29.7 56.9 70.1 0 38.1-16.9 70.5-57 70.5-40.5 0-56.8-32.1-56.8-70.5zm167.8 72.1c32.8 0 52-19.8 52-44.5 0-23.8-17.6-44.5-51.9-44.5-34.6 0-52.6 21.1-52.6 44.5 0 24.7 19.5 44.5 52.5 44.5zM363.4 217c-5.7 0-10.2-4.5-10.2-10.2 0-5.7 4.5-10.2 10.2-10.2 5.7 0 10.2 4.5 10.2 10.2.1 5.7-4.4 10.2-10.2 10.2zm69.5-10.2c0 5.7-4.5 10.2-10.2 10.2-5.7 0-10.2-4.5-10.2-10.2 0-5.7 4.5-10.2 10.2-10.2 5.7 0 10.2 4.6 10.2 10.2zm-28.1-4.6c-.1-11.6-9.6-21.1-21.2-21.1-11.6 0-21.2 9.5-21.2 21.1 0 11.6 9.6 21.1 21.2 21.1 11.6 0 21.2-9.5 21.2-21.1zm-59.2-234c0-5.7-4.5-10.2-10.2-10.2-5.7 0-10.2 4.5-10.2 10.2v2.6c0 5.7 4.5 10.2 10.2 10.2 5.7 0 10.2-4.5 10.2-10.2v-2.6zm122.9 239.6c0 11.6 9.6 21.1 21.2 21.1 11.6 0 21.2-9.5 21.2-21.1 0-11.6-9.6-21.1-21.2-21.1-11.6 0-21.2 9.5-21.2 21.1zm94.8 4.5c0 5.7 4.5 10.2 10.2 10.2 5.7 0 10.2-4.5 10.2-10.2 0-5.7-4.5-10.2-10.2-10.2-5.7 0-10.2 4.6-10.2 10.2z" opacity="0.75"/>
                </svg>
              </div>
              <div className="bg-white h-8 w-12 rounded shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5" viewBox="0 0 576 512">
                  <path fill="#2A83C2" d="M431.5 244.3V212c41.2 0 38.5.2 38.5.2 7.3 1.3 13.3 7.3 13.3 16 0 8.8-6 14.5-13.3 15.8-1.2.4-3.3.3-38.5.3zm42.8 20.2c-2.8-.7-3.3-.5-42.8-.5v35c39.6 0 40 .2 42.8-.5 7.5-1.5 13.5-8 13.5-17 0-8.7-6-15.5-13.5-17zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM182 192.3h-57c0 67.1 10.7 109.7-35.8 109.7-19.5 0-38.8-5.7-57.2-14.8v28c30 8.3 68 8.3 68 8.3 97.9 0 82-47.7 82-131.2zm178.5 4.5c-63.4-16-165-14.9-165 59.3 0 77.1 108.2 73.6 165 59.2V287C312.9 311.7 253 309 253 256s59.8-55.6 107.5-31.2v-28zM544 286.5c0-18.5-16.5-30.5-38-32v-.8c19.5-2.7 30.3-15.5 30.3-30.2 0-19-15.7-30-37-31 0 0 6.3-.3-120.3-.3v127.5h122.7c24.3.1 42.3-12.9 42.3-33.2z" opacity="0.75"/>
                </svg>
              </div>
              <div className="bg-white h-8 w-12 rounded shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5" viewBox="0 0 576 512">
                  <path fill="#4D4D4D" d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM312 376c0 13.3-10.7 24-24 24s-24-10.7-24-24 10.7-24 24-24 24 10.7 24 24zm112 0c0 13.3-10.7 24-24 24s-24-10.7-24-24 10.7-24 24-24 24 10.7 24 24zm-224 0c0 13.3-10.7 24-24 24s-24-10.7-24-24 10.7-24 24-24 24 10.7 24 24z" opacity="0.75"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Bottom Section - Logo mark and Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-black text-xl">QC</span>
              </div>
              <div>
                <p className="text-base-content/70 text-sm">
                  &copy; {currentYear} QuickCart. All rights reserved.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="/" className="hover:text-orange-500 transition-colors text-sm">Privacy Policy</a>
              <a href="/" className="hover:text-orange-500 transition-colors text-sm">Terms of Service</a>
              <a href="/" className="hover:text-orange-500 transition-colors text-sm">Cookies Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}