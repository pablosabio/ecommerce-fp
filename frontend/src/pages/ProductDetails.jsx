// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";               // :contentReference[oaicite:0]{index=0}
import productsData from "../data/products.json";
import { CartContext } from "../contexts/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  // New state for user rating & review
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const found = productsData.find(p => p.id.toString() === id);
    setProduct(found);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageSrc: product.imageSrc,
      }, 1);
    }
  };

  // ─── New: submit handler for rating & review ─────────────────────────
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!userRating || !userReview.trim()) {
      alert("Please provide both a rating and a review");
      return;
    }
    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          rating: userRating,
          review: userReview
        }),
      });
      if (res.ok) {
        alert("Thank you for your feedback!");
        setUserRating(0);
        setUserReview("");
      } else {
        alert("Submission failed");
      }
    } catch {
      alert("Network error");
    }
  }

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-lg loading-spinner text-primary"></span>
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
  }

  const roundedRating = Math.round(product.rating);

  return (
    <div className="container mx-auto p-4 md:p-8 mt-16 md:mt-20">
      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-200">
        <figure className="p-4 lg:p-8 lg:w-2/5 bg-gray-200 flex items-center justify-center rounded-lg">
          <img
            src={product.imageSrc}
            alt={product.name}
            className="max-h-[60vh] object-contain rounded-lg"
          />
        </figure>
        <div className="card-body lg:w-3/5">
          <h2 className="card-title text-3xl lg:text-4xl mb-3">{product.name}</h2>
          
          {/* existing star-rating display */}
          <div className="flex items-center mb-4">
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

          <p className="text-3xl font-semibold text-primary mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed mt-2 mb-6">
            {product.description}
          </p>

          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Your Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="rating rating-lg"> 
                {[1,2,3,4,5].map(n => (
                  <input
                    key={n}
                    type="radio"
                    name="user-rating"
                    className="mask mask-star-2 bg-yellow-400"
                    onChange={()=>setUserRating(n)}
                    checked={userRating===n}
                  />
                ))}
              </div>
              <textarea
                className="w-full border p-2"
                rows="4"
                placeholder="Write your review..."
                value={userReview}
                onChange={e=>setUserReview(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary w-fit">
                Submit Review
              </button>
            </form>
          </div>
          

          <div className="card-actions justify-start md:justify-end mt-auto">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-wide"
            >
              Add to the cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
