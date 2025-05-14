// frontend/src/components/Cards.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { products } from '../data/products';
import { getProductImage } from '../utils/imagePlaceholders';

// ProductCard component - Displays a single product card
export const ProductCard = ({
  id,
  name,
  imageSrc,
  price,
  rating,
  reviewCount,
  category
}) => {
  // Use the CartContext to add items to the cart
  const { addToCart } = useContext(CartContext);
  
  // Get image source - use provided image or fallback to placeholder
  const productImage = imageSrc || getProductImage(id);

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      price,
      imageSrc: productImage,
    };

    addToCart(product, 1);
  };

  // Helper function to determine star state (full, half, empty)
  const getStarState = (index) => {
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
    if (roundedRating >= index + 1) {
      return "bg-orange-400"; // Full star
    } else if (roundedRating >= index + 0.5) {
      return "bg-orange-400 mask-half-1"; // Half star
    } else {
      return "bg-gray-300"; // Empty star
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Product image */}
   <figure className="bg-gray-100 dark:bg-gray-200 aspect-square overflow-hidden">
  <Link to={`/product/${id}`} className="w-full h-full">
    <img
      src={productImage}
      alt={name}
      className="w-full h-full object-cover"
    />
  </Link>
</figure>


      <div className="card-body p-4">
        <Link to={`/product/${id}`} className="hover:text-primary">
          <h2 className="card-title text-base">{name}</h2>
        </Link>
        <p className="text-lg font-semibold">${price.toFixed(2)}</p>
        <div className="flex items-center space-x-1 mt-1 mb-2">
          <div className="rating rating-sm">
            {[...Array(5)].map((_, index) => (
              <input
                key={index}
                type="radio"
                name={`rating-${id}-${index}`}
                className={`mask mask-star-2 ${getStarState(index)}`}
                disabled
                checked={rating >= index + 1}
                readOnly
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviewCount} reviews)</span>
        </div>
        <div className="card-actions justify-between items-center">
          <span className="badge badge-outline badge-sm">{category}</span>
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// ProductsGrid component - Displays a grid of product cards
export const ProductsGrid = ({ 
  title = "All Products", 
  productList = products,
  category = null 
}) => {
  // Filter products by category if provided
  const displayProducts = category 
    ? productList.filter(product => product.category === category)
    : productList;

  //Handle case where the filtered list might be empty
  if (!displayProducts || displayProducts.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-medium mb-4">{title}</h2>
        <p>No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-medium text-left w-full mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

// CategorySection component - Shows products from a specific category
export const CategorySection = ({ category, title, limit = 5 }) => {
  const filteredProducts = products
    .filter(product => product.category === category)
    .slice(0, limit);

  return filteredProducts.length > 0 ? (
    <ProductsGrid 
      title={title || `${category.charAt(0).toUpperCase() + category.slice(1)} Products`}
      productList={filteredProducts}
    />
  ) : null;
};

// Default export - Shows all products
export default function Cards() {
  return (
    <div className="container mx-auto p-4">
      {/* Featured Products section */}
      <CategorySection category="audio" title="Featured Audio Products" limit={5} />
      
      {/* Show products by category */}
      <CategorySection category="computers" limit={5} />
      <CategorySection category="smartphones" limit={5} />
      <CategorySection category="accessories" limit={5} />
    </div>
  );
}