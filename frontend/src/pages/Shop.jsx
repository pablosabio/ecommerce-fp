// frontend/src/pages/Shop.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsGrid } from '../components/Cards';
import { products } from '../data/products';
import { getCategoryBackground } from '../utils/imagePlaceholders';

export default function Shop() {
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  // Get all unique categories from products
  const categories = [...new Set(products.map(product => product.category))];
  
  // Filter products
  let filteredProducts = [...products];
  
  // Filter by category
  if (filterCategory) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === filterCategory
    );
  }
  
  // Filter by price range
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
  
  // Sort products
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
    <div className="container mx-auto p-4 md:p-8 pt-24">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-base-100 shadow rounded-lg p-4 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            {/* Category filter */}
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
            
            {/* Price range filter */}
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
            
            {/* Sort options */}
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
            
            {/* Reset filters button */}
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
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-6">Our Products</h1>
          
          {/* Category quick links */}
          {!filterCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
          
          {/* Products grid */}
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