import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsGrid } from '../components/Cards';
import { products } from '../data/products';
// import { getCategoryBackground } from '../utils/imagePlaceholders';

export default function Shop() {
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const categories = [...new Set(products.map(product => product.category))];
  
  let filteredProducts = [...products];
  
  if (filterCategory) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === filterCategory
    );
  }
  
  if (priceRange.min !== '') {
    filteredProducts = filteredProducts.filter(product => 
      product.price >= Number(priceRange.min)
    );
  }
  
  if (priceRange.max !== '') {
    filteredProducts = filteredProducts.filter(product => 
      product.price <= Number(priceRange.max)
    );
  }
  
  if (sortBy === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating-desc') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'name-asc') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="lg:hidden container mx-auto px-4 mb-4">
        <button 
          className="btn btn-primary btn-block"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className={`w-full lg:w-64 px-4 lg:pl-8 lg:pr-4 ${isMobileFilterOpen ? 'block' : 'hidden'} lg:block lg:flex-shrink-0`}>
          <div className="bg-base-100 shadow rounded-lg p-4 lg:sticky lg:top-24">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            <div className="mb-4">
              <label className="font-medium block mb-2">Category</label>
              <select 
                className="select select-bordered w-full"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="font-medium block mb-2">Price Range</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="input input-bordered w-full" 
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                />
                <span>-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="input input-bordered w-full"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="font-medium block mb-2">Sort By</label>
              <select 
                className="select select-bordered w-full"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
            
            <button 
              className="btn btn-outline w-full mt-2"
              onClick={() => {
                setFilterCategory('');
                setSortBy('');
                setPriceRange({ min: '', max: '' });
              }}
            >
              Reset Filters
            </button>

            <button 
              className="btn btn-outline btn-block mt-4 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
        
        <div className="flex-grow px-4 md:px-6 lg:px-8">
  {/* Category quick links - Redesigned with Core Values style */}
  {!filterCategory && (
    <div className="mb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Products</h1>
        <p className="text-lg text-base-content/70 max-w-3xl">
          Explore our premium collections across different categories
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map(category => (
          <Link 
            key={category}
            to={`/category/${category}`}
            className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow group"
          >
            <div className="card-body">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-500/10 w-20 h-20 rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  {category === 'audio' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-3.536 5 5 0 015-5c1.325 0 2.532.526 3.414 1.464m-3.414 3.536a1 1 0 00-1.414 1.414m3.828-3.828a1 1 0 00-1.414 1.414" />
                    </svg>
                  )}
                  {category === 'computers' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {category === 'smartphones' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )}
                  {category === 'accessories' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center capitalize">{category}</h3>
              <p className="text-center text-base-content/70">
                {products.filter(p => p.category === category).length} products
              </p>
              <div className="card-actions justify-center mt-2">
                <span className="text-orange-500 font-medium group-hover:underline transition-all">Browse Collection</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )}
          {filteredProducts.length > 0 ? (
            <ProductsGrid 
              title={filterCategory ? `${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)} Products` : "All Products"} 
              productList={filteredProducts} 
            />
          ) : (
            <div className="text-center py-10 bg-base-100 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters to find what you're looking for.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setFilterCategory('');
                  setSortBy('');
                  setPriceRange({ min: '', max: '' });
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}