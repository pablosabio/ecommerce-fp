import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsGrid } from '../components/Cards';
import { products } from '../data/products';
import { getCategoryBackground } from '../utils/imagePlaceholders';

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
          <h1 className="text-3xl font-bold mb-6">Our Products</h1>
          
          {!filterCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {categories.map(category => (
                <Link 
                  key={category}
                  to={`/category/${category}`}
                  className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
                >
                  <figure className="px-4 pt-4">
                    <img 
                      src={getCategoryBackground(category)} 
                      alt={category} 
                      className="rounded-lg h-32 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body items-center text-center p-4">
                    <h2 className="card-title capitalize">{category}</h2>
                    <p className="text-sm text-gray-500">
                      {products.filter(p => p.category === category).length} products
                    </p>
                  </div>
                </Link>
              ))}
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