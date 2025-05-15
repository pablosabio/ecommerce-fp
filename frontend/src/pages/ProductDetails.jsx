// frontend/src/pages/ProductDetails.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // State for user rating & review
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Find product by ID from our products data
    const foundProduct = products.find(p => p.id.toString() === id);
    
    // Set a slight delay to simulate loading from a real API
    const timer = setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageSrc: product.images[0], // Use the first image of the new images array
      }, quantity);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  // Functions for the image carousel
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  const setImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Review submission handler
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!userRating || !userReview.trim()) {
      alert("Please provide both a rating and a review");
      return;
    }
    try {
      // This would normally submit to your API
      alert("Thank you for your feedback!");
      setUserRating(0);
      setUserReview("");
    } catch {
      alert("Network error");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center min-h-[60vh] flex items-center justify-center mt-16">
        <span className="loading loading-lg loading-spinner text-primary"></span>
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center min-h-[60vh] flex flex-col items-center justify-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const roundedRating = Math.round(product.rating);

  return (
    <div className="container mx-auto p-4 md:p-8 mt-16 md:mt-20">
      {/* Breadcrumb navigation */}
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to={`/category/${product.category}`}>{product.category || "Products"}</Link></li>
          <li className="text-gray-500">{product.name}</li>
        </ul>
      </div>

      {/* Main product card */}
      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-200 lg:min-h-[600px]">
        {/* Image carousel section */}
        <div className="lg:w-2/5 bg-white rounded-l-lg h-[300px] md:h-auto relative">
          {/* Main image carousel */}
          <div className="carousel w-full h-full">
            {product.images && product.images.map((image, index) => (
              <div 
                id={`slide-${index}`} 
                key={index} 
                className={`carousel-item relative w-full h-full ${currentImageIndex === index ? 'block' : 'hidden'}`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - View ${index + 1}`} 
                  className="w-full h-full object-contain p-4"
                />
              </div>
            ))}
          </div>
          
          {/* Carousel navigation buttons */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button onClick={prevImage} className="btn btn-circle btn-sm bg-base-100 bg-opacity-70">❮</button>
            <button onClick={nextImage} className="btn btn-circle btn-sm bg-base-100 bg-opacity-70">❯</button>
          </div>
          
          {/* Thumbnail navigation dots */}
          <div className="flex justify-center w-full py-2 gap-2 absolute bottom-0">
            {[0, 1, 2].map((index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-primary' : 'bg-base-300'}`}
                onClick={() => setImage(index)}
                aria-label={`Go to image ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Product details */}
        <div className="card-body p-4 lg:p-6 lg:w-3/5 overflow-y-auto">
          <h2 className="card-title text-2xl lg:text-3xl mb-2">{product.name}</h2>
          
          {/* Star rating display */}
          <div className="flex items-center mb-3">
            <div className="rating rating-md"> 
              {[...Array(5)].map((_, i) => (
                <input
                  key={i}
                  type="radio"
                  name={`rating-display-${product.id}`}
                  className="mask mask-star-2 bg-orange-400"
                  disabled
                  checked={i < roundedRating}
                  readOnly
                />
              ))}
            </div>
            {product.reviewCount > 0 && (
              <span className="ml-2 text-sm text-base-content/70">
                ({product.reviewCount} reviews)
              </span>
            )}
          </div>

          <p className="text-2xl font-semibold text-primary mb-4">
            ${product.price.toFixed(2)}
          </p>
          
          {/* Product description */}
          <div className="mb-4">
            <p className="text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features list */}
          {product.features && product.features.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Availability and Category info */}
          <div className="flex flex-wrap gap-y-2 gap-x-8 text-sm mb-4">
            <div>
              <span className="font-semibold">Availability:</span>{" "}
              {product.inStock ? (
                <span className="text-success">In Stock</span>
              ) : (
                <span className="text-error">Out of Stock</span>
              )}
            </div>
            <div>
              <span className="font-semibold">Category:</span>{" "}
              <Link 
                to={`/category/${product.category}`}
                className="link link-hover text-primary"
              >
                {product.category || "General"}
              </Link>
            </div>
            <div>
              <span className="font-semibold">ID:</span>{" "}
              <span className="font-mono">{product.id}</span>
            </div>
          </div>
          
          {/* Quantity selector and Add to Cart button */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="btn btn-square btn-sm"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="mx-3 text-xl w-8 text-center">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="btn btn-square btn-sm"
              >
                +
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex-grow"
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
          
          {/* Review form */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div className="rating rating-md"> 
                {[1,2,3,4,5].map(n => (
                  <input
                    key={n}
                    type="radio"
                    name="user-rating"
                    className="mask mask-star-2 bg-yellow-400"
                    onChange={() => setUserRating(n)}
                    checked={userRating === n}
                  />
                ))}
              </div>
              <textarea
                className="w-full border p-2 rounded-lg"
                rows="3"
                placeholder="Share your thoughts about this product..."
                value={userReview}
                onChange={e => setUserReview(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;