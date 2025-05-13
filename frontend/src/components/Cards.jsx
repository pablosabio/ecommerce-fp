import React, { useContext } from "react";
import productsData from '../data/products.json'; // Import the JSON data directly
import { CartContext } from "../contexts/CartContext"; // Added this for the Cart - Pablo

// ProductCard component 
export const ProductCard = ({
  id, 
  name,
  imageSrc,
  price,
  rating,
  reviewCount,
}) => {

  // Use the CartContext to add items to the cart - Pablo
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      price,
      imageSrc,
      // description,
    };

    addToCart(product, 1);
  };

  // Helper function to determine star state (full, half, empty)
  const getStarState = (index) => {
      const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
      if (roundedRating >= index + 1) {
          return "bg-orange-400"; // Full star
      } else if (roundedRating >= index + 0.5) {
          return "bg-orange-400 mask-half-1"; // Simple way to show partial (adjust mask styling if needed)
      } else {
          return "bg-gray-300"; // Empty star
      }
  };

  return (
    <div className="card w-full bg-base-100 shadow-md">
      <figure className="bg-gray-200 dark:bg-gray-200 h-60 flex items-center justify-center">
      <a href={`/product/${id}`}> 
        <img 
        src={imageSrc} 
        alt={name} 
        className="max-h-56 max-w-full object-contain" 
        />
        </a> 
      </figure>
      <div className="card-body p-4"> 
        <h2 className="card-title text-base">{name}</h2> 
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
        <div className="card-actions justify-end">
        {/* Added a button to add the product to the cart - Pablo */}
        <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const AllProductsGrid = () => {

  //Handle case where the imported data might be empty
  if (!productsData || productsData.length === 0) {
    return <div className="text-center p-10">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      {/* Map directly over the imported data */}
      {productsData.map((product) => (
        // Use the unique product.id from the JSON file as the key
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

// Card component remains the same
export default function Card() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-medium text-left w-full mb-4">All products</h1>
      <AllProductsGrid />
    </div>
  );
}