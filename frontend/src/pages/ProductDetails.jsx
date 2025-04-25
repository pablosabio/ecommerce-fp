// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import productsData from "../data/products.json"; // Product data
import { CartContext } from "../contexts/CartContext"; // Cart context

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState(null); // State to store product data

  const { addToCart } = useContext(CartContext); // Add to cart function from context

  useEffect(() => {
    // Find the product in the data when component mounts or ID changes
    const found = productsData.find((p) => p.id.toString() === id);
    setProduct(found); // Update product state
  }, [id]); // Dependency array: run effect when ID changes

  // Function to add the current product to the cart
  const handleAddToCart = () => {
    if (product) {
      const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageSrc: product.imageSrc, // Use imageSrc to align with the rest of the code and data
      };
      addToCart(productToAdd, 1); // Call the context function to add the product
      // You can add a user confirmation message here
      console.log(`${product.name} added to cart`);
    }
  };

  // Display loading state if the product hasn't been found yet
  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <span className="loading loading-lg loading-spinner text-primary"></span>
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
  }

  // --- Calculate rounded rating (outside return for better organization) ---
  const roundedRating = Math.round(product.rating);

  // Display product details
  return (
    // Adjust top margin if necessary (depending on your navigation bar)
    <div className="container mx-auto p-4 md:p-8 mt-16 md:mt-20">
      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-200">
        {/* Image section */}
        <figure className="p-4 lg:p-8 lg:w-2/5 bg-gray-200 dark:bg-gray-200 bg-contain bg-center bg-no-repeat flex items-center justify-center rounded-lg">
          <img
            src={product.imageSrc} // Use imageSrc from product data
            alt={product.name}
            className="max-h-[60vh] lg:max-h-[70vh] w-auto h-auto object-contain rounded-lg"
          />
        </figure>
        {/* Product details section */}
        <div className="card-body lg:w-3/5">
          <h2 className="card-title text-3xl lg:text-4xl mb-3">
            {product.name}
          </h2>

          {/* --- Display star rating and review count --- */}
          <div className="flex items-center mb-4">
            {" "}
            {/* Flex container for stars and text alignment */}
            <div className="rating rating-md">
              {" "}
              {/* DaisyUI rating component */}
              {[...Array(5)].map(
                (
                  _,
                  index // Create 5 stars
                ) => (
                  <input
                    key={index} // Unique key for each star
                    type="radio" // Required type for rating component
                    name={`rating-display-${product.id}`} // Unique name for the star group (for display only)
                    className="mask mask-star-2 bg-orange-400" // Star shape and fill color
                    disabled // Make it non-interactive
                    checked={index < roundedRating} // Mark the star as 'filled' based on the rating
                    readOnly // Confirm it's read-only
                  />
                )
              )}
            </div>
            {/* Display review count (if greater than 0) */}
            {product.reviewCount > 0 && (
              <span className="ml-2 text-sm text-base-content/70">
                ({product.reviewCount} reviews)
              </span>
            )}
          </div>
          {/* --- End star rating display --- */}

          <p className="text-3xl font-semibold text-primary mb-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-base md:text-lg lg:text-xl text-base-content leading-relaxed mt-2 mb-6">
            {product.description}
          </p>

          {/* Add to cart button section */}
          <div className="card-actions justify-start md:justify-end mt-auto">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-wide" // Primary and wide button
              disabled={!product} // Disable button if product hasn't loaded
            >
              Add to the cart {/* Button text */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;