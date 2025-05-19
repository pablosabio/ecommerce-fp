// src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/Cards'; 
import { products, loadProducts } from '../data/products';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (query) {
        setLoading(true);
        
        try {
          // Ensure products are loaded first
          await loadProducts();
          
          const lowerCaseQuery = query.toLowerCase();
          const filteredProducts = products.filter(product =>
            (product.name && product.name.toLowerCase().includes(lowerCaseQuery)) ||
            (product.description && product.description.toLowerCase().includes(lowerCaseQuery)) ||
            (product.category && product.category.toLowerCase().includes(lowerCaseQuery))
          );
          
          setSearchResults(filteredProducts);
        } catch (error) {
          console.error('Error searching products:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div className="container mx-auto p-4 md:p-8 mt-16 md:mt-20 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Search Results
        </h1>
        {query && (
          <p className="text-lg text-gray-600 mt-2">
            Showing results for: <span className="font-semibold text-primary">{query}</span>
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-10">
          <span className="loading loading-lg loading-spinner text-primary"></span>
          <p className="mt-2">Searching...</p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {searchResults.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        query && (
          <div className="text-center py-10">
            <p className="text-xl text-gray-500">No products found matching your search criteria.</p>
            <p className="text-gray-400 mt-2">Try searching for something else or check our categories.</p>
          </div>
        )
      )}
      {!query && !loading && (
        <div className="text-center py-10">
            <p className="text-xl text-gray-500">Please enter a search term to find products.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;