import React, { useState, useEffect } from 'react';
import { ProductCard } from './Cards';
import { products, loadProducts } from '../data/products';

const ProductSkeleton = () => (
  <div className="card w-full bg-base-100 shadow-md">
    {/* Image skeleton */}
    <div className="skeleton h-48 w-full rounded-t-lg"></div>

    <div className="card-body p-4">
      {/* Title skeleton */}
      <div className="skeleton h-6 w-3/4 mb-2"></div>

      {/* Price skeleton */}
      <div className="skeleton h-5 w-1/4 mb-2"></div>

      {/* Rating skeleton */}
      <div className="flex gap-1 mb-2">
        <div className="skeleton h-4 w-4"></div>
        <div className="skeleton h-4 w-4"></div>
        <div className="skeleton h-4 w-4"></div>
        <div className="skeleton h-4 w-4"></div>
        <div className="skeleton h-4 w-4"></div>
      </div>

      {/* Action skeleton */}
      <div className="flex justify-between items-center mt-2">
        <div className="skeleton h-5 w-16"></div>
        <div className="skeleton h-8 w-24"></div>
      </div>
    </div>
  </div>
);

export default function FeaturedProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        // Ensure products are loaded
        await loadProducts();

        // Once loaded, select featured products
        const selectedProducts = [
          // Your exact product selection
          products.find((p) => p.id === 'audio-001'),
          products.find((p) => p.id === 'computers-001'),
          products.find((p) => p.id === 'audio-003'),
          products.find((p) => p.id === 'computers-004'),
          products.find((p) => p.id === 'audio-005'),
          products.find((p) => p.id === 'smartphones-002'),
          products.find((p) => p.id === 'accessories-001'),
          products.find((p) => p.id === 'smartphones-003'),
          products.find((p) => p.id === 'accessories-005'),
          products.find((p) => p.id === 'audio-002'),
        ].filter(Boolean);

        setFeaturedProducts(selectedProducts);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        // Add a small delay to make the transition smoother
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }

    loadData();
  }, []);

  return (
    <div className="flex justify-center mt-6">
      <div className="w-5/6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {isLoading
            ? // Show 10 skeleton cards while loading
              [...Array(10)].map((_, index) => <ProductSkeleton key={index} />)
            : // Show actual products when loaded
              featuredProducts.map((product) => <ProductCard key={product.id} {...product} />)}
        </div>
      </div>
    </div>
  );
}
