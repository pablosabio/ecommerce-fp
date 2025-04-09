import React from "react";
import productsData from '../data/products.json'; // Import the JSON data directly

// ProductCard component 
const ProductCard = ({
  id, 
  name,
  imageSrc,
  price,
  rating,
  reviewCount,
  buyNowLink,
}) => {

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
    <div className="card w-64 bg-base-100 shadow-md">
      <figure>
        <img src={imageSrc} alt={name} className="object-cover h-60 w-full" />
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
          <a
            href={buyNowLink}
            className="btn btn-primary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy now
          </a>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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