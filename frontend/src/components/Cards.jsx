import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { getProductImage } from '../utils/imagePlaceholders';

// ProductCard component - Displays a single product card
export const ProductCard = ({
  id,
  name,
  images,
  price,
  rating,
  reviewCount,
  category
}) => {
  // Use the CartContext to add items to the cart
  const { addToCart } = useContext(CartContext);
  
  // Get image source - use provided image or fallback to placeholder
  const productImage = images ? images[0] : getProductImage(id);

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      price,
      imageSrc: productImage,
    };

    addToCart(product, 1);
  };

  // Format rating with one decimal place
  const formattedRating = (Math.round(rating * 10) / 10).toFixed(1);

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg overflow-hidden">
      {/* Product image area with zoom effect - always white background */}
      <figure className="bg-white p-4 overflow-hidden">
        <Link to={`/product/${id}`} className="block">
          <div className="flex justify-center h-40 overflow-hidden">
            <img
              src={productImage}
              alt={name}
              className="h-full object-contain transform hover:scale-110 transition-transform duration-300"
            />
          </div>
        </Link>
      </figure>

      {/* Product info */}
      <div className="card-body p-3 pt-2">
        <Link to={`/product/${id}`} className="hover:text-primary">
          <h3 className="text-base md:text-lg font-bold text-base-content line-clamp-2 min-h-[3rem]">{name}</h3>
        </Link>
        
        {/* Rating display - with fixed half-stars */}
        <div className="flex items-center -mt-2 mb-1">
          <div className="flex">
            {/* Full stars */}
            {[...Array(Math.floor(rating))].map((_, i) => (
              <svg 
                key={`full-${i}`}
                className="w-4 h-4 text-orange-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            
            {/* Half star if needed */}
            {rating % 1 >= 0.5 && (
              <div className="relative">
                {/* Empty star background */}
                <svg 
                  className="w-4 h-4 text-gray-300 dark:text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {/* Half star overlay */}
                <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                  <svg 
                    className="w-4 h-4 text-orange-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Empty stars */}
            {[...Array(5 - Math.floor(rating) - (rating % 1 >= 0.5 ? 1 : 0))].map((_, i) => (
              <svg 
                key={`empty-${i}`}
                className="w-4 h-4 text-gray-300 dark:text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-base-content/70 ml-1">
            {formattedRating}/5 ({reviewCount})
          </span>
        </div>
        
        {/* Price display - less space before category */}
        <p className="text-base font-bold text-base-content mb-1">${price.toFixed(2)}</p>
        
        {/* Category and Add to cart button */}
        <div className="flex justify-between items-center">
          <span className="badge badge-outline badge-sm">{category}</span>
          <button
  onClick={handleAddToCart}
  className="group relative rounded-lg px-5 py-1.5 cursor-pointer bg-orange-500 border-2 border-orange-500 text-white font-medium transition-all duration-300 hover:bg-orange-600 hover:border-orange-600 overflow-hidden"
>
  <span className="transition-transform duration-300 transform group-hover:translate-x-3 inline-block">Add to Cart</span>
  <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  </div>
</button>
        </div>
      </div>
    </div>
  );
};


// ProductsGrid component - Displays a grid of product cards
export const ProductsGrid = ({ 
  title = "All Products", 
  productList = [],
  category = null 
}) => {
  // Filter products by category if provided
  const displayProducts = category 
    ? productList.filter(product => product.category === category)
    : productList;

  // Handle case where the filtered list might be empty
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

// CategorySection component - Shows products from a specific category
export const CategorySection = ({ category, title, limit = 5, productList = [] }) => {
  const filteredProducts = productList
    .filter(product => product.category === category)
    .slice(0, limit);

  return filteredProducts.length > 0 ? (
    <ProductsGrid 
      title={title || `${category.charAt(0).toUpperCase() + category.slice(1)} Products`}
      productList={filteredProducts}
    />
  ) : null;
};